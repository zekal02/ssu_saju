// pages/_app.js
import Head from 'next/head';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* AdSense 전역 스크립트 */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
          crossOrigin="anonymous"
        ></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
