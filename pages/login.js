// pages/login.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
// import axios from 'axios';
import { supabase } from '../lib/supabaseClient';
import styles from '../styles/Auth.module.css';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      // 🔥 Supabase 로그인
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

      // 로그인 성공 → 사주 페이지로 이동
      router.push('/saju');
    } catch (err) {
      console.error(err);
      setErrorMsg('로그인 중 알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
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
                disabled={loading}
              >
                {loading ? '로그인 중...' : '➜ 로그인'}
              </button>
            </form>

            <p className={styles.switchText}>
              계정이 없으신가요?{' '}
              <Link href="/signup" className={styles.switchLink}>
                회원가입
              </Link>
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
