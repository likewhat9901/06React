import { useState } from "react";

import { firestore } from "@/features/firestore"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function WriteCommentModal({ postId, fetchComments }) {
  const [comment, setComment] = useState('');
  // const [comments, setComments] = useState([]); 

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    /* comment가 빈값이면 실행취소 */
    if (!comment.trim()) return;

    /* DB 업로드 */
    await addDoc(collection(firestore, "comments"), {
      postId,
      text: comment,
      createdAt: serverTimestamp(),
    });

    setComment(""); // 입력창 초기화
    fetchComments();
  };

  return (<>
    {/* <!-- 댓글 작성 Modal -->         */}
    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="commentModalLabel">댓글 작성</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={handleCommentSubmit}>
          <div className="modal-body">
            {/* <!-- 작성자명 입력 상자 추가 --> */}
            <div className="mb-3">
              <label htmlFor="commentAuthor" className="form-label">작성자명</label>
              <input type="text" className="form-control" id="commentAuthor" placeholder="이름을 입력하세요" name="writer"/>
            </div>
            {/* <!-- 댓글 입력 상자 --> */}
            <label htmlFor="commentContent" className="form-label">댓글 내용</label>
            <textarea className="form-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요" name="contents"
              value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
          </div>
          <div className="modal-footer">
            {/* ### 닫기했을때 작성한 것들 다 없어지면 좋을 것 같은데. */}
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            {/* ### 작성한게 없으면 안닫히게 해야됨. 지금은 dismiss로 바로 닫힘 */}
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">작성</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </>) 
}
export default WriteCommentModal;