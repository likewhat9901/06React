// import { BrowserRouter, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import BoardView from "./components/BoardView";
import CommentBtn from "./components/CommentBtn";

const nowDate = () => {
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  var hours = ("0" + dateObj.getHours()).slice(-2);
  var minutes = ("0" + dateObj.getMinutes()).slice(-2);

  return year + "-" + month + "-" + day + ' ' + hours + ':' + minutes;
};

function ModalWindow(props) {
  const boardData = props.boardData;
  const setBoardData = props.setBoardData;
  const nextNo = props.nextNo;
  const setNextNo = props.setNextNo;
  // const nowDate = props.nowDate;

  return (<>
    {/* <!-- 댓글 작성 Modal -->         */}
    <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="commentModalLabel">댓글 작성</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={
            (e)=>{
              /* submit 이벤트 차단 */
              e.preventDefault();

              let w = e.target.writer.value;
              let c = e.target.contents.value;

              let addBoardData = {no: nextNo, writer: w, likeNo: 0,
                  contents: c, date: nowDate()};

              let copyBoardData = [...boardData];
              copyBoardData.push(addBoardData);
              setBoardData(copyBoardData);
              setNextNo(nextNo+1);
              
              e.target.writer.value = '';
              e.target.contents.value = '';
          }}>
          <div className="modal-body">
            {/* <!-- 작성자명 입력 상자 추가 --> */}
            <div className="mb-3">
              <label htmlFor="commentAuthor" className="form-label">작성자명</label>
              <input type="text" className="form-control" id="commentAuthor" placeholder="이름을 입력하세요" name="writer"/>
            </div>
            {/* <!-- 댓글 입력 상자 --> */}
            <label htmlFor="commentContent" className="form-label">댓글 내용</label>
            <textarea className="form-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요" name="contents"></textarea>
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

function CommentList(props) {
  const { boardData, setBoardData, setEditNo } = props;

  /* ### 아이디별로 좋아요 다시누르면 취소되는거랑, 아이디당 한번만 되는거 넣으면 좋을듯 */
  const increaseLikeNo = (no) => {
    setBoardData(prevData =>
      prevData.map(item =>
        item.no === no ? {...item, likeNo: item.likeNo + 1} : item
      )
    );
  };

  const deleteList = (boardData, no) => {
    const newBoardData = boardData.filter(item => item.no !== no);
    setBoardData(newBoardData);
  }

  const lists = boardData.map((row, idx) => {
    return (
      <li className="list-group-item" key={row.no}>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <strong>{row.writer}</strong> <small className="ms-2">{nowDate()}</small>
          </div>
          <div>
            <button className="btn btn-outline-success btn-sm" onClick={() => increaseLikeNo(row.no)}>좋아요 ({row.likeNo})</button>
            <button className="btn btn-outline-warning btn-sm" onClick={() => {
              setEditNo(row.no);
              <ModalEdit />
              }}
              data-bs-toggle="modal" data-bs-target="#commentModalEdit" >수정</button>
            <button className="btn btn-outline-danger btn-sm" onClick={()=> deleteList(boardData, row.no)}>삭제</button>
          </div>
        </div>
        <p className="mt-2 mb-0">
          {row.contents}
        </p>
      </li>
    )
  })
  console.log(lists);

  return (<>
    {/* <!-- 댓글 목록 출력 --> */}
    <ul className="list-group mt-3">
      {lists}
    </ul>
  </>) 
}

function ModalEdit({ boardData, setBoardData, editNo }) {

  let vi = boardData.find(item => item.no === editNo) || { writer: '', contents: '' };
  console.log(vi);

  const [writer, setWriter] = useState(vi.writer);
  const [contents, setContents] = useState(vi.contents);
  console.log(vi.writer, vi.contents);

  return (<>
    {/* <!-- 댓글 작성 Modal -->  */}
    <div className="modal fade" id="commentModalEdit" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="commentModalLabel">댓글 수정</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={
            (e)=>{
              /* submit 이벤트 차단 */
              e.preventDefault();

              let w = e.target.writer.value;
              let c = e.target.contents.value;

              const editBoardData = { no: editNo, writer: w, contents: c, date: nowDate() };

              const newBoardData = boardData.map(item =>
                item.no === editNo ? editBoardData : item
              );

              setBoardData(newBoardData);
              
              e.target.writer.value = '';
              e.target.contents.value = '';
          }}>
          <div className="modal-body">
            {/* <!-- 작성자명 입력 상자 추가 --> */}
            <div className="mb-3">
              <label htmlFor="commentAuthor" className="form-label">작성자명</label>
              <input type="text" className="form-control" id="commentAuthor" placeholder="이름을 입력하세요" name="writer"
                value={writer} onChange={(e)=>{ setWriter(e.target.value) }} />
            </div>
            {/* <!-- 댓글 입력 상자 --> */}
            <label htmlFor="commentContent" className="form-label">댓글 내용</label>
            <textarea className="form-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요" name="contents"
              value={contents} onChange={(e)=>{ setContents(e.target.value) }} ></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">수정</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </>) 
}




function App() {
  const [boardData, setBoardData] = useState([
    {no: 1, writer: '낙짜쌤', date: '2023-01-01', likeNo: 0,
      contents: 'React를 뽀개봅시당'},
    {no: 2, writer: '유겸이', date: '2023-03-03', likeNo: 0,
      contents: 'Javascript는 할게 너무 많아요'},
    {no: 3, writer: '개똥이', date: '2023-05-05', likeNo: 0,
      contents: 'Project는 뭘 만들어볼까?'},
  ]);

  const [nextNo, setNextNo] = useState(4);
  const [editNo, setEditNo] = useState(null);



  return (<>
    <BoardView />
    <CommentBtn />
    <CommentList boardData={boardData} setBoardData={setBoardData} setEditNo={setEditNo} />
    <ModalWindow 
      boardData={boardData} setBoardData={setBoardData} nextNo={nextNo} setNextNo={setNextNo} />
    <ModalEdit boardData={boardData} setBoardData={setBoardData} editNo={editNo} />
  </>)
}

export default App;