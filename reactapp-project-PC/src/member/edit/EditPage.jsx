import { Link } from "react-router-dom";

function EditPage() {
  
  return (<>
    <h2>회원수정 페이지</h2>
    <Link to="/member/register">회원가입 페이지</Link>
    <Link to="/member/login">로그인 페이지</Link>
    <Link to="/">Home</Link>
  </>) 
}

export default EditPage;