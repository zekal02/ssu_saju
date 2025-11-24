// pages/saju.js
import { useState } from 'react';
import axios from 'axios';
import styles from '@/styles/Saju.module.css';
import AdBanner from '../components/AdBanner';

export default function SajuPage() {
  const [birth, setBirth] = useState(''); // 생년월일 (YYYY-MM-DD)
  const [calendar, setCalendar] = useState('양력'); // 양력/음력
  const [gender, setGender] = useState(''); // 성별
  const [time, setTime] = useState('모름'); // 태어난 시간
  const [topic, setTopic] = useState('전체운'); // 궁금한 운세
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  // 행운의 물건용 상태 (텍스트만)
  const [luckyItem, setLuckyItem] = useState('');
  const [loadingLucky, setLoadingLucky] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!birth || !calendar || !gender || !time) {
      alert('필수 항목을 모두 선택해주세요.');
      return;
    }

    const message = `
생년월일: ${birth}
양력/음력: ${calendar}
성별: ${gender}
태어난 시간: ${time}
궁금한 것: ${topic}

위 정보를 바탕으로 한국식 명리학(사주팔자) 관점에서 ${topic}을 중심으로 운세를 자세하게 설명해 주세요.
너무 무섭지 않게, 현실적인 조언과 함께 알려주세요.
    `.trim();

    try {
      setLoading(true);
      setAnswer('');
      setLuckyItem('');
      const res = await axios.post('/api/chat', { message });
      setAnswer(res.data.reply);
    } catch (err) {
      console.error(err);
      alert('운세를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLuckyItem() {
    try {
      setLoadingLucky(true);
      setLuckyItem('');

      const res = await axios.post('/api/lucky', {
        birth,
        calendar,
        gender,
        time,
      });

      setLuckyItem(res.data.luckyText);
    } catch (err) {
      console.error(err);
      alert('행운의 물건을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoadingLucky(false);
    }
  }

  return (
    <div className={styles.page}>
      {/* 상단 헤더 */}
      <header className={styles.header}>
        <div className={styles.iconRow}>
          <span className={styles.icon}>✨</span>
          <span className={styles.icon}>🔮</span>
        </div>
        <h1 className={styles.title}>오늘운빨뭐고</h1>
        <p className={styles.subtitle}>
          사주팔자를 바탕으로 한 맞춤형 운세를 확인해보세요
        </p>
      </header>

      {/* 메인 카드 */}
      <main className={styles.main}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>사주 정보 입력</h2>
            <p className={styles.cardDesc}>
              정확한 사주풀이를 위해 아래 정보를 입력해주세요
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* 생년월일 */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                생년월일 <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                className={styles.input}
                placeholder="연도-월-일"
              />
            </div>

            {/* 양력 / 음력 */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                양력/음력 <span className={styles.required}>*</span>
              </label>
              <select
                value={calendar}
                onChange={(e) => setCalendar(e.target.value)}
                className={styles.select}
              >
                <option value="양력">양력</option>
                <option value="음력">음력</option>
              </select>
            </div>

            {/* 성별 */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                성별 <span className={styles.required}>*</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={styles.select}
              >
                <option value="">성별을 선택해주세요</option>
                <option value="남자">남자</option>
                <option value="여자">여자</option>
                <option value="말하지 않음">말하지 않음</option>
              </select>
            </div>

            {/* 태어난 시간 */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                태어난 시간 <span className={styles.required}>*</span>
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={styles.select}
              >
                <option value="모름">
                  시간을 선택하세요 (모르면 &apos;모름&apos; 선택)
                </option>
                <option value="자정(00:00~01:59)">자정(00~02시)</option>
                <option value="새벽(02:00~05:59)">새벽(02~06시)</option>
                <option value="아침(06:00~09:59)">아침(06~10시)</option>
                <option value="낮(10:00~15:59)">낮(10~16시)</option>
                <option value="저녁(16:00~19:59)">저녁(16~20시)</option>
                <option value="밤(20:00~23:59)">밤(20~24시)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? '운세 보는 중...' : '✨ 운세 보기'}
            </button>
          </form>
        </section>

        {/* 결과 + 광고 영역 */}
        {answer && (
          <>
            <section className={styles.resultCard}>
              <h3 className={styles.resultTitle}>운세 결과</h3>
              <p className={styles.resultText}>{answer}</p>

              <button
                onClick={handleLuckyItem}
                disabled={loadingLucky}
                className={styles.luckyButton}
              >
                {loadingLucky
                  ? '행운의 물건 찾는 중...'
                  : '🍀 오늘의 행운의 물건 보기'}
              </button>

              {luckyItem && (
                <div className={styles.luckyBox}>
                  <h4 className={styles.luckyTitle}>오늘의 행운의 물건</h4>
                  <p className={styles.resultText}>{luckyItem}</p>
                </div>
              )}
            </section>

            {/* 광고 영역 - 결과 아래에 한 번만 노출 */}
            <section className={styles.adSection}>
              <AdBanner />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
