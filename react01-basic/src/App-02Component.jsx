
function App() {
  return (<>
    <div className="App">
      <h2>React - 컴포넌트 만들기</h2>
      <MyBody></MyBody>
    </div>
  </>);
}

function MyBody(){
  return (
    <ol>
      <li>프론트엔드{}</li>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
        <li>jQuery</li>
      </ul>
      <li>백엔드</li>
      <ul>
        <li>Java</li>
        <li>Oracle</li>
        <li>JSP</li>
        <li>Spring Boot</li>
      </ul>
    </ol>
  );
}

export default App
