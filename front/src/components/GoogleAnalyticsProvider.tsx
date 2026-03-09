"use client";

import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

interface GoogleAnalyticsProviderProps {
    gaId: string;
}

export default function GoogleAnalyticsProvider({
    gaId,
}: GoogleAnalyticsProviderProps) {
    if (!gaId) return null;

    return (
        <>
            {/* Consent 설정 (gtag.js 로드 전에 실행되어야 함) */}
            <Script id="gtag-consent" strategy="beforeInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500
          });
          
          // 저장된 동의 상태 복원
          (function() {
            try {
              var consent = localStorage.getItem('cookie_consent');
              if (consent === 'granted') {
                gtag('consent', 'update', {
                  'analytics_storage': 'granted',
                  'ad_storage': 'granted',
                  'ad_user_data': 'granted',
                  'ad_personalization': 'granted'
                });
              }
            } catch (e) {}
          })();
        `}
            </Script>

            {/* @next/third-parties가 gtag.js 로드 + config 처리 */}
            <GoogleAnalytics gaId={gaId} />
        </>
    );
}