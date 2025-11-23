// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>오늘운빨뭐고 | 명리학 운세</title>
      </Head>

      <div className={styles.page}>
        {/* 상단 브랜드 영역 */}
        <header className={styles.header}>
          <div className={styles.logoRow}>
            <span className={styles.smallIcon}>✨</span>
            <span className={styles.serviceName}>오늘운빨뭐고</span>
            <span className={styles.smallIcon}>✨</span>
          </div>
          <p className={styles.headerSub}>
            사주팔자를 바탕으로 한 맞춤형 운세를 확인해보세요
          </p>
        </header>

        {/* 메인 컨텐츠 */}
        <main className={styles.main}>
          {/* 가운데 아이콘 + 설명 */}
          <section className={styles.hero}>
            <div className={styles.heroIconWrap}>
              <div className={styles.heroIcon}>✶</div>
              <span className={styles.heroStar}>⭐</span>
              <span className={styles.heroSparkle}>✨</span>
            </div>

            <h1 className={styles.heroTitle}>당신의 운명을 알려드립니다</h1>
            <p className={styles.heroDesc}>
              전통 명리학을 기반으로 한 정확한 사주팔자 분석
              <br />
              천간지지, 오행, 대운을 통해 당신의 운세를 해석해보세요
            </p>
          </section>

          {/* 기능 3가지 카드 */}
          <section className={styles.featureRow}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📅</div>
              <h3 className={styles.featureTitle}>사주팔자</h3>
              <p className={styles.featureText}>
                생년월일과 시간을 바탕으로
                <br />
                정확한 사주팔자를 분석합니다.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚖️</div>
              <h3 className={styles.featureTitle}>오행 분석</h3>
              <p className={styles.featureText}>
                목, 화, 토, 금, 수 오행의
                <br />
                균형을 파악하여 운세를 해석합니다.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⭐</div>
              <h3 className={styles.featureTitle}>맞춤 운세</h3>
              <p className={styles.featureText}>
                재물운, 애정운, 건강운 등<br />
                종합적인 운세 정보를 제공합니다.
              </p>
            </div>
          </section>

          {/* 하단 CTA 카드 */}
          <section className={styles.ctaCard}>
            <p className={styles.ctaTitle}>지금 바로 시작하세요</p>
            <p className={styles.ctaDesc}>
              로그인하고 당신만의 맞춤 운세를 확인해보세요.
            </p>

            <Link href="/login" className={styles.ctaButton}>
              🔮운세 보러 가기
            </Link>

            <p className={styles.ctaFooter}>
              전통 명리학 기반 · <span>정확한 사주 분석</span> ·{' '}
              <span>맞춤형 운세</span>
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
