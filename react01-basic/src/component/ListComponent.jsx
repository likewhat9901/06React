// 함수형 컴포넌트 생성. 파일과 동일명.
function ListComponent(props){
  /* 컴포넌트에서 실제 표현해야 하는 UI를 return문 내부에 기술.
  기존 클래스형 컴포넌트에서 render()함수가 있었는데,
  함수형에서는 return이 역할을 대신함. */
  return (<>
    {/* JSX를 통해 UI를 표현할때 최상위 엘리먼트는 반드시 하나여야 한다.
    현 시점에는 React에서 프레그먼트(Fragment)를 제공하므로 이를 통해
    묶어주면 된다. 프레그먼트는 빈 꺽쇄괄호로 표현하면 된다. */}
    {/* 목록부분 */}
    <header>
      <h2>게시판-목록</h2>
    </header>
    <nav>
      {/* a태그의 기본동작(화면이동)을 차단하고, Props로 전달받은 함수를
      호출하여 State를 write로 변경한다. */}
      <a href="/" onClick={(event) => {
        event.preventDefault();
        props.changeMode('write');
      }}>글쓰기</a>
    </nav>
    <article>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {/* 스타일 설정을 위해 사용한 class 속성은 className으로 변경해야 한다.
          JavaScript에는 이미 class 키워드가 있기 때문이다. */}
          <tr>
            <td className="cen">1</td>
            <td><a href="/" onClick={(event) => {
              event.preventDefault();
              props.changeMode('view');
            }}>오늘은 React 공부하는날</a></td>   
            <td className="cen">낙짜쌤</td>
            <td className="cen">2030-05-05</td>
          </tr>
        </tbody>
      </table>
    </article>
  </>)
}

export default ListComponent