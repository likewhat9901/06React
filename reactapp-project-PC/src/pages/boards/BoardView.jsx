import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { firestore } from "@/features/firestore"
import { doc, getDoc, deleteDoc, getDocs } from "firebase/firestore";
import { collection, query, where, orderBy } from "firebase/firestore";

import WriteCommentModal from "./WriteCommentModal";
import EditCommentModal from "./EditCommentModal";
import CommentSection from "./CommentSection";
import { formatDate } from "./dateUtils";

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
      navigate("../");
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
    <article>
      <h2>View 페이지</h2>
      <Link to={`../edit/${formState.postId}`}>수정</Link>
      <button type="button" onClick={handleDelete}>삭제</button>
      <table id="boardTable">
        <colgroup>
          <col width="20%" />
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
            <td>{formState.contents}</td>
          </tr>
        </tbody>
      </table>

      <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
        댓글 작성
      </button>
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

    </article>
  </>)
}

export default BoardView;