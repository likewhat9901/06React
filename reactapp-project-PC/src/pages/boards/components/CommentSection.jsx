
import { firestore } from "@/features/firestore"
import { deleteDoc, doc } from "firebase/firestore";
import { formatDate } from "../utils/dateUtils";

import css from "./CommentSection.module.css"

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
    <div className={css.viewContainer}>
      <ul className={css.commentList}>
        {comments.map(c => (
          <li key={c.id} className={css.commentItem}>
            <div className={css.commentGroup}>
              <span className={css.commentWriter}>{c.writer}</span>
              <span className={css.commentText} style={{ whiteSpace: 'pre-wrap' }}>{c.text}</span>
              <span className={css.commentDate}>{formatDate(c.createdAt)}</span>
            </div>
            <div className={css.buttonGroup}>
              <button
                className={css.actionButton}
                data-bs-toggle="modal"
                data-bs-target="#editCommentModal"
                onClick={() => setEditComment(c)}
              >
                수정
              </button>
              <button className={css.actionButton}
                onClick={() => handleDelete(c.id)}>삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentSection;
