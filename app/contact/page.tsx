import type { Metadata } from 'next'
import Link from 'next/link'
import FormSection from '@/components/FormSection'
import { Breadcrumbs, PageHeader } from '@/components/Article'
import { OG_IMAGE, OPERATOR, SITE_NAME, SITE_URL, THIRD_PARTY_RECIPIENT, ogImages } from '@/lib/site'

export const metadata: Metadata = {
  title: '문의하기 | 상담 신청·정보 수정 요청·제휴 문의',
  description:
    '네일학원 상담 신청, 사이트 정보 수정 요청, 제휴 문의 방법을 안내합니다. 상담은 무료이며 개인정보 동의 절차를 거쳐 진행됩니다.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: '문의하기 — 상담 신청과 정보 수정 요청',
    description: '네일학원 상담 신청, 사이트 정보 수정 요청, 제휴 문의 방법을 안내합니다.',
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'website',
    images: ogImages('문의하기'),
  },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE] },
}

export default function ContactPage() {
  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '문의하기', item: `${SITE_URL}/contact` },
    ],
  }

  return (
    <main id="content" style={{ maxWidth: 820, margin: '0 auto', padding: '32px 1.25rem 40px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <Breadcrumbs items={[{ href: '/', label: '홈' }, { label: '문의하기' }]} />

      <PageHeader
        eyebrow="문의"
        h1="문의하기 — 상담 신청과 정보 수정 요청"
        lead="네일학원 상담은 아래 신청서로, 사이트 내용에 대한 문의나 오류 제보는 이메일로 보내 주세요. 상담은 무료이며 상담료를 요구하지 않습니다."
      />

      <section aria-labelledby="contact-form-heading" style={{ marginBottom: 48 }}>
        <h2 id="contact-form-heading" style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>
          1. 네일학원 상담 신청
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.85, marginBottom: 22 }}>
          목표(자격증·취업·창업·취미), 희망 지역, 가능한 시간대를 기준으로 조건에 맞는 과정과
          국비지원 가능 여부를 정리해 안내해 드립니다. 신청 시 개인정보 수집·이용 동의와
          제3자 제공 동의 절차가 진행되며, 동의 화면에서 어떤 항목이 어디에 전달되는지
          확인하실 수 있습니다. 제공받는 곳은 {THIRD_PARTY_RECIPIENT}입니다.
        </p>
        <FormSection
          heading="무료 상담 신청"
          sub="입력하신 정보는 상담 목적 외에는 사용되지 않습니다."
        />
      </section>

      <section aria-labelledby="contact-email-heading" style={{ marginBottom: 44 }}>
        <h2 id="contact-email-heading" style={{ fontSize: 20, fontWeight: 900, marginBottom: 14 }}>
          2. 이메일 문의
        </h2>
        <div
          style={{
            background: 'var(--accent-light)',
            border: '1px solid var(--border-color)',
            borderRadius: 20,
            padding: '26px 28px',
          }}
        >
          <p
            style={{
              fontSize: 17,
              fontWeight: 900,
              color: 'var(--primary-dark)',
              marginBottom: 16,
              wordBreak: 'break-all',
            }}
          >
            {OPERATOR.email}
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              '사이트 내용의 오류 제보 및 수정 요청',
              '학원·기관의 정보 등록 및 정정 요청',
              '개인정보 열람·정정·삭제 및 동의 철회 요청',
              '제휴 및 광고 문의',
            ].map((t) => (
              <li
                key={t}
                style={{
                  fontSize: 14.5,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  paddingLeft: 16,
                  position: 'relative',
                }}
              >
                <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>·</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="contact-privacy-heading" style={{ marginBottom: 44 }}>
        <h2 id="contact-privacy-heading" style={{ fontSize: 20, fontWeight: 900, marginBottom: 14 }}>
          3. 개인정보 관련 요청
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.85, marginBottom: 14 }}>
          상담을 신청하신 뒤 개인정보의 열람, 정정, 삭제, 처리 정지를 원하시면 위 이메일로
          요청해 주세요. 확인 후 지체 없이 처리하며, 동의 철회 시 수집된 정보는 파기됩니다.
          자세한 처리 기준은 푸터의 개인정보처리방침에서 확인하실 수 있습니다.
        </p>
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 16,
            padding: '20px 24px',
            fontSize: 14,
            lineHeight: 1.9,
            color: 'var(--text-secondary)',
          }}
        >
          운영 주체 : {OPERATOR.name}
          <br />
          개인정보 보호책임자 : {OPERATOR.manager}
          <br />
          서비스명 : {SITE_NAME} (네일학원 정보 제공 및 상담 연결)
        </div>
      </section>

      <section aria-labelledby="contact-scope-heading">
        <h2 id="contact-scope-heading" style={{ fontSize: 20, fontWeight: 900, marginBottom: 14 }}>
          안내드리는 범위
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.85 }}>
          본 사이트는 정보 제공과 상담 연결을 목적으로 운영됩니다. 자격증 시험 접수·일정 문의는
          한국산업인력공단 큐넷(q-net.or.kr), 국비지원 제도 문의는 고용노동부 HRD-Net(hrd.go.kr)과
          거주지 관할 고용센터로 문의하셔야 정확한 안내를 받으실 수 있습니다.{' '}
          <Link href="/about" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            사이트 소개에서 운영 기준 보기 →
          </Link>
        </p>
      </section>
    </main>
  )
}
