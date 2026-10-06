import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs, PageHeader, Sections } from '@/components/Article'
import { CLUSTERS, TOTAL_PAGE_COUNT } from '@/data'
import { OG_IMAGE, OPERATOR, SITE_NAME, SITE_URL, THIRD_PARTY_RECIPIENT, ogImages } from '@/lib/site'
import type { Section } from '@/lib/types'

export const metadata: Metadata = {
  title: '사이트 소개 | 네일학원 정보를 어떻게 정리하는가',
  description:
    '네일학원 종합가이드가 어떤 기준으로 정보를 수집하고 정리하는지, 수치의 출처와 한계, 운영 주체와 수익 구조를 밝힙니다.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: `${SITE_NAME} 소개 — 정보를 정리하는 기준과 한계`,
    description:
      '어떤 출처를 쓰는지, 무엇을 단정하지 않는지, 어떻게 운영되는지를 밝힙니다.',
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'website',
    images: ogImages(`${SITE_NAME} 소개`),
  },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE] },
}

const SECTIONS: Section[] = [
  {
    h2: '이 사이트가 다루는 것',
    p: [
      '네일 분야로 진로를 잡으려는 분들이 처음 마주치는 문제는 정보가 없는 것이 아니라, **정보가 흩어져 있고 서로 다른 말을 한다는 것**입니다. 학원마다 과정 이름이 다르고, 수강료 기준이 다르고, 자격증 정보는 오래된 내용이 그대로 돌아다닙니다.',
      '이 사이트는 그 정보를 한 자리에 모아 **주제 하나당 문서 하나**로 정리합니다. 자격증, 수강료, 국비지원, 지역별 학원, 취업, 창업까지 여덟 갈래로 나눴고, 각 문서는 하나의 질문에만 답합니다.',
      '판단을 대신해 드리지는 않습니다. 대신 **판단에 필요한 기준과 숫자**를 드립니다. 어느 학원이 좋다고 말하는 대신, 학원을 비교할 때 무엇을 물어야 하는지를 정리하는 방식입니다.',
    ],
  },
  {
    h2: '정보를 정리하는 기준',
    list: [
      '**제도·시험 정보는 공식 출처를 기준으로 합니다.** 자격증 시험은 한국산업인력공단 큐넷(q-net.or.kr), 국비지원은 고용노동부 HRD-Net(hrd.go.kr)이 기준입니다. 본문에서도 최종 확인은 공식 사이트에서 하시도록 안내합니다.',
      '**금액은 범위로 제시합니다.** 수강료와 창업 비용은 지역·학원·시점에 따라 편차가 커서 단일 숫자로 말할 수 없습니다. 시세 범위와 그 범위가 생기는 이유를 함께 적습니다.',
      '**변동되는 수치는 단정하지 않습니다.** 응시료, 국비 자부담률, 훈련장려금처럼 제도 개편에 따라 바뀌는 항목은 "약", "참고치"로 표기하고 확인처를 함께 안내합니다.',
      '**특정 학원을 추천하지 않습니다.** 순위나 추천 목록 대신, 어떤 조건을 확인해야 하는지를 정리합니다.',
    ],
  },
  {
    h2: '수치의 한계를 밝힙니다',
    p: [
      '이 사이트에 나오는 수강료, 급여, 창업 비용, 매출 수치는 **업계에서 일반적으로 형성되는 범위를 정리한 참고치**입니다. 특정 학원이나 특정 샵의 실제 금액이 아니며, 개별 사례는 이 범위를 벗어날 수 있습니다.',
      '자격증 시험의 응시료·일정·과제 구성은 회차별 공고에 따라 달라집니다. 본문에 적힌 내용은 이해를 돕기 위한 정리이며, **실제 응시 준비는 반드시 큐넷의 해당 회차 공고를 기준으로** 하셔야 합니다.',
      '국비지원 역시 제도 개편이 잦은 영역입니다. 지원 대상, 자부담률, 장려금 기준은 HRD-Net과 고용센터에서 본인 조건으로 확인하시는 것이 가장 정확합니다.',
    ],
  },
  {
    h2: '수익 구조를 밝힙니다',
    p: [
      '이 사이트는 무료로 운영되며, 두 가지 방식으로 비용을 충당합니다.',
      `**첫째는 상담 연결입니다.** 방문자가 상담을 신청하면 동의를 받아 ${THIRD_PARTY_RECIPIENT}에게 정보를 전달하고, 그 과정에서 수익이 발생합니다. 그래서 상담 신청 전에 개인정보 수집·이용 동의와 제3자 제공 동의 절차를 반드시 거칩니다.`,
      `여기서 분명히 밝혀 둘 것이 있습니다. **제공받는 곳은 ${THIRD_PARTY_RECIPIENT}입니다.** 어떤 정보가 전달되는지는 동의 화면에서 확인하실 수 있습니다.`,
      '**둘째는 광고입니다.** 페이지에 광고가 노출될 수 있으며, 광고 게재 여부가 본문 내용에 영향을 주지 않습니다.',
      '이 구조 때문에 특정 학원을 추천하는 형식을 취하지 않습니다. 대신 비교 기준을 제공하고, 최종 판단은 이용자가 직접 하시도록 구성했습니다.',
    ],
  },
  {
    h2: '문서 구조',
    p: [
      `현재 ${TOTAL_PAGE_COUNT}개 문서를 여덟 개 주제로 나눠 운영하고 있습니다. 각 주제 페이지에서 하위 문서 목록을 확인하실 수 있습니다.`,
    ],
  },
]

