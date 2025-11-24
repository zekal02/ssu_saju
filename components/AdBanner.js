// components/AdBanner.js
import { useEffect, useRef } from 'react';

const AD_CLIENT = process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID;
const AD_SLOT = '9590683041'; // 네 광고 슬롯 ID

export default function AdBanner() {
  const adRef = useRef(null);

  useEffect(() => {
    // 환경 변수 없으면 아무것도 안 함
    if (!AD_CLIENT || !AD_SLOT) return;
    if (typeof window === 'undefined') return;
    if (!adRef.current) return;

    // 이미 처리된 광고면 재호출 방지
    if (adRef.current.getAttribute('data-adsbygoogle-status') === 'done') {
      return;
    }

    // 조금 늦게 실행해서 width가 0이 아니게
    const timer = setTimeout(() => {
      if (adRef.current && adRef.current.offsetWidth > 0) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error('adsbygoogle error:', e);
        }
      }
    }, 300); // 0.3초 정도 딜레이

    return () => clearTimeout(timer);
  }, []);

  if (!AD_CLIENT || !AD_SLOT) return null;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '728px',
        margin: '16px auto',
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '100px' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
