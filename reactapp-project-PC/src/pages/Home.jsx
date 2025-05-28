// import styles from './home.module.css';

function name(params) {
  return (<>
    <div className={styles.homeWrapper}>
      {/* 메인 배너 영역 */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerText}>
          <h2>
            소비 Data 속 <br />
            숨겨진 Trend를 <br />
            확인하세요
          </h2>
          <a href="#" className={styles.ctaLink}>활용장 바로가기 &gt;</a>
        </div>
        <div className={styles.bannerImage}>
          {/* 👉 이미지 들어갈 자리 */}
        </div>
        <div className={styles.slideControls}>
          <span className={styles.slideNumber}>2/2</span>
          <div className={styles.navButtons}>
            <button>{"<"}</button>
            <button>{">"}</button>
          </div>
        </div>
      </section>

      {/* 로그인 박스 */}
      <aside className={styles.loginBox}>
        <div className={styles.profileIcon}>
          {/* 👉 프로필 아이콘 자리 */}
        </div>
        <p>로그인 후<br />나만의 맞춤 정보를 이용하세요.</p>
        <button className={styles.loginBtn}>로그인</button>
      </aside>

      {/* 정보 카드 */}
      <section className={styles.infoCard}>
        <div className={styles.infoHeader}>데이터테크 활용장</div>
        <div className={styles.infoHighlight}>데이터 활용 성공 노하우</div>
        <div className={styles.trendTag}>Trend Report</div>
        <p className={styles.trendText}>
          신한카드가 선정한 2025년<br />
          트렌드 키워드 'REVIVE'
        </p>
        <div className={styles.trendDate}>2025.01.17</div>
      </section>

      {/* 검색창 */}
      <section className={styles.searchSection}>
        <input
          type="text"
          placeholder="상품명, 해시태그"
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>🔍</button>
        <div className={styles.hashtags}>
          <span>#상권분석</span>
          <span>#개인사업자</span>
          <span>#특화업종</span>
          <span>#부동산</span>
          <span>#모니터링</span>
        </div>
      </section>
    </div>
  
  </>)
}

function Home() {
  return (<>
    <h2 style={{textAlign:'right'}}>홈</h2>
  </>);
}

export default Home;
