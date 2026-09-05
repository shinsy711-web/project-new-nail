import type { Metadata } from 'next'
import FormSection from '@/components/FormSection'
import { Breadcrumbs, FaqBlock, FaqJsonLd, PageHeader, Sections } from '@/components/Article'
import { RelatedLinks } from '@/components/Article'
import { OG_IMAGE, PUBLISHED_DATE, SITE_NAME, SITE_URL, UPDATED_DATE, ogImages } from '@/lib/site'
import type { Faq, Section } from '@/lib/types'

export const metadata: Metadata = {
  title: '네일학원 등록 전 체크리스트 | 상담 질문 10가지·계약 전 확인사항',
  description:
    '네일학원 등록 전에 확인해야 할 체크리스트를 상담 질문 10가지, 견적 확인 항목, 계약서 확인사항으로 정리했습니다. 등록 후 후회하지 않기 위한 실전 가이드입니다.',
  alternates: { canonical: '/guide' },
  keywords: ['네일학원 체크리스트', '네일학원 상담 질문', '네일학원 등록 전 확인', '네일학원 계약'],
  openGraph: {
    title: '네일학원 등록 전 체크리스트',
    description:
      '네일학원 등록 전에 확인해야 할 상담 질문 10가지, 견적 비교 항목, 계약서 확인사항을 정리했습니다.',
    url: `${SITE_URL}/guide`,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'article',
    images: ogImages('네일학원 등록 전 체크리스트'),
  },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE] },
}

const SECTIONS: Section[] = [
  {
    h2: '1. 상담 전에 스스로 정해야 할 4가지',
    p: [
      '상담은 준비 없이 가면 학원 페이스로 흘러갑니다. 아래 네 가지를 미리 정해 두면 상담의 주도권을 잃지 않습니다.',
    ],
    list: [
      '**목표** — 자격증, 취업, 창업, 취미 중 하나. 이것만 정해도 불필요한 상위 과정 권유를 걸러낼 수 있습니다.',
      '**가능한 시간대** — 희망이 아니라 3~4개월간 실제로 지킬 수 있는 시간.',
      '**총액 예산** — 수강료가 아니라 재료비·응시료를 포함한 총액 상한.',
      '**목표 시험 회차** — 언제까지 자격증이 필요한지. 여기서 역산하면 등록 시점이 정해집니다.',
    ],
    callout: {
      label: '먼저 할 일',
      body: 'HRD-Net(hrd.go.kr)에서 국민내일배움카드 발급 대상인지 먼저 확인하세요. 카드 발급에 2~3주가 걸리므로, 학원을 정한 뒤에 알아보면 이미 늦습니다.',
    },
  },
  {
    h2: '2. 상담에서 반드시 물어볼 10가지',
    list: [
      '한 반 정원은 몇 명인가요? (8명 이하가 기준)',
      '총 시수는 얼마이고 그중 실기는 몇 시간인가요? (실기 70% 이상)',
      '재료비는 수강료에 포함인가요? 별도면 얼마인가요?',
      '결석하면 보강이 되나요? 무료 보강은 몇 회인가요?',
      '시험에 불합격하면 재수강 조건이 어떻게 되나요?',
      '타이머를 켜고 하는 모의 실기는 몇 번 하나요?',
      '수업 시간 외에 실습실을 쓸 수 있나요? 이용 가능 시간은요?',
      '국비지원 훈련기관인가요? 아니면 내일배움카드 소지자 할인이 있나요?',
      '중도 해지 시 환불은 어떤 기준으로 계산되나요?',
      '수료 후 취업 연계나 사후 지원이 있나요? 최근 사례를 알려주실 수 있나요?',
    ],
    p: [
      '이 열 가지에 즉답하지 못하고 "방문하시면 알려드린다"고만 하는 곳은 거르셔도 됩니다. 정상적으로 운영되는 학원은 이 정보를 숨길 이유가 없습니다.',
    ],
  },
  {
    h2: '3. 견적서에서 확인할 항목',
    table: {
      caption: '학원 3곳 비교표 — 이대로 채워 보세요',
      head: ['확인 항목', 'A 학원', 'B 학원', 'C 학원'],
      rows: [
        ['수강료', '', '', ''],
        ['재료비 (포함/별도·금액)', '', '', ''],
        ['교재비', '', '', ''],
        ['총액', '', '', ''],
        ['총 시수 / 실기 시수', '', '', ''],
        ['한 반 인원', '', '', ''],
        ['모의 실기 횟수', '', '', ''],
        ['무료 보강 횟수', '', '', ''],
        ['불합격 시 재수강', '', '', ''],
        ['자율 실습실 이용', '', '', ''],
        ['통학 시간(편도)', '', '', ''],
      ],
      note: '※ 빈칸이 남는 학원은 그만큼 정보를 주지 않은 것입니다. 그 자체가 판단 근거가 됩니다.',
    },
    p: [
      '비교의 핵심은 **총액 환산**입니다. 수강료 150만원 재료 포함과 수강료 110만원 재료 별도 45만원은 실질적으로 같은 금액입니다. 수강료만 비교하면 착시가 생깁니다.',
      '여기에 실기 시수와 반 인원을 반영해 "내가 실제로 지도받는 시간의 단가"를 계산해 보면 판단이 명확해집니다.',
    ],
  },
  {
    h2: '4. 계약서에서 확인할 5가지',
    list: [
      '**환불 규정** — 경과 기간을 출석일 기준으로 세는지 달력 기준으로 세는지.',
      '**재료비 환급 여부** — 미개봉 상태의 반품 가능 여부.',
      '**할인 적용 시 재계산 방식** — 중도 해지 시 정가 기준으로 되돌리는지.',
      '**보강 조건** — 무료 횟수와 초과 시 비용.',
      '**수업 시수와 개강일** — 구두 안내와 계약서 내용이 일치하는지.',
    ],
    callout: {
      label: '반드시 남기세요',
      body: '상담에서 들은 조건은 문자나 메신저로 한 번 확인하세요. "재료 포함, 보강 3회 무료 맞으시죠?"라는 메시지 한 통이 나중의 분쟁을 막습니다.',
    },
  },
  {
    h2: '5. 등록 전 마지막 점검',
    p: [
      '**상담 당일에 결정하지 마세요.** "오늘 등록하면 할인"은 거의 모든 학원에 있는 조건이고, 하루 뒤에도 대개 유효합니다. 하루를 두고 견적서를 나란히 놓고 비교하면 판단이 훨씬 명확해집니다.',
      '가능하다면 **수업이 진행 중인 시간에 방문**하세요. 빈 강의실을 보는 것과 실제 수업을 보는 것은 얻는 정보가 완전히 다릅니다. 강사가 학생들 사이를 돌며 손을 봐 주는지, 실습대가 충분한지가 눈에 들어옵니다.',
      '무료 체험 수업이 있다면 반드시 참여하세요. 3~4시간이면 강사 스타일과 실습 환경을 직접 확인할 수 있어, 100만원대 결정을 저렴하게 검증할 수 있습니다.',
    ],
  },
]

