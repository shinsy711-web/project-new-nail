import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import FormSection from '@/components/FormSection'
import { Breadcrumbs, FaqJsonLd, PageHeader, Sections } from '@/components/Article'
import { CLUSTERS, getCluster } from '@/data'
import { OG_IMAGE, SITE_NAME, SITE_URL, ogImages } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return CLUSTERS.map((c) => ({ cluster: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>
}): Promise<Metadata> {
  const { cluster } = await params
  const c = getCluster(cluster)
  if (!c) return {}
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/${c.slug}` },
    keywords: [c.keyword, ...c.pages.slice(0, 12).map((p) => p.keyword)],
    openGraph: {
      title: c.title,
      description: c.description,
      url: `${SITE_URL}/${c.slug}`,
      siteName: SITE_NAME,
      locale: 'ko_KR',
      type: 'website',
      images: ogImages(c.keyword),
    },
    twitter: {
      card: 'summary_large_image',
      title: c.title,
      description: c.description,
      images: [OG_IMAGE],
    },
  }
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<{ cluster: string }>
}) {
  const { cluster } = await params
  const c = getCluster(cluster)
  if (!c) notFound()

  // 클러스터의 모든 하위 문서 FAQ 중 대표 6개를 모아 FAQPage 스키마로 노출
  const faqs = c.pages.flatMap((p) => p.faqs).slice(0, 6)

  const itemListJson = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: c.h1,
    itemListElement: c.pages.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.keyword,
      url: `${SITE_URL}/${c.slug}/${p.slug}`,
    })),
  }

  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: c.name, item: `${SITE_URL}/${c.slug}` },
    ],
  }

  return (
    <main id="content" style={{ maxWidth: 900, margin: '0 auto', padding: '32px 1.25rem 40px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <FaqJsonLd faqs={faqs} />

      <Breadcrumbs items={[{ href: '/', label: '홈' }, { label: c.name }]} />

      <article aria-labelledby="page-title">
        <PageHeader eyebrow={c.name} h1={c.h1} lead={c.lead} size="lg" />

        {/* 상담 폼 — 본문보다 위 */}
        <section aria-label={`${c.keyword} 무료 상담 신청`} style={{ marginBottom: 48 }}>
          <FormSection
            heading={`${c.keyword} 무료 상담`}
            sub="목표와 지역을 알려주시면 조건에 맞는 과정과 국비지원 여부를 안내해 드립니다."
          />
        </section>

        <Sections sections={c.intro} idPrefix="intro" />
      </article>

      {/* 하위 문서 목록 */}
      <nav aria-labelledby="docs-heading" style={{ marginBottom: 48 }}>
        <h2 id="docs-heading" style={{ fontSize: 21, fontWeight: 900, marginBottom: 8 }}>
          {c.name} 세부 문서 {c.pages.length}건
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14.5, lineHeight: 1.8, marginBottom: 22 }}>
          궁금한 주제를 눌러 상세 내용을 확인하세요. 각 문서는 하나의 주제만 깊게 다룹니다.
        </p>
        <ul className="card-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {c.pages.map((p) => (
            <li key={p.slug}>
              <Link href={`/${c.slug}/${p.slug}`} className="link-card">
                <span
                  style={{
                    fontSize: 16.5,
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    display: 'block',
                    marginBottom: 9,
                    lineHeight: 1.35,
                  }}
                >
                  {p.keyword}
                </span>
                <span style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {p.lead.slice(0, 84)}…
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 다른 주제 */}
      <nav aria-labelledby="others-heading" style={{ marginBottom: 40 }}>
        <h2 id="others-heading" style={{ fontSize: 19, fontWeight: 900, marginBottom: 14 }}>
          다른 주제도 확인하세요
        </h2>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 9, listStyle: 'none', margin: 0, padding: 0 }}>
          {CLUSTERS.filter((x) => x.slug !== c.slug).map((x) => (
            <li key={x.slug}>
              <Link
                href={`/${x.slug}`}
                style={{
                  display: 'inline-block',
                  background: 'var(--primary-light)',
                  color: 'var(--primary-dark)',
                  fontSize: 13.5,
                  fontWeight: 700,
                  padding: '9px 18px',
                  borderRadius: 50,
                }}
              >
                {x.name} →
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  )
}
