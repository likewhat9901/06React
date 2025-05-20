import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit(props) {
  const navigate = useNavigate();
  let params = useParams();
  console.log('idx:', Number(params.idx));

  // let [boardData, setBoardData] = useState({});
  /* 수정페이지로 진입할때는 기존 게시물을 읽어와서 폼에 설정해야 한다. 
  따라서 열람API를 요청한다. */
  let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  let parameter = "tname=nboard_news&idx="+params.idx
      +"&apikey=a24565c6d695e4eae797e790330bacd0";
  
  /* input의 value속성에 값을 설정하면 React는 readonly 속성으로 렌더링한다.
  따라서 이 값을 수정하려면 반드시 State가 필요하다. onChange 이벤트리스너에서
  setter함수를 호출해 값을 변경할 수 있다. */
  // input의 개수만큼 State 생성. 즉 수정하면 바뀌어야 되는 부분들.
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  // 열람 API를 호출하여 데이터를 얻어온다.
  useEffect(function(){
    fetch(requestUrl + "?" + parameter)
      .then((result)=>{
        return result.json();
      })
      .then((json)=>{
        // console.log(json);
        // 얻어온 데이터를 파싱해서 State의 Setter함수를 호출한다.
        setWriter(json.name);
        setTitle(json.subject);
        setContents(json.content);
      });
    return ()=>{
      console.log('useEffect실행==>컴포넌트 언마운트');
    }
  }, []);

  return (<>
    <header>
      <h2>게시판-수정</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>
    </nav>
    <article>
      {/* 입력한 수정 후 전송 버튼을 누르면 submit 이벤트가 발생된다. */}
      <form onSubmit={
        (event)=>{
          event.preventDefault();
          /* 폼값 정리 */
          let i = event.target.idx.value;
          let w = event.target.writer.value;
          let t = event.target.title.value;
          let c = event.target.contents.value;
          // console.log(w, t, c);

          fetch('http://nakja.co.kr/APIs/php7/boardEditJSON.php', {
            method: 'POST',
            headers: {
              'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
            },
            /* 수정이므로 idx가 포함되어야 한다. */
            body: new URLSearchParams({
              tname: 'nboard_news',
              id: 'jsonAPI',
              name: w,
              subject: t,
              content: c,
              idx: i,
              apikey: "a24565c6d695e4eae797e790330bacd0"
            }),
          })
            .then((response)=> response.json())
            .then((json)=> console.log(json))
            .catch((error) => {
              console.error("edit fetch 오류남", error)
            });
          
          // 수정후 열람페이지로 이동.
          navigate('/view/'+params.idx);
        }
      }>
        {/* 수정의 경우 게시물의 일련번호를 서버로 전송해야 하므로 아래와 같이 
        hidden 타입의 상자를 만들어서 값을 설정해야 한다. */}
        <input type="hidden" name="idx" value={params.idx} />
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              {/* State에 저장된 값을 value에 설정하고, onChange 이벤트 리스너를 통해
              입력한 값을 실시간으로 변경해서 적용. */}
              <td><input
                type="text" name="writer"
                value={writer}
                onChange={(event) => setWriter(event.target.value)}
              /></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input
                type="text" name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              /></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea 
                name="contents" cols="22" rows="3"
                value={contents}
                style={{whiteSpace: "pre"}}
                onChange={(event) => setContents(event.target.value)}
              ></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="수정" />
      </form>
    </article>
  </>) 
}

export default Edit;