const FAQS: Faq[] = [
  {
    q: '상담은 몇 곳이나 받는 게 좋나요?',
    a: '2~3곳이 적당합니다. 한 곳만 보면 비교 기준이 생기지 않고, 다섯 곳을 넘으면 정보가 뒤섞여 결정이 어려워집니다.',
  },
  {
    q: '견적서를 주지 않는 학원도 있나요?',
    a: '구두로만 안내하는 곳이 있습니다. 그럴 때는 상담 내용을 문자로 정리해 보내 확인을 받으세요. 답장이 곧 증빙이 됩니다.',
  },
  {
    q: '멀지만 좋은 학원과 가까운 평범한 학원 중 어디가 나을까요?',
    a: '자격증반은 3~4개월간 주 2~3회를 다닙니다. 편도 40분을 넘기면 출석률이 떨어지므로, 통학 가능 범위 안에서 최선을 고르는 편이 결과가 좋습니다.',
  },
  {
    q: '수강료 협상이 가능한가요?',
    a: '정가 인하는 어렵지만 재료 포함이나 보강 추가 같은 조건 조정은 가능한 경우가 많습니다. 다른 곳의 조건을 언급하면 여지가 생깁니다.',
  },
]

export default function GuidePage() {
  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '등록 전 체크리스트', item: `${SITE_URL}/guide` },
    ],
  }

  return (
    <main id="content" style={{ maxWidth: 820, margin: '0 auto', padding: '32px 1.25rem 40px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: '네일학원 등록 전 체크리스트',
            description:
              '상담 전 준비부터 질문 목록, 견적 비교, 계약서 확인까지 네일학원 등록 절차를 5단계로 정리했습니다.',
            inLanguage: 'ko-KR',
            image: OG_IMAGE,
            datePublished: PUBLISHED_DATE,
            dateModified: UPDATED_DATE,
            author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/about` },
            publisher: { '@id': `${SITE_URL}/#organization` },
            step: SECTIONS.map((s, i) => ({
              '@type': 'HowToStep',
              position: i + 1,
              name: s.h2,
              text: (s.p?.[0] ?? s.list?.[0] ?? s.h2).replace(/\*\*/g, ''),
              url: `${SITE_URL}/guide#guide-${i}`,
            })),
          }),
        }}
      />
      <FaqJsonLd faqs={FAQS} />

      <Breadcrumbs items={[{ href: '/', label: '홈' }, { label: '등록 전 체크리스트' }]} />

      <article aria-labelledby="page-title">
      <PageHeader
        eyebrow="실전 가이드"
        h1="네일학원 등록 전 체크리스트 — 상담 질문 10가지와 계약 확인사항"
        lead="학원 선택에서 후회하는 경우는 대부분 정보를 덜 물어봤기 때문입니다. 상담 전 준비부터 질문 목록, 견적 비교, 계약서 확인까지 순서대로 정리했습니다. 그대로 따라가시면 됩니다."
      />

      <section aria-label="네일학원 무료 상담 신청" style={{ marginBottom: 48 }}>
        <FormSection
          heading="상담 전에 조건부터 정리해 드립니다"
          sub="목표와 지역, 가능한 시간대를 알려주시면 확인할 항목을 함께 정리해 드립니다."
        />
      </section>

      <Sections sections={SECTIONS} idPrefix="guide" />

      <FaqBlock faqs={FAQS} />
      </article>

      <RelatedLinks
        hrefs={[
          '/compare/how-to-choose',
          '/compare/comparison',
          '/cost/consult',
          '/cost/refund',
          '/funding/gukbi-academy',
          '/license/license-academy',
        ]}
      />
    </main>
  )
}
