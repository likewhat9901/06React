import { Link, useParams } from "react-router-dom";

function View(props) {
  const navigate = props.navigate;

  const params = useParams();
  console.log("파라미터", params.no);

  const vi = props.boardData.reduce((prev, curr)=>{
    if(curr.no === Number(params.no)){
      prev = curr;
    }
    return prev;
  }, {});

  const currentNo = Number(params.no);
  const sortedList = [...props.boardData].sort((a, b) => a.no - b.no);
  const currentIndex = sortedList.findIndex(item => item.no === currentNo);
  const prevItem = sortedList[currentIndex - 1];
  const nextItem = sortedList[currentIndex + 1];
  
  // const maxNo = Math.max(...props.boardData.map(item => item.no));
  return (<>
    <header>
      <h2>게시판-읽기</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>&nbsp;
      <Link to={`/edit/${vi.no}`}>수정</Link>&nbsp;
      <Link to={`/delete/${vi.no}`}>삭제</Link>
    </nav>
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="20%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>{vi.writer}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{vi.title}</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{vi.date}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td style={{whiteSpace: "pre-wrap"}}>{vi.contents}</td>
          </tr>
        </tbody>
      </table>
    </article>
    {/* <button onClick={()=>{
      const prevNo = Number(params.no) - 1;
      if (prevNo < 1) {
        return;
      }
      navigate("/view/" + prevNo);
    }}>이전글</button> */}

    {/* <Link to={"/view/"+ (currentNo < maxNo ? currentNo + 1 : currentNo)}>
    다음글</Link> */}

    <Link to={prevItem ? `/view/${prevItem.no}` : "#"}>이전글</Link>
    <Link to={nextItem ? `/view/${nextItem.no}` : "#"}>다음글</Link>
  </>) 
}

export default View;