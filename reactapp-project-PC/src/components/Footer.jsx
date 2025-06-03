import css from './Footer.module.css';

function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.footerInner}>
        <div className={css.footerTop}>
          <img src="/images/MySalad_icon.png" alt="DataBada 로고" className={css.logo} />
          <div className={css.footerInfo}>
            <p>
              서울특별시 금천구 가산동 549-1 (가산디지털2로 101, 한라원앤원타워 B동) KOSMO<br />
              이메일: parkko123@naver.com
            </p>
            <p className={css.copyright}>
              Copyright 2025 CheonJiIn Card MySalad. All Rights Reserved.
            </p>
          </div>
          <div className={css.links}>
            <a href="#">이용약관</a>
            <span>|</span>
            <a href="#">개인정보처리방침</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
