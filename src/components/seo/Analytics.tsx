import Script from "next/script";

/**
 * Marketing tags — Google Analytics 4, Google Ads conversion tracking and the
 * Meta (Facebook/Instagram) Pixel.
 *
 * Every tag is opt-in through an env var, so nothing loads (and no cookie is
 * set) until the ids are configured. Add the ones you use to `.env.local`:
 *
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # GA4 measurement id
 *   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX  # Google Ads conversion id
 *   NEXT_PUBLIC_FB_PIXEL_ID=000000000000    # Meta Pixel id
 *
 * All of them load with `afterInteractive`, so they never block first paint or
 * hurt the Core Web Vitals that search ranking depends on.
 */
export default function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const ads = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const pixel = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  if (!ga && !ads && !pixel) return null;

  const gtagId = ga || ads;

  return (
    <>
      {gtagId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${ga ? `gtag('config', '${ga}');` : ""}
${ads ? `gtag('config', '${ads}');` : ""}`}
          </Script>
        </>
      ) : null}

      {pixel ? (
        <>
          <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixel}');
fbq('track', 'PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${pixel}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      ) : null}
    </>
  );
}

/**
 * Fires a conversion event to whichever tags are loaded. Call it from client
 * components at the moments that matter commercially — a completed reservation,
 * a placed order, a newsletter signup.
 *
 *   trackEvent("Purchase", { value: total, currency: "USD" });
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };

  w.gtag?.("event", name, params);
  w.fbq?.("track", name, params);
}
