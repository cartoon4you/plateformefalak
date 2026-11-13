import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import CookieConsent from '@/components/CookieConsent';
import { LanguageProvider } from '@/context/LanguageContext';

export const viewport: Viewport = {
  themeColor: '#ff1e27',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://falaktv.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'فلك Falak TV — مشاهدة أحدث الأفلام والمسلسلات مترجمة بجودة 4K/HD',
    template: '%s | فلك Falak TV',
  },
  description: 'منصة فلك TV لمشاهدة وتصفح أحدث الأفلام والمسلسلات العالمية بجودة فائقة 4K وسيرفرات سريعة وترجمة ذكية، مع مقالات وأدلة سينمائية حصرية.',
  keywords: [
    'فلك TV',
    'أفلام 2026',
    'مسلسلات مترجمة',
    'بث مباشر 4K',
    'ترجمة سينمائية ذكية',
    'سينما منزلية',
    'مشاهدة أونلاين',
    'مراجعات نقدية للأفلام',
    'Falak TV',
  ],
  authors: [{ name: 'فريق فلك للوسائط' }],
  creator: 'Falak TV Network',
  publisher: 'Falak TV Network',
  manifest: '/manifest.json',
  other: {
    'google-adsense-account': 'ca-pub-2915749615185077',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'فلك Falak TV',
  },
  icons: {
    icon: '/pwa-192x192.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'فلك Falak TV — مشاهدة أحدث الأفلام والمسلسلات مترجمة بجودة 4K/HD',
    description: 'منصة فلك لمشاهدة وتصفح أحدث الأفلام والمسلسلات العالمية بجودة فائقة وسيرفرات سريعة وترجمة ذكية.',
    url: siteUrl,
    siteName: 'فلك Falak TV',
    locale: 'ar_AR',
    type: 'website',
    images: [
      {
        url: '/hero_cinema.jpg',
        width: 1200,
        height: 630,
        alt: 'منصة فلك Falak TV السينمائية',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'فلك Falak TV — مشاهدة أحدث الأفلام والمسلسلات مترجمة بجودة 4K/HD',
    description: 'منصة فلك لمشاهدة وتصفح أحدث الأفلام والمسلسلات العالمية بجودة فائقة وسيرفرات سريعة وترجمة ذكية.',
    images: ['/hero_cinema.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'فلك Falak TV',
  url: siteUrl,
  description: 'منصة عربية رائدة لمشاهدة الأفلام والمسلسلات وتصفح المحتوى والتحليلات السينمائية بجودة عالية.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'فلك Falak TV',
  applicationCategory: 'EntertainmentApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Early script to apply persisted language and direction without layout flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('falak_lang') || 'ar';
                  var isRtl = saved === 'ar';
                  document.documentElement.lang = saved;
                  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
                } catch(e) {}
              })();
            `,
          }}
        />

        {/* Google AdSense official script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2915749615185077"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* Structured Data (JSON-LD) for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
        />
      </head>
      <body
        className="bg-[#0b0c10] text-white min-h-screen font-sans flex flex-col justify-between overflow-x-hidden antialiased selection:bg-red-600 selection:text-white"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <div className="flex-1 w-full">
            {children}
          </div>
          <CookieConsent />
          <OfflineIndicator />
        </LanguageProvider>
      </body>
    </html>
  );
}
