import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { firestore } from "@/features/firestore"
import { doc, getDoc } from 'firebase/firestore';

import css from './Login.module.css';
import { useAuth } from "@/contexts/AuthContext";


/* DB에서 Account 정보 가져오기 */
const getAcc = async (loginId) => {  
  const docRef = doc(firestore, "members", loginId);
  const docSnap = await getDoc(docRef);
  return docSnap;
}


/* Main Component */
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  /* formState로 변수 저장 및 관리 */
  const [formState, setFormState] = useState(()=>{
    return{
      loginId: '', loginPw: '',
    }
  });

  /* 아이디, 비밀번호 input Change 함수 */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  /* 로그인 Submit */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    /* 구조분해 할당으로 속성값 변수에 할당하기 (특정 속성 값 꺼내쓰기) */
    const { loginId, loginPw } = formState;
    /* id로 DocumentSnapshot 객체 가져오기 */
    const docSnap = await getAcc(loginId);
    
    /* DB user 존재여부 확인 */
    if (docSnap.exists()) {
      /* DB 패스워드와 비교  */
      if (docSnap.data().pw === loginPw){
        /* localStorage에 로그인 정보 저장 */
        login({ id: loginId, pw: loginPw });
        navigate('/');
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

        <button type="submit" className={css.loginBtn}>로그인</button>

        <div className={css.footer}>
          <a href="register">회원가입</a>
          <span>|</span>
          <a href="#">아이디 찾기 · 비밀번호 변경</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
