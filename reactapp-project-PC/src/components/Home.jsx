import { Link } from "react-router-dom";

function Home() {
  
  return (<>
    <h2>홈페이지</h2>
    <Link to="/member/register">회원가입</Link>
    <Link to="/member/login">로그인</Link>
    <Link to="/member/edit">회원수정</Link>
    <Link to="/board">게시판</Link>
    <Link to="/board/qna">Q&A게시판</Link>
    <Link to="/board/file">자료게시판</Link>
    <Link to="/talk">카카오톡</Link>
  </>)
}

export default Home;