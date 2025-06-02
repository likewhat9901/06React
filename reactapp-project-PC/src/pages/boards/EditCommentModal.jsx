import { useEffect, useState } from "react";

import { firestore } from "@/features/firestore"
import { doc, updateDoc } from "firebase/firestore";

function EditCommentModal({ editComment, fetchComments, setEditComment }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (editComment) {
      setText(editComment.text); // 수정할 댓글 내용 넣기
    }
  }, [editComment]);
  
  const handleClose = () => {
    setText("");
    setEditComment(null);
  };
  
  const handleUpdate = async () => {
    if (!text.trim()) return;
    await updateDoc(doc(firestore, "comments", editComment.id), { text });
    fetchComments(); // 다시 불러오기
    handleClose();
  };

  if (!editComment) return null;

  return (
    <div className="modal fade" id="editCommentModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">댓글 수정</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <textarea
              className="form-control"
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button
              className="btn btn-primary"
              onClick={handleUpdate}
              data-bs-dismiss="modal"
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCommentModal;
