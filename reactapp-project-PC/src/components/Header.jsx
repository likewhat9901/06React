import { Link } from "react-router-dom";
import css from "./Header.module.css";

function TopNav(props) {
  
  return (<>
    <nav className={css.topNav}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/member/login">로그인</Link></li>
        <li><Link to="/member/register">회원가입</Link></li>
        <li><Link to="/member/edit">회원수정</Link></li>
      </ul>
    </nav>
  </>) 
}

function GNB() {
  
  return (<>
    <div className={css.gnb}>
      <a href="/">
        <img src="/" alt="LOGO" />
      </a>
      <nav className={css.gnb_menu}>
        <ul>
          <li><Link to="/board">게시판</Link></li>
          <li><Link to="/board/qna">Q&A게시판</Link></li>
          <li><Link to="/board/file">자료게시판</Link></li>
        </ul>
      </nav>
      <div >
        <h2>햄버거 메뉴바</h2>
      </div>
    </div>
  </>)
}


function Header() {
  
  return (<>
    <header className={css.header}>
      <TopNav />
      <GNB />
    </header>
  </>)
}

export default Header;