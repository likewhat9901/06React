/* 
이벤트처리
: HTML에서는 이벤트 리스너를 작성할때 대소문자를 구분하지 않는다.
하지만 React는 이벤트명의 첫글자를 반드시 대문자로 기술해야 한다.
또한 이벤트는 자식 컴포넌트가 부모 컴포넌트로 데이터를 전달하는 용도로 사용된다. */
function MyBody(props){
  const liTag1 = [], liTag2 = [];

  for (let i = 0; i < props.propData1.length; i++) {
    console.log(props.propData1[i]);
    liTag1.push(
      <li key={i}>{props.propData1[i]}</li>
    );
  }
  
  let keyCnt = 0;
  for (let row of props.propData2) {
    liTag2.push(
      <li key={keyCnt++}>{row}</li>
    );
  }

  return (
    <ol>
      <li><a href="/" onClick={()=>{props.onMyAlert1();}}>프론트엔드</a></li>
        <ul>
          {liTag1}
        </ul>
      <li><a href="/" onClick={(event)=>{
        event.preventDefault();
        props.onMyAlert2('백앤드');
      }}>백엔드</a></li>
        <ul>
          {liTag2}
        </ul>
    </ol>
  );
}

function App() {
  const myData1 = ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'React추가'];
  const myData2 = ['Java', 'Oracle', 'JSP', 'Spring', 'Nextjs추가'];

  return (<>
    <div className="App">
      <h2>React - Event 처리</h2>
      <MyBody propData1={myData1} propData2={myData2}
        /* 함수를 정의하여 자식 컴포넌트로 전달한다. 매개변수가 없는 형태로
        고정된 값을 경고창으로 띄운다. */
        onMyAlert1={() => {
          alert('알림창을 띄웁니다.');
        }}
        /* 매개변수가 있는 일반함수를 자식으로 전달한다. */
        onMyAlert2={function(msg){
          alert(msg);
          // 자식 컴포넌트
          console.error('전달된데이터', msg)
        }}
      ></MyBody>
    </div>
  </>);
}

export default App;
