import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import { firestore } from "@/features/firestore"
import { doc, getDoc } from 'firebase/firestore';

import css from './Login.module.css';


/* DB에서 Account 정보 가져오기 */
const getAcc = async (loginId) => {  
  const docRef = doc(firestore, "members", loginId);
  const docSnap = await getDoc(docRef);

  return docSnap;
}

/* localStorage 저장 */
const saveLocalStorage = async (id, pw) => {
  const userInfo = {
    id, pw,
  };
  localStorage.setItem('user', JSON.stringify(userInfo));
  console.log('saved_userInfo_localStorage', JSON.stringify(userInfo));
};

/* Main Component */
function Login() {
  // const navigate = useNavigate();

  /* formState로 변수 저장 및 관리 */
  const [formState, setFormState] = useState(()=>{
    const storedUser = localStorage.getItem("user");
    return{
      loginId: '', loginPw: '',
      user: storedUser ? JSON.parse(storedUser) : null,
    }
  });

  /* 아이디, 비밀번호 input Change 함수 */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  /* 로그아웃 */
  const logout = () => {
    localStorage.removeItem("user");
    setFormState((prev) => ({ ...prev, user: null }));
  };
  
  /* 로그인 Submit */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    /* 구조분해 할당으로 속성값 변수에 할당하기 (특정 속성 값 꺼내쓰기) */
    const { loginId, loginPw } = formState;
    /* id로 DocumentSnapshot 객체 가져오기 */
    const docSnap = await getAcc(loginId);
    
    /* 로그인 시도 */
    if (docSnap.exists()) {
      console.log("아이디 존재함");
      if (docSnap.data().pw === loginPw){
        /* localStorage에 로그인 정보 저장 */
        await saveLocalStorage(loginId, loginPw);
        setFormState((prev) => ({
          ...prev, loginId: '', loginPw: '', user: { id: loginId, pw: loginPw },
        }));
        // navigate('/');
      }
      else {
        alert("비밀번호 다름. 로그인 실패");
      }
    }
    else {
      alert("아이디가 존재하지 않습니다.");
    }
  }

  return (
    <div className={css.loginContainer}>
      <h2 className={css.title}>로그인</h2>
      <form className={css.loginForm} onSubmit={handleLoginSubmit}>
        <div className={css.inputGroup}>
          <label htmlFor="loginId">아이디</label>
          <input type="text" id="loginId" name='loginId' placeholder="아이디 입력" required
            value={formState.loginId} onChange={handleInputChange} />
        </div>

        <div className={css.inputGroup}>
          <label htmlFor="loginPw">비밀번호</label>
          <input type="password" id="loginPw" name="loginPw" placeholder="비밀번호 입력" required
            value={formState.loginPw} onChange={handleInputChange} />
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
          {formState.user ? (
            <>
              <p>안녕하세요, {formState.user.id}님!</p>
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
