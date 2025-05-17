import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function Edit(props) {

  const boardData = props.boardData;
  const setBoardData = props.setBoardData;
  const navigate = props.navigate;
  const nowDate = props.nowDate;

  var params = useParams();
  console.log('params:', params.no);
  let pno = Number(params.no);

  let vi = boardData.reduce((prev, curr)=>{
    if(curr.no === pno){
      prev = curr;
    }
    return prev;
  }, {});

  const [writer, setWriter] = useState(vi.writer);
  const [title, setTitle] = useState(vi.title);
  const [contents, setContents] = useState(vi.contents);

  return (<>
    <header>
      <h2>게시판-수정</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>
    </nav>
    <article>
      <form onSubmit={
        (event)=>{
          event.preventDefault();

          let w = event.target.writer.value;
          let t = event.target.title.value;
          let c = event.target.contents.value;

          let editBoardData = {no: pno, title: t, writer: w,
              contents: c, date: nowDate()};

          let copyBoardData = [...boardData];
          for (let i = 0; i < copyBoardData.length; i++) {
            if (copyBoardData[i].no === pno) {
              copyBoardData[i] = editBoardData;
              break;
            } 
          }
          setBoardData(copyBoardData);
          navigate('/list');
        }
      }>
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="writer" value={writer}
                onChange={(event)=>{
                setWriter(event.target.value);
              }}  /></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title" onChange={(event)=>{
                setTitle(event.target.value);
              }} value={title} /></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea name="contents" cols="22" rows="3" 
                style={{whiteSpace: "pre"}} onChange={(event)=>{
                setContents(event.target.value);
              }} value={contents} ></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송" />
      </form>
    </article>
  </>) 
}

export default Edit;