import css from './Footer.module.css';

function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.footerInner}>
        <div className={css.footerTop}>
          <img src="/images/MySalad_icon.png" alt="DataBada 로고" className={css.logo} />
          <div className={css.footerInfo}>
            <p>
              서울특별시 중구 을지로 100 (을지로2가, 파인에비뉴 A동) 신한카드<br />
              이메일: databada@shinhan.com
            </p>
            <p className={css.copyright}>
              Copyright 2024 Shinhan Card DataBada. All Rights Reserved.
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