export default function AboutPage() {
  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '사이트 소개', item: `${SITE_URL}/about` },
    ],
  }

  return (
    <main id="content" style={{ maxWidth: 820, margin: '0 auto', padding: '32px 1.25rem 40px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <Breadcrumbs items={[{ href: '/', label: '홈' }, { label: '사이트 소개' }]} />

      <article aria-labelledby="page-title">
        <PageHeader
          eyebrow="소개"
          h1={`${SITE_NAME} — 정보를 정리하는 기준과 한계`}
          lead="네일 진로를 준비하는 분들이 판단에 쓸 수 있는 기준과 숫자를 정리합니다. 어떤 출처를 쓰는지, 무엇을 단정하지 않는지, 어떻게 운영되는지를 밝힙니다."
        />
        <Sections sections={SECTIONS} idPrefix="about" />
      </article>

      {/* 문서 구조 */}
      <nav aria-label="주제별 문서 목록" style={{ marginBottom: 44 }}>
        <ul className="card-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {CLUSTERS.map((c) => (
            <li key={c.slug}>
            <Link href={`/${c.slug}`} className="link-card">
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  color: 'var(--primary)',
                  display: 'block',
                  marginBottom: 8,
                }}
              >
                {c.pages.length}건
              </span>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>
                {c.name} →
              </span>
            </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 운영 정보 */}
      <section
        aria-labelledby="operator-heading"
        style={{
          background: 'var(--accent-light)',
          border: '1px solid var(--border-color)',
          borderRadius: 20,
          padding: '26px 28px',
          marginBottom: 40,
        }}
      >
        <h2 id="operator-heading" style={{ fontSize: 18, fontWeight: 900, marginBottom: 14 }}>
          운영 정보
        </h2>
        <dl style={{ display: 'grid', gap: 10, fontSize: 14.5, lineHeight: 1.8 }}>
          <div>
            <dt style={{ display: 'inline', fontWeight: 800, color: 'var(--text-primary)' }}>운영 주체 </dt>
            <dd style={{ display: 'inline', color: 'var(--text-secondary)' }}>{OPERATOR.name}</dd>
          </div>
          <div>
            <dt style={{ display: 'inline', fontWeight: 800, color: 'var(--text-primary)' }}>
              개인정보 보호책임자{' '}
            </dt>
            <dd style={{ display: 'inline', color: 'var(--text-secondary)' }}>{OPERATOR.manager}</dd>
          </div>
          <div>
            <dt style={{ display: 'inline', fontWeight: 800, color: 'var(--text-primary)' }}>문의 </dt>
            <dd style={{ display: 'inline', color: 'var(--text-secondary)' }}>{OPERATOR.email}</dd>
          </div>
          <div>
            <dt style={{ display: 'inline', fontWeight: 800, color: 'var(--text-primary)' }}>서비스 성격 </dt>
            <dd style={{ display: 'inline', color: 'var(--text-secondary)' }}>
              네일학원 정보 제공 및 상담 연결 안내
            </dd>
          </div>
        </dl>
        <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.8, marginTop: 16 }}>
          정보 수정 요청이나 오류 제보는{' '}
          <Link href="/contact" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            문의하기
          </Link>
          를 통해 보내 주시면 확인 후 반영합니다.
        </p>
      </section>
    </main>
  )
}
