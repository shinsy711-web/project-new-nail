import type { Metadata } from 'next'
import Script from 'next/script'
import { Geist } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CLUSTERS } from '@/data'
import {
  HOME_DESC,
  HOME_TITLE,
  LOGO_IMAGE,
  NAVER_VERIFICATION,
  OG_IMAGE,
  OPERATOR,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
} from '@/lib/site'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

// TODO: 배포 후 발급받은 GA4 측정 ID를 넣으면 스크립트가 자동으로 활성화됩니다.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const ADSENSE_CLIENT = 'ca-pub-5378247298190063'

export const metadata: Metadata = {
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESC,
  metadataBase: new URL(SITE_URL),
  // RSS는 네이버 수집 경로라 <link rel="alternate">로 발견 가능하게 해둔다.
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/rss.xml' },
  },
  keywords: SITE_KEYWORDS,
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESC,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: '네일학원 수강료·국비지원·자격증 총정리' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESC,
    images: [OG_IMAGE],
  },
  authors: [{ name: SITE_NAME }],
  publisher: SITE_NAME,
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, date: false, address: false, email: false },
  icons: { icon: '/favicon.ico', shortcut: '/favicon.ico', apple: '/apple-icon.png' },
  other: {
    'google-adsense-account': ADSENSE_CLIENT,
    NaverBot: 'all',
    Yeti: 'all',
    googlebot: 'all',
    subject: '네일학원 정보 사이트',
    publisher: SITE_NAME,
    author: SITE_NAME,
    location: 'South Korea',
    distribution: 'global',
    rating: 'general',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: HOME_DESC,
        inLanguage: 'ko-KR',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description:
          '네일학원 수강료, 국비지원, 네일 자격증, 취업·창업 정보를 정리해 제공하고 무료 상담을 연결하는 정보 사이트입니다.',
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: LOGO_IMAGE,
          width: 512,
          height: 512,
          caption: SITE_NAME,
        },
        image: { '@id': `${SITE_URL}/#logo` },
        email: OPERATOR.email,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: OPERATOR.email,
          areaServed: 'KR',
          availableLanguage: ['ko'],
        },
        // sameAs 는 공식 프로필이 실제로 있을 때만 출력한다 (빈 배열은 신호를 해침)
        ...(SOCIAL_PROFILES.length > 0 ? { sameAs: SOCIAL_PROFILES } : {}),
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#service`,
        name: '네일학원 상담 연결 서비스',
        serviceType: '네일학원 수강료 비교 및 무료 상담 안내',
        areaServed: { '@type': 'Country', name: 'KR' },
        provider: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': `${SITE_URL}/#nav`,
        name: CLUSTERS.map((c) => c.name),
        url: CLUSTERS.map((c) => `${SITE_URL}/${c.slug}`),
      },
    ],
  }

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="NaverBot" content="all" />
        <meta name="Yeti" content="all" />
        {NAVER_VERIFICATION && (
          <meta name="naver-site-verification" content={NAVER_VERIFICATION} />
        )}

        <meta httpEquiv="content-language" content="ko-KR" />
        <meta name="geo.region" content="KR" />
        <meta name="geo.country" content="KR" />
        <meta name="geo.placename" content="South Korea" />

        <meta name="classification" content="교육, 미용, 뷰티" />
        <meta name="category" content="네일 교육" />
        <meta name="copyright" content={SITE_NAME} />
        <meta name="revisit-after" content="7 days" />
        <meta name="theme-color" content="#D6336C" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/webp" />

        {GA_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={geist.variable}>
        <a href="#content" className="skip-link">
          본문 바로가기
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
