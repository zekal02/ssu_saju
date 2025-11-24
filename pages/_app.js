// pages/_app.js
import '@/styles/globals.css';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* AdSense 스크립트는 next/script로 */}

      <Component {...pageProps} />
    </>
  );
}
