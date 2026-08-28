import Script from 'next/script'

import { seoConfig } from '@/config/seo'

export function SiteAnalytics() {
  const { clarityProjectID, ga4MeasurementID } = seoConfig.analytics

  if (!clarityProjectID && !ga4MeasurementID) return null

  return (
    <>
      {ga4MeasurementID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4MeasurementID)}`}
            strategy="lazyOnload"
          />
          <Script id="ga4" strategy="lazyOnload">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(ga4MeasurementID)});`}
          </Script>
        </>
      ) : null}

      {clarityProjectID ? (
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script",${JSON.stringify(clarityProjectID)});`}
        </Script>
      ) : null}
    </>
  )
}
