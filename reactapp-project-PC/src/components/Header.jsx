import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

function TopNav() {
  const { user, logout } = useAuth();
  
  return (<>
    <nav className={css.topNav}>
      <ul>
        {user ? (
          <li onClick={logout}>로그아웃</li> 
        ) : (
          <li><Link to="/member/login">로그인</Link></li>
        )}
        {user ? (
          <li><Link to="/member/edit">회원정보수정</Link></li> 
        ) : (
          <li><Link to="/member/register">회원가입</Link></li>
        )}
      </ul>
    </nav>
  </>) 
}


function GNB() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);
  

  return (<>
    <div className={css.gnb}>
      <div className={css.logo}>
        <a href="/">
          <img src="/images/MySalad.png" alt="LOGO" />
        </a>
      </div>

      <nav className={css.gnb_menu}>
        <ul>
          <li><Link to="/board/main/lists">게시판</Link></li>
          <li><Link to="/board/qna/lists">Q&A게시판</Link></li>
          <li><Link to="/board/file/lists">자료게시판</Link></li>
        </ul>
      </nav>

      <div className={css.hamburgerBtn} onClick={toggleMenu}>
        <button>
          <span className={menuOpen ? css.barOpen : ''}></span>
          <span className={menuOpen ? css.barOpen : ''}></span>
          <span className={menuOpen ? css.barOpen : ''}></span>
        </button>
      </div>

      <div className={menuOpen ? `${css.menu} ${css.menuOpen}` : css.menu}>
        <p><a href="#">Home</a></p>
        <p><a href="#">About</a></p>
        <p><a href="#">Contact</a></p>
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