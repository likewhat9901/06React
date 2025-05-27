import { Outlet, Link, useLocation } from "react-router-dom";
import Talk from "../talk/Talk";
import styles from './components.module.css';

function Layout() {
  const location = useLocation();

  const showTalk = location.pathname === '/talk';

  return (<>
    <header>
      <h2>헤더</h2>
      <button className={styles.button}><Link to="/member/register">회원가입</Link></button>
      <Link to="/member/login">로그인</Link>
      <Link to="/member/edit">회원수정</Link>
      <Link to="/board">게시판</Link>
      <Link to="/board/qna">Q&A게시판</Link>
      <Link to="/board/file">자료게시판</Link>
      <Link to="/talk">카카오톡</Link>
    </header>
    <section style={{
      width: '100%', height: '600px',
      border: '1px solid #ccc'
    }}>
      <Outlet />
    </section>
    <footer>
      <h2>푸터</h2>
    </footer>
    {showTalk && (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '400px',
        height: '600px',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)'
      }}>
        <Talk />
      </div>
    )}
  </>) 
}

export default Layout;