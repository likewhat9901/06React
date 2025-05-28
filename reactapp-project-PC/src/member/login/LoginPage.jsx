import styles from './login.module.css';

function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>로그인</h2>
      <form className={styles.loginForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="loginId">아이디</label>
          <input
            type="text"
            id="loginId"
            name="loginId"
            placeholder="이메일 아이디 입력"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="loginPw">비밀번호</label>
          <input
            type="password"
            id="loginPw"
            name="loginPw"
            placeholder="비밀번호 입력"
            required
          />
        </div>

        <div className={styles.options}>
          <label>
            <input type="checkbox" />
            아이디 저장
          </label>
          <label>
            <input type="checkbox" />
            보안키패드
          </label>
        </div>

        <button type="submit" className={styles.loginBtn}>로그인</button>

        <div className={styles.footer}>
          <a href="#">회원가입</a>
          <span>|</span>
          <a href="#">아이디 찾기 · 비밀번호 변경</a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
