import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

function TopNav() {
  const { user, logout } = useAuth();
  
  return (<>
    <nav className={css.topNav}>
      <ul>
        {user ? (<>
          <li >{`안녕하세요, ${user.id} 님`}</li> 
          <li onClick={logout}>로그아웃</li> 
        </>) : (
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
        <Link to="/">
          <img src="/images/MySalad.png" alt="LOGO" />
        </Link>
      </div>

      <nav className={css.gnb_menu}>
        <ul>
          <li><Link to="/board/main/lists">자유게시판</Link></li>
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
        <div className={css.menuInner}>
          <p><a href="#">내 가계부</a></p>
          <p><a href="#">카테고리 관리</a></p>
          <p><a href="#">지출 입력</a></p>
          <p><a href="#">수입 입력</a></p>
          <p><a href="#">월별 통계</a></p>
          <p><a href="#">맞춤 리포트</a></p>
          <p><a href="#">설정</a></p>
        </div>
      </div>
    </div>
  </>)
}


function Header() {
  
  return (<>
    <div className={css.header}>
      <TopNav />
      <GNB />
    </div>
  </>)
}

export default Header;