import Script from 'next/script';

const GoogleAnalytics = () => (
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=YOUR_GA_TRACKING_ID`}
      onLoad={() => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'YOUR_GA_TRACKING_ID');
      }}
    />
  </>
);

export default GoogleAnalytics;
