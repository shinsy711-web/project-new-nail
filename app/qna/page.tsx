import type { Metadata } from 'next'
import Link from 'next/link'
import FormSection from '@/components/FormSection'
import { Breadcrumbs, FaqJsonLd, PageHeader } from '@/components/Article'
import { CLUSTERS } from '@/data'
import { OG_IMAGE, SITE_NAME, SITE_URL, ogImages } from '@/lib/site'

export const metadata: Metadata = {
  title: '네일학원 자주 묻는 질문 | 수강료·자격증·국비지원·취업 Q&A 총정리',
  description:
    '네일학원 수강료, 미용사(네일) 자격증, 국비지원, 취업·창업에 대해 가장 많이 받는 질문과 답변을 주제별로 모았습니다. 궁금한 항목을 찾아 확인하고 무료 상담으로 개별 조건을 확인하세요.',
  alternates: { canonical: '/qna' },
  keywords: ['네일학원 질문', '네일 자격증 질문', '네일 국비지원 질문', '네일학원 FAQ'],
  openGraph: {
    title: '네일학원 자주 묻는 질문 총정리',
    description:
      '네일학원 수강료, 미용사(네일) 자격증, 국비지원, 취업·창업에 대해 가장 많이 받는 질문과 답변을 주제별로 모았습니다.',
    url: `${SITE_URL}/qna`,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'website',
    images: ogImages('네일학원 자주 묻는 질문'),
  },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE] },
}

export default function QnaPage() {
  const groups = CLUSTERS.map((c) => ({
    cluster: c,
    faqs: c.pages.flatMap((p) => p.faqs.map((f) => ({ ...f, from: p.keyword, href: `/${c.slug}/${p.slug}` }))),
  }))

  const total = groups.reduce((n, g) => n + g.faqs.length, 0)

  // 구조화 데이터는 대표 질문 위주로 제한해 과도한 마크업을 피한다
  const schemaFaqs = groups.flatMap((g) => g.faqs.slice(0, 3)).slice(0, 24)

  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '자주 묻는 질문', item: `${SITE_URL}/qna` },
    ],
  }

  return (
    <main id="content" style={{ maxWidth: 880, margin: '0 auto', padding: '32px 1.25rem 40px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <FaqJsonLd faqs={schemaFaqs} />

      <Breadcrumbs items={[{ href: '/', label: '홈' }, { label: '자주 묻는 질문' }]} />

      <PageHeader
        eyebrow="FAQ"
        h1={`네일학원 자주 묻는 질문 ${total}개 총정리`}
        lead="네일학원 수강료부터 미용사(네일) 자격증, 국비지원, 취업과 창업까지 실제로 가장 많이 받는 질문을 주제별로 모았습니다. 각 답변 아래의 링크에서 더 자세한 내용을 확인하실 수 있습니다."
        size="lg"
      />

      <section aria-label="네일학원 무료 상담 신청" style={{ marginBottom: 48 }}>
        <FormSection
          heading="답이 안 보이면 직접 물어보세요"
          sub="목표와 지역을 알려주시면 조건에 맞는 답변을 정리해 안내해 드립니다."
        />
      </section>

      {/* 주제 바로가기 */}
      <nav aria-label="주제 바로가기" style={{ marginBottom: 44 }}>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
        {groups.map((g) => (
          <li key={g.cluster.slug}>
          <a
            href={`#faq-${g.cluster.slug}`}
            style={{
              display: 'inline-block',
              background: 'var(--primary-light)',
              color: 'var(--primary-dark)',
              fontSize: 13.5,
              fontWeight: 700,
              padding: '8px 16px',
              borderRadius: 50,
            }}
          >
            {g.cluster.name} {g.faqs.length}
          </a>
          </li>
        ))}
        </ul>
      </nav>

      {groups.map((g) => (
        <section
          key={g.cluster.slug}
          id={`faq-${g.cluster.slug}`}
          aria-labelledby={`faq-h-${g.cluster.slug}`}
          style={{ marginBottom: 56, scrollMarginTop: 80 }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 16,
            }}
          >
            <h2 id={`faq-h-${g.cluster.slug}`} style={{ fontSize: 21, fontWeight: 900 }}>
              {g.cluster.name}
            </h2>
            <Link
              href={`/${g.cluster.slug}`}
              style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--primary)', whiteSpace: 'nowrap' }}
            >
              전체 보기 →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {g.faqs.map((f, i) => (
              <details
                key={i}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 16,
                  padding: '16px 20px',
                }}
              >
                <summary
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    listStyle: 'none',
                    lineHeight: 1.5,
                  }}
                >
                  Q. {f.q}
                </summary>
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.9,
                    color: 'var(--text-secondary)',
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: '1px solid var(--border-color)',
                  }}
                >
                  {f.a}
                </p>
                <Link
                  href={f.href}
                  style={{
                    display: 'inline-block',
                    marginTop: 10,
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--primary)',
                  }}
                >
                  {f.from} 자세히 보기 →
                </Link>
              </details>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
