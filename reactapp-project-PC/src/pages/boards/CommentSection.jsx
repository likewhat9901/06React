
import { firestore } from "@/features/firestore"
import { deleteDoc, doc } from "firebase/firestore";
import { formatDate } from "./dateUtils";

function CommentSection({ comments, fetchComments, setEditComment }) {

  const handleDelete = async (commentId) => {
    if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
      try {
        await deleteDoc(doc(firestore, "comments", commentId));
        alert("삭제 완료");
        fetchComments(); // 삭제 후 목록 갱신
      } catch (error) {
        console.error("댓글 삭제 오류:", error);
        alert("삭제 중 오류 발생");
      }
    }
  };

  return (
    <div>
      <ul>
        {comments.map(c => (
          <li key={c.id}>
            <span style={{ whiteSpace: 'pre-wrap' }}>{c.text}</span>
            <span>{formatDate(c.createdAt)}</span>
            <button onClick={() => handleDelete(c.id)}>삭제</button>
            <button
              data-bs-toggle="modal"
              data-bs-target="#editCommentModal"
              onClick={() => setEditComment(c)}
            >
              수정
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentSection;
