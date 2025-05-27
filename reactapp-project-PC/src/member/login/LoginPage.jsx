import { Link } from "react-router-dom";

function LoginPage() {
  
  return (<>
    <h2>로그인 페이지</h2>
    <Link to="/member/register">회원가입페이지</Link>
    <Link to="/member/edit">회원수정페이지</Link>
    <Link to="/">Home</Link>
  </>) 
}

export default LoginPage;