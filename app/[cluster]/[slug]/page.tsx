import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import FormSection from '@/components/FormSection'
import {
  Breadcrumbs,
  FactList,
  FaqBlock,
  FaqJsonLd,
  PageHeader,
  RelatedLinks,
  Sections,
} from '@/components/Article'
import { ALL_PAGES, getCluster, getPage } from '@/data'
import {
  OG_IMAGE,
  PUBLISHED_DATE,
  SITE_NAME,
  SITE_URL,
  UPDATED_DATE,
  ogImages,
} from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return ALL_PAGES.map(({ cluster, page }) => ({
    cluster: cluster.slug,
    slug: page.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>
}): Promise<Metadata> {
  const { cluster, slug } = await params
  const page = getPage(cluster, slug)
  if (!page) return {}
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${cluster}/${slug}` },
    keywords: [page.keyword, ...(page.related ?? []).map((r) => r.split('/').pop() ?? '')],
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE_URL}/${cluster}/${slug}`,
      siteName: SITE_NAME,
      locale: 'ko_KR',
      type: 'article',
      images: ogImages(page.keyword),
      publishedTime: PUBLISHED_DATE,
      modifiedTime: UPDATED_DATE,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [OG_IMAGE],
    },
  }
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>
}) {
  const { cluster, slug } = await params
  const c = getCluster(cluster)
  const page = getPage(cluster, slug)
  if (!c || !page) notFound()

  const siblings = c.pages.filter((p) => p.slug !== page.slug).slice(0, 6)

  const articleJson = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/${cluster}/${slug}#article`,
    headline: page.h1,
    name: page.h1,
    description: page.description,
    inLanguage: 'ko-KR',
    about: page.keyword,
    keywords: Array.from(new Set([page.keyword, c.keyword])).join(', '),
    articleSection: c.name,
    image: {
      '@type': 'ImageObject',
      url: OG_IMAGE,
      width: 1200,
      height: 630,
    },
    datePublished: PUBLISHED_DATE,
    dateModified: UPDATED_DATE,
    author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/about` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${cluster}/${slug}` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  }

  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: c.name, item: `${SITE_URL}/${c.slug}` },
      { '@type': 'ListItem', position: 3, name: page.keyword, item: `${SITE_URL}/${c.slug}/${page.slug}` },
    ],
  }

  return (
    <main id="content" style={{ maxWidth: 820, margin: '0 auto', padding: '32px 1.25rem 40px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <FaqJsonLd faqs={page.faqs} />

      <Breadcrumbs
        items={[{ href: '/', label: '홈' }, { href: `/${c.slug}`, label: c.name }, { label: page.keyword }]}
      />

      <article aria-labelledby="page-title">
        <PageHeader
          eyebrow={c.name}
          h1={page.h1}
          lead={page.lead}
          meta={
            <>
              최종 업데이트{' '}
              <time dateTime={UPDATED_DATE}>
                {UPDATED_DATE.replace('-', '년 ').replace('-', '월 ')}일
              </time>
              {' · '}
              {SITE_NAME}
            </>
          }
        />

        {page.facts && <FactList facts={page.facts} label={`${page.keyword} 핵심 요약`} />}

        {/* 상담 폼 — 본문보다 위 */}
        <section aria-label={`${page.keyword} 무료 상담 신청`} style={{ marginBottom: 48 }}>
          <FormSection
            heading={`${page.keyword} 무료 상담`}
            sub="조건에 맞는 과정과 국비지원 가능 여부를 확인해 드립니다. 상담료는 없습니다."
          />
        </section>

        <Sections sections={page.sections} idPrefix="sec" />

        <FaqBlock faqs={page.faqs} title={`${page.keyword} 자주 묻는 질문`} />
      </article>

      <RelatedLinks hrefs={page.related} />

      {/* 같은 주제의 다른 문서 */}
      {siblings.length > 0 && (
        <nav aria-labelledby="siblings-heading" style={{ marginBottom: 44 }}>
          <h2 id="siblings-heading" style={{ fontSize: 19, fontWeight: 900, marginBottom: 14 }}>
            {c.name} 다른 문서
          </h2>
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 9, listStyle: 'none', margin: 0, padding: 0 }}>
            {siblings.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${c.slug}/${p.slug}`}
                  style={{
                    display: 'inline-block',
                    background: 'var(--accent-light)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    fontSize: 13.5,
                    fontWeight: 700,
                    padding: '9px 18px',
                    borderRadius: 50,
                  }}
                >
                  {p.keyword}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/${c.slug}`}
                style={{
                  display: 'inline-block',
                  background: 'var(--primary-light)',
                  color: 'var(--primary-dark)',
                  fontSize: 13.5,
                  fontWeight: 800,
                  padding: '9px 18px',
                  borderRadius: 50,
                }}
              >
                {c.name} 전체 보기 →
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {/* 하단 상담 */}
      <aside
        aria-labelledby="cta-heading"
        style={{
          background: 'var(--accent-light)',
          border: '1px solid var(--border-color)',
          borderRadius: 24,
          padding: 'clamp(24px, 4vw, 36px)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 id="cta-heading" style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>
            {page.keyword}, 더 구체적으로 확인하고 싶다면
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14.5, lineHeight: 1.8 }}>
            목표와 지역, 가능한 시간대를 알려주시면 조건에 맞는 과정을 정리해 안내해 드립니다.
          </p>
        </div>
        <FormSection />
      </aside>
    </main>
  )
}
