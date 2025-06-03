import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { firestore } from "@/features/firestore"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import css from './WriteCommentModal.module.css';

function WriteCommentModal({ postId, fetchComments }) {
  const [writer, setWriter] = useState('');
  const [comment, setComment] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    /* comment가 빈값이면 실행취소 */
    if (!comment.trim()) return;

    /* DB 업로드 */
    await addDoc(collection(firestore, "comments"), {
      postId,
      writer,
      text: comment,
      createdAt: serverTimestamp(),
    });

    setWriter(''); // 입력창 초기화
    setComment(''); // 입력창 초기화
    fetchComments();

  };
  
  useEffect(() => {
    const handler = () => {
      // Bootstrap 모달 열릴 때 포커스 주기
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const modalEl = document.getElementById('commentModal');
    modalEl?.addEventListener('shown.bs.modal', handler); // 모달 열린 후 이벤트

    return () => {
      modalEl?.removeEventListener('shown.bs.modal', handler); // 클린업
    };
  }, []);

  return (<>
    {/* <!-- 댓글 작성 Modal -->         */}
    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className={`modal-content ${css.modalContent}`}>
          <div className={`modal-header ${css.modalHeader}`}>
            <h5 className={`modal-title ${css.modalTitle}`} id="commentModalLabel">댓글 작성</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={handleCommentSubmit}>
          <div className="modal-body">
            {/* <!-- 작성자명 입력 상자 추가 --> */}
            <div className={`mb-3 ${css.inputGroup}`}>
              <label htmlFor="commentAuthor" className={`form-label ${css.formLabel}`}>작성자명</label>
              <input ref={inputRef} type="text" className={`form-control ${css.inputField}`} id="commentAuthor" placeholder="이름을 입력하세요" name="writer"
                value={writer} onChange={(e)=>setWriter(e.target.value)}/>
            </div>
            {/* <!-- 댓글 입력 상자 --> */}
            <div className={css.inputGroup}>
              <label htmlFor="commentContent" className={`form-label ${css.formLabel}`}>댓글 내용</label>
              <textarea className={`form-control ${css.textArea}`} id="commentContent" rows="3" placeholder="댓글을 입력하세요" name="contents"
                value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
            </div>
          </div>

          <div className={css.modalFooter}>
            <button type="submit" className={`btn btn-primary ${css.primaryBtn}`} data-bs-dismiss="modal">
              작성
            </button>
            <button type="button" className={`btn btn-secondary ${css.secondaryBtn}`} data-bs-dismiss="modal"
              onClick={()=>{
                setWriter('');
                setComment('');
              }}>
              닫기
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </>) 
}
export default WriteCommentModal;