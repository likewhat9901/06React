import { useEffect, useState } from 'react';

import css from './Home.module.css';

const bannerData = [
  {
    text: (
      <>
        코스모 카리나<br />
        <strong style={{color: 'hotpink'}}>혜림이가</strong><br />
        와또요
      </>
    ),
    image: '/images/코스모카리나.jpg',
    color: '#fff',
  },
  {
    text: (
      <>
        소비 Data 속<br />
        숨겨진 <strong>Trend</strong>를<br />
        확인하세요
      </>
    ),
    image: '/images/카리나.avif',
  },
  {
    text: (
      <>
        새로운 시장을<br />
        <strong>데이터로 예측</strong><br />
        해보세요
      </>
    ),
    image: '/images/카리나4.jpg',
  },
  {
    text: (
      <>
        BankSalad와 함께<br />
        <strong>무한한 인사이트</strong><br />
        를 발견하세요
      </>
    ),
    image: '/images/카리나단발.jpg',
  },
];

function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % bannerData.length);
    }, 5000); // 5초마다 전환
    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className={css.homeContainer}>
      {/* 슬라이드형 이미지 영역 */}
      <section
        className={css.bannerSection}
        style={{ backgroundImage: `url(${bannerData[index].image})` }}
      >
        <div className={css.bannerContent}>
          <div className={css.bannerText}>
            <h2 style={{ color: bannerData[index].color }}>
              {bannerData[index].text}
            </h2>
            <a href="#" className={css.bannerLink}>활용장 바로가기 &gt;</a>
          </div>
        </div>
      </section>

      {/* 🔵 상단 검색/해시태그 영역 */}
      <section className={css.searchSection}>
        <div className={css.searchBar}>
          <input
            type="text"
            placeholder="게시글명, 해시태그"
            className={css.searchInput}
          />
          <button className={css.snsButton}>
            🔍
          </button>
        </div>
        <div className={css.hashtagList}>
          <span>#가계부분석</span>
          <span>#뱅크샐러드</span>
          <span>#소비패턴</span>
          <span>#AI분석</span>
          <span>#모니터링</span>
        </div>
      </section>

      {/* 🔳 서비스 카드 영역 */}
      <section className={css.serviceSection}>
        <div className={css.serviceCard}>
          <h4>다양한</h4>
          <h3>Data서비스</h3>
          <p>Data One-Stop Service</p>
        </div>
        <div className={css.serviceCard}>
          <h4>혁신적인</h4>
          <h3>솔루션서비스</h3>
          <p>상권분석, 시장 모니터링</p>
        </div>
        <div className={css.serviceCard}>
          <h4>스마트한</h4>
          <h3>광고서비스</h3>
          <p>최적의 고객 타겟팅</p>
        </div>
        <div className={css.serviceCard}>
          <h4>탁월한</h4>
          <h3>API서비스</h3>
          <p>Data 실시간 활용</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
