// components/AdBanner.js
import { useEffect } from 'react';

const AD_CLIENT = process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID;
// AdSense에서 발급받은 data-ad-slot 값으로 교체하세요
const AD_SLOT = '9590683041';

export default function AdBanner() {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // 환경 변수가 없으면 렌더 안 함 (개발 중 에러 방지용)
  if (!AD_CLIENT || !AD_SLOT) {
    return null;
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={AD_SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
