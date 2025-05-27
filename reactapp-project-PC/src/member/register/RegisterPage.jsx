import { Link } from "react-router-dom";

function RegisterPage() {
  
  return (<>
    <h2>회원가입 페이지</h2>
    <Link to="/member/login">로그인페이지</Link>
    <Link to="/member/edit">회원수정페이지</Link>
    <Link to="/">Home</Link>
  </>) 
}

export default RegisterPage;