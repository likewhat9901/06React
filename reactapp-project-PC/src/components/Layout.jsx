import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Talk from "./talk/Talk";
import styles from './layout.module.css';
import hamburger from '../images/hamburger_menu.png'

function TopNavi(props) {
  
  return (<>
    <header className={styles.header}>
      <div className={styles.head_inner}>
        <div className={styles.login_wrap}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/member/login">로그인</Link></li>
            <li><Link to="/member/register">회원가입</Link></li>
            <li><Link to="/member/edit">회원수정</Link></li>
          </ul>
        </div>
        <div className={styles.gnb_wrap}>
          <h1 className={styles.gnb_logo}>
            <a href="/"><img src="/" alt="LOGO" /></a>
          </h1>
          <nav className={styles.gnb_menu}>
            <ul>
              <li><Link to="/board">게시판</Link></li>
              <li><Link to="/board/qna">Q&A게시판</Link></li>
              <li><Link to="/board/file">자료게시판</Link></li>
            </ul>
          </nav>
          <div className={styles.util_menu}>
            <img src={hamburger} alt="" />
          </div>
        </div>
      </div>
    </header>
  </>) 
}

function Footer(props) {
  
  return (<>
    <footer>  
      <h2>푸터</h2>
    </footer>
  </>) 
}

function Layout() {
  const [showTalk, setShowTalk] = useState(false);

  return (<div className={styles.body}>
    <TopNavi />
    <section className={styles.outlet}>
      <Outlet />
    </section>
    <Footer />

    <button onClick={() => setShowTalk(!showTalk)}
      className={styles.chat_button}
    >
        {showTalk ? "채팅 닫기" : "채팅 열기"}
    </button>
    {showTalk && (
      <div className={styles.chat_div}>
        <Talk />
      </div>
    )}
  </div>) 
}

export default Layout;