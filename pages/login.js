// pages/login.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import styles from '../styles/Auth.module.css';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // 이메일 로그인 로딩
  const [oauthLoading, setOauthLoading] = useState(false); // 구글 로그인 로딩
  const [errorMsg, setErrorMsg] = useState('');

  // 이메일 / 비밀번호 로그인
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error);
        setErrorMsg(error.message || '로그인 중 오류가 발생했습니다.');
        return;
      }

      console.log('Supabase 로그인 성공:', data);
      router.push('/saju');
    } catch (err) {
      console.error(err);
      setErrorMsg('로그인 중 알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  // 구글 로그인
  async function handleGoogleLogin() {
    setErrorMsg('');

    try {
      setOauthLoading(true);

      const redirectTo =
        typeof window !== 'undefined'
          ? `${window.location.origin}/saju` // 로그인 성공 후 돌아올 페이지
          : undefined;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
      });

      if (error) {
        console.error(error);
        setErrorMsg(error.message || '구글 로그인 중 오류가 발생했습니다.');
        return;
      }

      console.log('구글 로그인 요청 완료:', data);
      // 실제 리다이렉트는 Supabase가 알아서 처리
    } catch (err) {
      console.error(err);
      setErrorMsg('구글 로그인 중 알 수 없는 오류가 발생했습니다.');
    } finally {
      setOauthLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>오늘운빨뭐고 | 로그인</title>
      </Head>

      <div className={styles.page}>
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

        <main className={styles.main}>
          <section className={styles.card}>
            <h1 className={styles.cardTitle}>로그인</h1>
            <p className={styles.cardDesc}>
              계정에 로그인하여 운세를 확인하세요
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>이메일</label>
                <input
                  type="email"
                  className={styles.input}
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>비밀번호</label>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {errorMsg && (
                <p style={{ color: '#ef4444', fontSize: 13, marginTop: 4 }}>
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading || oauthLoading}
              >
                {loading ? '로그인 중...' : '➜ 이메일로 로그인'}
              </button>
            </form>

            {/* 구분선 */}
            <div style={{ margin: '12px 0', fontSize: 12, color: '#9ca3af' }}>
              ─── 또는 ───
            </div>

            {/* 구글 로그인 버튼 */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={oauthLoading || loading}
              className={styles.googleButton}
            >
              {oauthLoading ? '구글 로그인 중...' : 'Google 계정으로 로그인'}
            </button>

            <p className={styles.switchText}>
              계정이 없으신가요?{' '}
              <Link href="/signup" className={styles.switchLink}>
                회원가입
              </Link>
            </p>
          </section>
        </main>
        {/* 푸터 */}
        <footer className={styles.siteFooter}>
          <div className={styles.footerInner}>
            {/* 로고 / 상호 */}
            <div className={styles.footerBrandRow}>
              <div className={styles.footerEmblem}>청월당</div>
              <div className={styles.footerBrandName}>오늘운빨뭐고</div>
            </div>

            {/* 사업자 정보 1줄 */}
            <div className={styles.footerInfoRow}>
              <span>상호 오늘운빨뭐고</span>
              <span className={styles.footerDivider}>|</span>
              <span>대표자 김동국</span>
            </div>

            {/* 주소 / 번호 이런 거 필요 없으면 지워도 됩니다 */}
            <div className={styles.footerInfoRow}>
              <span>주소 서울시 OO구 OO로 123, 4층</span>
            </div>
            <div className={styles.footerInfoRow}>
              <span>통신판매업 신고 2024-서울OO-0000</span>
              <span className={styles.footerDivider}>|</span>
              <span>사업자등록번호 000-00-00000</span>
            </div>
            <div className={styles.footerInfoRow}>
              <span>
                고객상담{' '}
                <a
                  href="https://pf.kakao.com/_카카오채널ID"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.footerLink}
                >
                  카카오톡 오늘운빨뭐고 채널
                </a>
              </span>
              <span className={styles.footerDivider}>|</span>
              <span>
                MAIL{' '}
                <a
                  href="mailto:contact@yourdomain.com"
                  className={styles.footerLink}
                >
                  contact@yourdomain.com
                </a>
              </span>
            </div>

            {/* 약관 / 개인정보 */}
            <div className={styles.footerInfoRow}>
              <button type="button" className={styles.footerTextButton}>
                이용약관
              </button>
              <span className={styles.footerDivider}>|</span>
              <button type="button" className={styles.footerTextButton}>
                개인정보처리방침
              </button>
            </div>

            {/* 카카오톡 등 아이콘 라인 */}
            <div className={styles.footerIconRow}>
              <button type="button" className={styles.footerCircleIcon}>
                톡
              </button>
              <button type="button" className={styles.footerCircleIcon}>
                ⓕ
              </button>
              <button type="button" className={styles.footerCircleIcon}>
                ⓘ
              </button>
            </div>

            {/* 카피라이트 */}
            <div className={styles.footerCopy}>
              Copyright © 2024 TodayUnbbal - All rights reserved
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
