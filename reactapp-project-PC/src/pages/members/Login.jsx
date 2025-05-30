import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

import { firestore } from "@/features/firestore"
import css from './Login.module.css';

/* DB에서 Account 정보 가져오기 */
const getAcc = async (loginId) => {  
  const docRef = doc(firestore, "Members", loginId);
  const docSnap = await getDoc(docRef);

  return docSnap;
}

/* localStorage 저장 */
const saveLocalStorage = async (id, pw) => {
  const userInfo = {
    id,
    pw,
  };
  localStorage.setItem('user', JSON.stringify(userInfo));
  console.log('user', userInfo);
};

/* Main Component */
function Login() {
  const navigate = useNavigate();

  /* 로그인 상태 확인 */
  const [user, setUser] = useState(() => {
    // 최초 렌더링 시 localStorage에서 user를 읽어옴
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  /* 로그아웃 */
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  
  /* 로그인 Submit */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loginId = e.target.loginId.value;
    const loginPw = e.target.loginPw.value;

    /* id 존재여부 확인 */
    const docSnap = await getAcc(loginId);
    
    /* 로그인 시도 */
    if (docSnap.exists()) {
      console.log("아이디 존재함");
      if (docSnap.data().pw === loginPw){
        console.log("로그인 성공", docSnap.data());
        /* localStorage에 로그인 정보 저장 */
        saveLocalStorage(loginId, loginPw);
        // navigate('/');
      }
      else {
        console.log("비밀번호 다름. 로그인 실패");
      }
    }
    else {
      console.log("아이디가 존재하지 않습니다.");
    }
  }

  return (
    <div className={css.loginContainer}>
      <h2 className={css.title}>로그인</h2>
      <form className={css.loginForm} onSubmit={handleLoginSubmit}>
        <div className={css.inputGroup}>
          <label htmlFor="loginId">아이디</label>
          <input type="text" id="loginId" name="loginId" placeholder="아이디 입력" required />
        </div>

        <div className={css.inputGroup}>
          <label htmlFor="loginPw">비밀번호</label>
          <input type="password" id="loginPw" name="loginPw" placeholder="비밀번호 입력" required />
        </div>

        <div className={css.options}>
          <label>
            <input type="checkbox" />
            아이디 저장
          </label>
          <label>
            <input type="checkbox" />
            보안키패드
          </label>
        </div>

        <button type="submit" className={css.loginBtn}>로그인</button>

        <div className={css.footer}>
          <a href="register">회원가입</a>
          <span>|</span>
          <a href="#">아이디 찾기 · 비밀번호 변경</a>
        </div>
        <div>
          {user ? (
            <>
              <p>안녕하세요, {user.id}님!</p>
              <button onClick={logout}>로그아웃</button>
            </>
          ) : (
            <p>로그인되지 않았습니다.</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
