import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { firestore } from "@/features/firestore"
import { doc, getDoc, deleteDoc, getDocs } from "firebase/firestore";
import { collection, query, where, orderBy } from "firebase/firestore";

import WriteCommentModal from "./components/WriteCommentModal";
import EditCommentModal from "./components/EditCommentModal";
import CommentSection from "./components/CommentSection";
import { formatDate } from "./utils/dateUtils";
import css from "./BoardView.module.css"

/* DB에 저장된 게시판 데이터 불러오기 */
const getPost = async (postID) => {
  // 'MainBoard' 컬렉션 참조 가져오기
  const postRef = doc(firestore, 'boards', postID);
  const postSnap = await getDoc(postRef);

  return postSnap;
}

/* 게시글 삭제 */
const deletePost = async (postID) => {
  const postRef = doc(firestore, "boards", postID);
  await deleteDoc(postRef);
  console.log('삭제완료');
  alert("삭제완료");
}


/* MAIN COMPONENT */
function BoardView() {
  let { id: postId, type } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
      postId: '', writer: '', title: '', date: '', contents: '', fileURL: '',
  });
  const [filename, setFilename] = useState('');

  const boardTitleMap = {
    main: '자유게시글',
    qna: 'Q&A게시글',
    file: '자료실게시글',
  };

  const handleDelete = async () => {
    console.log(formState.fileURL);
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deletePost(postId);
      navigate("../lists");
    }
  };

  useEffect(() => {
    if(!postId) {
      console.log('postId 없음');
      return;
    }
    const fetchData = async () => {
      const postSnap = await getPost(postId); 
      if (postSnap.exists()) {
        const { writer, title, createdAt, contents, fileURL } = postSnap.data();
        const date = formatDate(createdAt);

        // 파일명 가공
        let name = '';
        if (fileURL) {
          const fullPath = fileURL.split("?")[0];
          const encoded = fullPath.split("/").pop(); // uploads%2Ffilename
          const decoded = decodeURIComponent(encoded); // uploads/filename
          name = decoded.replace(/^uploads\//, '').replace(/^\d+_/, '');
        }

        setFormState({ postId, writer, title, date, contents, fileURL });
        setFilename(name); // ⬅️ 따로 저장
      }
      else {
        alert("불러올 데이터가 없습니다.");
        navigate("../"); // 존재하지 않으면 리스트로 보내기
      }
    }
    fetchData();

  }, [postId]);


  /* ----------------------댓글 lists------------------------ */
  const [comments, setComments] = useState([]);

  /* DB에서 댓글 data fetch */
  const fetchComments = async () => {
    const q = query(
      collection(firestore, "comments"),
      where("postId", "==", postId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const fetchedComments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setComments(fetchedComments);
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  /* 댓글 수정 */
  const [editComment, setEditComment] = useState(null);
  
  
  return (<>
    <div className={css.viewContainer}>
      <div className={css.viewHeader}>
        <h2>{boardTitleMap[type] || '?페이지'}</h2>
        <div className={css.viewActions}>
          <Link to={`../edit/${formState.postId}`}>수정</Link>
          <button type="button" onClick={handleDelete}>삭제</button>
        </div>
      </div>
      <table className={css.viewTable}>
        <colgroup>
          <col width="15%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>{formState.writer}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{formState.title}</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{formState.date}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td className={css.viewTableContents}>{formState.contents}</td>
          </tr>
          {formState.fileURL && (
            <tr>
              <th>첨부파일</th>
              <td className={css.viewTableFile}>
                {/\.(jpg|jpeg|png|gif|avif)$/i.test(formState.fileURL.split('?')[0]) && (
                  <img src={formState.fileURL} alt="첨부 이미지" />
                )}
                <a href={formState.fileURL} target="_blank" rel="noopener noreferrer">
                  <span>{filename}</span><br />
                  첨부파일 다운로드(이미지는 새 창에서 다운로드)
                </a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={css.viewFooter}>
        <button className={css.commentBtn} onClick={()=>navigate("../lists")}>
          목록
        </button>
        {type === 'qna' && <button className={css.commentBtn} data-bs-toggle="modal" data-bs-target="#commentModal">
          댓글 작성 
        </button>}
      </div>
    </div>
    {type === 'qna' && <WriteCommentModal 
      postId={postId}
      fetchComments={fetchComments}
    />}
    {type === 'qna' && <CommentSection 
      comments={comments}
      fetchComments={fetchComments}
      setEditComment={setEditComment}
    />}
    {type === 'qna' && <EditCommentModal
      editComment={editComment}
      fetchComments={fetchComments}
      setEditComment={setEditComment}
    />}
  </>)
}

export default BoardView;