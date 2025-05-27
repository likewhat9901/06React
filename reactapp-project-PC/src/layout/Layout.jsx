import { Outlet, Link } from "react-router-dom";

function Layout() {
  
  return (<>
    <h2>전체 레이아웃</h2>
    <Link to="/member/login">로그인페이지</Link>
    <Outlet />
  </>) 
}

export default Layout;