import { useEffect, useState } from "react";

import { firestore } from "@/features/firestore"
import { doc, updateDoc } from "firebase/firestore";

import css from './EditCommentModal.module.css';

function EditCommentModal({ editComment, fetchComments, setEditComment }) {
  const [writer, setWriter] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (editComment) {
      setWriter(editComment.writer);
      setComment(editComment.text); // 수정할 댓글 내용 넣기
    }
  }, [editComment]);
  
  const handleClose = () => {
    setComment("");
    setEditComment(null);
  };
  
  const handleUpdate = async () => {
    if (!comment.trim()) return;
    await updateDoc(doc(firestore, "comments", editComment.id), { text: comment });
    fetchComments(); // 다시 불러오기
    handleClose();
  };

  return (<>
    {/* <!-- 댓글 작성 Modal -->         */}
    <div className="modal fade" id="editCommentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className={`modal-content ${css.modalContent}`}>
          <div className={`modal-header ${css.modalHeader}`}>
            <h5 className={`modal-title ${css.modalTitle}`} id="commentModalLabel">댓글 수정</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={handleUpdate}>
          <div className="modal-body">
            {/* <!-- 작성자명 입력 상자 추가 --> */}
            <div className={`mb-3 ${css.inputGroup}`}>
              <label htmlFor="commentAuthor" className={`form-label ${css.formLabel}`}>작성자명</label>
              <input type="text" className={`form-control ${css.inputField}`} id="commentAuthor" placeholder="이름을 입력하세요" name="writer"
                value={writer} disabled />
            </div>
            {/* <!-- 댓글 입력 상자 --> */}
            <div className={css.inputGroup}>
              <label htmlFor="commentContent" className={`form-label ${css.formLabel}`}>댓글 내용</label>
              <textarea className={`form-control ${css.textArea}`} id="commentContent" rows="3" placeholder="댓글을 입력하세요" name="contents"
                value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
            </div>
          </div>

          <div className={css.modalFooter}>
            <button type="submit" className={css.primaryBtn} >작성</button>
            <button type="button" className={css.secondaryBtn} data-bs-dismiss="modal"
              onClick={()=>{
                setWriter('');
                setComment('');
                setEditComment(null);
              }}>
              닫기
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </>);
}

export default EditCommentModal;
