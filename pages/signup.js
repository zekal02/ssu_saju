// pages/signup.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
// import axios from 'axios';
import { supabase } from '../lib/supabaseClient';
import styles from '../styles/Auth.module.css';

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      // 🔥 Supabase 회원가입
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error(error);
        setErrorMsg(error.message || '회원가입 중 오류가 발생했습니다.');
        return;
      }

      console.log('Supabase 회원가입 성공:', data);
      setSuccessMsg('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');

      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } catch (err) {
      console.error(err);
      setErrorMsg('회원가입 중 알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>오늘운빨뭐고 | 회원가입</title>
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
            <h1 className={styles.cardTitle}>회원가입</h1>
            <p className={styles.cardDesc}>계정을 생성하여 운세를 확인하세요</p>

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

              {successMsg && (
                <p style={{ color: '#16a34a', fontSize: 13, marginTop: 4 }}>
                  {successMsg}
                </p>
              )}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? '회원가입 중...' : '➜ 회원가입'}
              </button>
            </form>

            <p className={styles.switchText}>
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className={styles.switchLink}>
                로그인
              </Link>
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
