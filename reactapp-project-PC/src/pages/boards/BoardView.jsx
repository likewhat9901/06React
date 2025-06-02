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
  let { id: postId } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
      postId: '', writer: '', title: '', date: '', contents: '',
  });

  const handleDelete = async () => {
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
        const { writer, title, createdAt, contents} = postSnap.data();
        const date = formatDate(createdAt);
        setFormState({ postId, writer, title, date, contents, })
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
      orderBy("createdAt", "asc")
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
        <h2>View 페이지</h2>
        <div className={css.viewActions}>
          <Link to={`../edit/${formState.postId}`}>수정</Link>
          <button type="button" onClick={handleDelete}>삭제</button>
        </div>
      </div>
      <table className={css.viewTable}>
        <colgroup>

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
        </tbody>
      </table>

      <button className={css.commentBtn} data-bs-toggle="modal" data-bs-target="#commentModal">
        댓글 작성
      </button>
    </div>
    <WriteCommentModal 
      postId={postId}
      fetchComments={fetchComments}
    />
    <CommentSection 
      comments={comments}
      fetchComments={fetchComments}
      setEditComment={setEditComment}
    />
    <EditCommentModal
      editComment={editComment}
      fetchComments={fetchComments}
      setEditComment={setEditComment}
    />
  </>)
}

export default BoardView;