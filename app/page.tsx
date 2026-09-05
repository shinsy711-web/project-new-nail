import Link from 'next/link'
import FormSection from '@/components/FormSection'
import { CLUSTERS, TOP_PAGES, TOTAL_PAGE_COUNT } from '@/data'
import { DataTable, Eyebrow, FaqBlock, FaqJsonLd, Sections } from '@/components/Article'
import { HOME_H1, SITE_URL } from '@/lib/site'
import type { Faq, Section } from '@/lib/types'

const HOME_FAQS: Faq[] = [
  {
    q: '네일학원 수강료는 보통 얼마인가요?',
    a: '자격증반 기준 수도권 100~160만원, 지방 70~120만원이 시세입니다. 여기에 재료비 20~60만원과 자격증 응시료 약 3만원이 별도로 들어가므로, 총액은 수도권 120~230만원 선으로 보시면 됩니다.',
  },
  {
    q: '네일 자격증은 어떤 것을 따야 하나요?',
    a: '국가기술자격 미용사(네일) 하나입니다. 이 자격이 있어야 미용업 면허를 발급받아 네일샵을 개설할 수 있고, 취업 공고에서도 기본 요건으로 요구됩니다. 민간자격증은 개설 권한이 없는 보조 자격입니다.',
  },
  {
    q: '네일학원도 국비지원을 받을 수 있나요?',
    a: '받을 수 있습니다. 국민내일배움카드를 발급받고 HRD-Net에 등록된 네일 훈련과정을 수강하면 훈련비의 상당 부분을 지원받습니다. 요건에 따라 자부담이 0~45만원까지 내려갑니다.',
  },
  {
    q: '자격증 취득까지 얼마나 걸리나요?',
    a: '학원 주 2~3회 기준 3~4개월이고, 시험 회차 대기까지 포함하면 4~6개월입니다. 직장을 병행하는 야간·주말반은 6~8개월로 잡는 것이 현실적입니다.',
  },
  {
    q: '비전공자나 30~40대도 시작할 수 있나요?',
    a: '가능합니다. 미용사(네일) 자격증은 학력·연령·경력 제한이 없고, 학원 수강생 대부분이 비전공자입니다. 30~40대 전직 후 1인샵을 운영하는 사례도 흔합니다.',
  },
  {
    q: '학원은 어떤 기준으로 고르나요?',
    a: '한 반 인원(8명 이하), 실기 시수 비중(70% 이상), 재료비 포함 여부, 무료 보강 횟수, 통학 시간(편도 40분 이내). 이 다섯 가지를 상담에서 숫자로 확인하고 표로 비교하세요.',
  },
]

const DEEP_SECTIONS: Section[] = [
  {
    h2: '네일학원, 무엇부터 정해야 하나',
    p: [
      '네일학원을 알아보기 시작하면 가장 먼저 마주치는 것이 과정 이름입니다. 자격증반, 취업반, 창업반, 원데이, 아트 심화… 학원마다 부르는 이름이 달라 비교 자체가 어렵습니다.',
      '그래서 순서를 반대로 잡아야 합니다. **학원을 먼저 보지 말고 목적을 먼저 정하세요.** 자격증만 필요한지, 취업까지 갈 것인지, 창업이 목표인지, 취미인지. 이 네 가지 중 하나를 고르면 필요한 과정과 예산 범위가 자동으로 정해집니다.',
      '목적이 정해지면 그다음은 **시간**입니다. 희망하는 시간대가 아니라 실제로 3~4개월간 지킬 수 있는 시간대를 골라야 합니다. 네일 실기는 간격이 벌어지면 손이 굳는 특성이 있어, 주 1회로 길게 가는 것보다 주 3회로 짧게 끝내는 편이 결과가 좋습니다.',
      '마지막이 **예산**입니다. 수강료가 아니라 재료비와 응시료를 포함한 총액으로 정하세요. 그리고 예산을 정하는 이 단계에서 국비지원 대상인지 먼저 확인해야 합니다. 등록한 뒤에 확인하면 이미 늦습니다.',
    ],
  },
  {
    h2: '네일 자격증 — 국가자격 하나만 기억하면 됩니다',
    p: [
      '네일 분야의 국가기술자격은 **미용사(네일)** 하나뿐입니다. 한국산업인력공단이 시행하며, 응시 자격에 학력·연령·경력 제한이 없습니다. 오늘 바로 큐넷에서 필기를 접수할 수 있다는 뜻입니다.',
      '필기는 60문항 4지선다를 60분에 푸는 CBT 시험으로, 100점 만점에 60점이면 합격입니다. 네일미용 이론, 공중위생관리학, 화장품학에서 출제되며 기출문제 반복으로 대응할 수 있어 독학 합격 비율이 높습니다.',
      '문제는 실기입니다. 매니큐어·페디큐어, 젤 매니큐어, 인조네일, 인조네일 제거까지 4개 과제를 약 2시간 30분 안에 마쳐야 합니다. 실기에서 떨어지는 가장 흔한 이유는 실력 부족이 아니라 **미완성**입니다. 그래서 실기 준비의 절반은 기술 연습이고 나머지 절반은 시간 훈련입니다.',
      '자격증을 취득하면 관할 보건소에서 미용업 면허를 신청할 수 있고, 이것이 네일샵 개설의 법적 근거가 됩니다. 흔히 말하는 "네일아트 자격증"은 이 국가자격이거나 협회가 발급하는 민간 등급 자격을 가리키는데, 창업과 취업의 기준이 되는 것은 국가자격입니다.',
    ],
  },
  {
    h2: '국비지원 — 확인 순서만 지키면 부담이 크게 줄어듭니다',
    p: [
      '네일학원은 국민내일배움카드로 훈련비를 지원받을 수 있습니다. 재직자, 실업자, 자영업자 등 대부분이 신청 대상이고, 요건에 따라 자부담이 0~45만원까지 내려갑니다. 여기에 출석 요건을 충족하면 훈련장려금도 지급됩니다.',
      '중요한 것은 **순서**입니다. 학원부터 알아보지 말고 HRD-Net에서 카드 발급 가능 여부를 먼저 확인하세요. 카드 발급에 2~3주가 걸리기 때문에, 이 순서를 지키는 것만으로 전체 일정이 한 달 가까이 단축됩니다.',
      '주의할 점도 있습니다. 국비 과정은 반 인원이 많은 편이라 개인 피드백 시간이 줄어들고, 출석률 미달 시 지원이 중단됩니다. 중도 포기 이력은 향후 카드 사용에도 영향을 줄 수 있으니, 끝까지 다닐 수 있는 시간대인지 먼저 판단해야 합니다.',
      '국비 훈련기관이 아닌 일반 학원 중에도 **내일배움카드 소지자 할인**을 운영하는 곳이 있습니다. 카드로 결제하는 것이 아니라 보유 사실만으로 학원 자체 할인을 적용하는 방식인데, 먼저 안내하지 않는 경우가 많으니 상담에서 직접 물어보세요.',
    ],
  },
  {
    h2: '학원 비교는 다섯 개 숫자로 끝납니다',
    p: [
      '학원 선택이 어려운 이유는 판단 기준이 없어서입니다. "분위기가 좋다", "강사님이 친절하다" 같은 인상은 3~4개월 뒤의 결과를 예측하지 못합니다. 대신 **숫자로 답할 수 있는 다섯 가지**를 물으세요.',
      '한 반 인원은 몇 명인지, 총 시수 중 실기가 얼마인지, 재료비가 포함인지 별도인지, 무료 보강이 몇 회인지, 그리고 집에서 편도 몇 분인지. 이 다섯 가지를 세 학원에서 받아 표로 정리하면 실제 차이가 한눈에 드러납니다.',
      '특히 **총액 환산**이 중요합니다. 수강료 150만원 재료 포함과 수강료 110만원 재료 별도 45만원은 실질적으로 같은 금액입니다. 수강료 숫자만 비교하면 판단을 그르치기 쉽습니다.',
      '반대로 판단 근거로 삼기 어려운 것도 있습니다. 합격률 광고는 산정 기준이 공개되지 않고, 순위 사이트는 대부분 광고 게재 여부로 정렬됩니다. 후보를 모으는 용도로만 쓰고, 검증은 직접 상담해서 하세요.',
    ],
  },
  {
    h2: '자격증 이후 — 취업과 창업의 현실',
    p: [
      '자격증은 출발선입니다. 네일샵 채용에서 실제로 보는 것은 **포트폴리오와 시술 속도**입니다. 원장 입장에서 자격증은 "기본은 했구나" 정도의 신호이고, 지금 무엇을 할 수 있는지는 시술 사진이 보여줍니다.',
      '그래서 자격증 준비 기간에 지인 시술로 사진 20~30컷을 함께 쌓아 두는 것이 좋습니다. 취득 후에 시작하면 취업이 2~3개월 늦어집니다.',
      '취업하면 스텝으로 6개월~1년을 보내게 됩니다. 이 기간 급여는 높지 않지만, 여기서 기술을 배웠는지 잡무만 했는지가 2년 뒤 수입을 크게 가릅니다. 면접에서 "스텝 기간에 어떤 시술을 직접 하게 되나요"를 반드시 물어보세요.',
      '창업은 그다음입니다. 1인샵 기준 개업 자금은 1,200~2,000만원이지만, 실제 실패 원인은 자금 부족이 아니라 **고객 부재**인 경우가 많습니다. 개업 시점에 예약을 채울 수 있는 고정 고객 30명 이상을 확보한 뒤 여는 것이 안전합니다.',
    ],
  },
]

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: `${SITE_URL}/`,
    name: HOME_H1,
    inLanguage: 'ko-KR',
    about: [
      '네일학원',
      '네일 자격증',
      '네일학원 수강료',
      '국비지원 네일학원',
      '내일배움카드 네일',
      '네일리스트 취업',
      '네일샵 창업',
    ],
  }

  return (
    <main id="content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqJsonLd faqs={HOME_FAQS} />

      {/* ───────── 히어로 + DB 폼 (최상단) ───────── */}
      <section
        aria-labelledby="page-title"
        style={{
          background:
            'linear-gradient(160deg, #2A1B23 0%, #3D2230 45%, #5A2C40 100%)',
          padding: 'clamp(44px, 7vw, 76px) 1.25rem clamp(52px, 8vw, 84px)',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <header>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: '#F7C7D8',
              fontSize: 11.5,
              fontWeight: 900,
              padding: '6px 18px',
              borderRadius: 50,
              letterSpacing: '0.14em',
              marginBottom: 22,
            }}
          >
            2026년 최신 기준 · 총 {TOTAL_PAGE_COUNT}개 문서
          </span>

          <h1
            id="page-title"
            style={{
              color: 'white',
              fontSize: 'clamp(27px, 5.2vw, 46px)',
              fontWeight: 950,
              lineHeight: 1.2,
              letterSpacing: '-0.035em',
              marginBottom: 16,
            }}
          >
            {HOME_H1}
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.62)',
              fontSize: 'clamp(14px, 1.9vw, 16.5px)',
              lineHeight: 1.75,
              maxWidth: 560,
              margin: '0 auto 32px',
              fontWeight: 500,
            }}
          >
            네일학원 수강료 시세, 미용사(네일) 자격증 취득 방법, 내일배움카드 국비지원,
            지역별 학원 비교까지. 목표와 예산을 알려주시면 조건에 맞는 과정을 무료로 안내해 드립니다.
          </p>
          </header>

          <section aria-label="네일학원 무료 상담 신청">
          <FormSection
            onDark
            heading="네일학원 무료 상담 신청"
            sub="상담료 없음 · 목표와 지역에 맞는 과정과 국비지원 가능 여부를 안내해 드립니다."
          />
          </section>

          <p
            style={{
              marginTop: 20,
              fontSize: 12.5,
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.7,
            }}
          >
            신청 시 개인정보 수집·이용 및 제3자 제공 동의 절차가 진행됩니다.
            <br />
            제공받는 곳은 특정 한 업체가 아니라 복수의 제휴 상담처입니다.
          </p>

          <p style={{ marginTop: 14, fontSize: 13.5 }}>
            <Link
              href="/guide"
              style={{ color: '#F7C7D8', fontWeight: 700, borderBottom: '1px solid rgba(247,199,216,0.45)', paddingBottom: 2 }}
            >
              상담 전에 볼 것 — 네일학원 등록 전 체크리스트 →
            </Link>
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 1.25rem' }}>
        {/* ───────── 네일학원이란? (사이트 소개) ───────── */}
        <section aria-labelledby="about-heading" style={{ margin: '64px 0 72px' }}>
          <Eyebrow>기초 정보</Eyebrow>
          <h2 id="about-heading" style={{ fontSize: 25, fontWeight: 900, marginBottom: 10 }}>
            네일학원이란?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
            네일을 처음 알아보는 분들을 위해, 네일학원이 어떤 곳이고 이 사이트가 무엇을 정리해 두었는지
            먼저 설명드립니다.
          </p>

          <div className="prose">
            <p>
              <strong>네일학원</strong>은 손톱·발톱 케어부터 젤 네일, 인조네일(연장), 네일 아트까지
              네일 시술 전반의 이론과 실기를 가르치는 교육기관입니다. 가장 핵심적인 목표는
              한국산업인력공단이 시행하는 국가기술자격 <strong>미용사(네일)</strong> 취득입니다.
              이 자격이 있어야 미용업 면허를 발급받아 네일샵을 열 수 있고, 취업 공고에서도
              기본 요건으로 요구됩니다.
            </p>
            <p>
              과정은 목적에 따라 네 갈래로 나뉩니다. 시험 4과제만 집중하는 <strong>자격증반</strong>,
              여기에 아트와 고객 응대를 더한 <strong>실무·취업반</strong>, 상권 분석과 운영까지 다루는{' '}
              <strong>창업반</strong>, 셀프 시술이 목적인 <strong>취미반·원데이 클래스</strong>입니다.
              같은 학원이라도 과정에 따라 기간이 1일에서 8개월까지, 수강료가 3만원에서 400만원까지
              벌어지기 때문에 <strong>목적을 먼저 정하고 과정을 고르는 순서</strong>가 중요합니다.
            </p>
            <p>
              자격증반 기준 수강료는 수도권 100~160만원, 지방 70~120만원 선이고 여기에 재료비
              20~60만원이 별도로 듭니다. 다만 <strong>국민내일배움카드(국비지원)</strong>를 활용하면
              자부담이 0~45만원까지 내려갑니다. 학원을 알아보기 전에 지원 대상인지부터 확인하는 것이
              전체 비용을 가장 크게 줄이는 방법입니다.
            </p>
          </div>

          <div
            style={{
              background: 'var(--accent-light)',
              border: '1px solid var(--border-color)',
              borderRadius: 20,
              padding: 'clamp(22px, 4vw, 30px)',
              marginTop: 8,
            }}
          >
            <h3 style={{ fontSize: 17, fontWeight: 900, marginBottom: 12 }}>
              이 사이트는 무엇을 하나요?
            </h3>
            <div className="prose">
              <p style={{ marginBottom: 14 }}>
                네일 진로를 알아볼 때 겪는 문제는 정보가 없는 게 아니라, <strong>흩어져 있고
                서로 다른 말을 한다</strong>는 것입니다. 학원마다 과정 이름이 다르고, 수강료 기준이
                다르고, 자격증 정보는 오래된 내용이 그대로 돌아다닙니다.
              </p>
              <p style={{ marginBottom: 14 }}>
                그래서 이 사이트는 그 정보를 <strong>주제 하나당 문서 하나</strong>로 정리했습니다.
                자격증·수강료·국비지원·지역별 학원·취업·창업까지 여덟 갈래, 총 {TOTAL_PAGE_COUNT}개
                문서입니다. 시험 일정과 국비 제도는 큐넷·HRD-Net 공식 기준을 따르고, 금액은 지역과
                학원에 따라 편차가 커서 단일 숫자 대신 시세 범위로 적었습니다.
              </p>
              <p style={{ marginBottom: 0 }}>
                <strong>특정 학원을 추천하지는 않습니다.</strong> 대신 학원을 비교할 때 무엇을 물어야
                하는지, 어떤 숫자를 확인해야 하는지를 정리했습니다. 조건에 맞는 과정을 직접 골라
                드리는 무료 상담도 함께 운영합니다.
              </p>
            </div>
            <p style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Link
                href="/guide"
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
                등록 전 체크리스트 →
              </Link>
              <Link
                href="/about"
                style={{
                  display: 'inline-block',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  fontSize: 13.5,
                  fontWeight: 700,
                  padding: '9px 18px',
                  borderRadius: 50,
                }}
              >
                정보를 정리하는 기준 →
              </Link>
            </p>
          </div>
        </section>

        {/* ───────── 주제별 안내 ───────── */}
        <nav aria-labelledby="topics-heading" style={{ margin: '0 0 72px' }}>
          <Eyebrow>무엇을 찾으시나요</Eyebrow>
          <h2 id="topics-heading" style={{ fontSize: 25, fontWeight: 900, marginBottom: 10 }}>주제별로 정리된 네일학원 정보</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
            자격증, 수강료, 국비지원, 지역, 취업, 창업까지 여덟 갈래로 나눠 정리했습니다.
            각 주제 안에 세부 문서가 있으니 필요한 항목부터 확인하세요.
          </p>
          <ul className="card-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {CLUSTERS.map((c) => (
              <li key={c.slug}>
              <Link href={`/${c.slug}`} className="link-card">
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    color: 'var(--primary)',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: 9,
                  }}
                >
                  {c.name} · {c.pages.length}건
                </span>
                <span
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    display: 'block',
                    marginBottom: 8,
                    lineHeight: 1.35,
                  }}
                >
                  {c.keyword}
                </span>
                <span style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {c.lead.slice(0, 78)}…
                </span>
              </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ───────── 핵심 수치 ───────── */}
        <section aria-labelledby="figures-heading" style={{ marginBottom: 72 }}>
          <Eyebrow>한눈에 보기</Eyebrow>
          <h2 id="figures-heading" style={{ fontSize: 25, fontWeight: 900, marginBottom: 10 }}>
            네일학원 수강료와 자격증 취득 비용
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, marginBottom: 26 }}>
            수강료만 비교하면 실제 부담을 알 수 없습니다. 재료비와 응시료를 포함한 총액 기준으로 정리했습니다.
          </p>

          <DataTable
            table={{
              caption: '자격증 취득 총비용 구조 (2026년 기준 참고치)',
              head: ['항목', '수도권', '지방', '국비지원 적용 시'],
              rows: [
                ['수강료', '100~160만원', '70~120만원', '0~45만원'],
                ['재료·도구', '20~60만원', '20~60만원', '20~60만원'],
                ['자격증 응시료', '약 3.2만원', '약 3.2만원', '약 3.2만원'],
                ['교재·기타', '3~10만원', '3~10만원', '3~10만원'],
                ['합계', '약 123~233만원', '약 93~193만원', '약 23~118만원'],
              ],
              note: '※ 응시료는 큐넷 공고 기준으로 확인하시고, 국비 자부담률은 개인 요건에 따라 달라집니다.',
            }}
          />

          <DataTable
            table={{
              caption: '과정별 수강료와 기간',
              head: ['과정', '수도권', '지방', '기간'],
              rows: [
                ['원데이 클래스', '3~8만원', '3~6만원', '1일'],
                ['취미반', '30~50만원', '20~40만원', '4~8주'],
                ['자격증반', '100~160만원', '70~120만원', '3~4개월'],
                ['실무·취업반', '180~250만원', '150~200만원', '5~6개월'],
                ['창업반', '280~400만원', '250~330만원', '5~8개월'],
              ],
            }}
          />
        </section>

        {/* ───────── 검색 많은 문서 ───────── */}
        <nav aria-labelledby="popular-heading" style={{ marginBottom: 72 }}>
          <Eyebrow>많이 찾는 문서</Eyebrow>
          <h2 id="popular-heading" style={{ fontSize: 25, fontWeight: 900, marginBottom: 10 }}>가장 많이 검색되는 주제</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, marginBottom: 26 }}>
            네이버 검색량 기준 상위 주제입니다. 궁금한 항목을 바로 확인하세요.
          </p>
          <ul className="card-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {TOP_PAGES.map(({ cluster, page }) => (
              <li key={`${cluster.slug}/${page.slug}`}>
              <Link href={`/${cluster.slug}/${page.slug}`} className="link-card">
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    color: 'var(--primary)',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  {cluster.name}
                </span>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                  {page.keyword}
                </span>
              </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ───────── 심층 본문 ───────── */}
        <article aria-labelledby="deep-heading" style={{ marginBottom: 64 }}>
          <Eyebrow>심층 가이드</Eyebrow>
          <h2 id="deep-heading" style={{ fontSize: 25, fontWeight: 900, marginBottom: 26 }}>
            네일학원 선택부터 취업·창업까지 — 2026 전체 가이드
          </h2>
          <Sections sections={DEEP_SECTIONS} headingLevel={3} idPrefix="deep" />
        </article>

        <FaqBlock faqs={HOME_FAQS} />

        {/* ───────── 하단 상담 CTA ───────── */}
        <aside aria-labelledby="home-cta-heading" style={{ marginBottom: 40 }}>
          <div
            style={{
              background: 'var(--accent-light)',
              border: '1px solid var(--border-color)',
              borderRadius: 28,
              padding: 'clamp(28px, 5vw, 48px)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <Eyebrow>무료 상담</Eyebrow>
              <h2 id="home-cta-heading" style={{ fontSize: 23, fontWeight: 900, marginBottom: 10 }}>
                조건에 맞는 네일학원 과정을 안내해 드립니다
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8 }}>
                목표(자격증·취업·창업)와 지역, 가능한 시간대를 알려주시면
                <br />
                과정 유형과 국비지원 가능 여부를 함께 확인해 드립니다.
              </p>
            </div>
            <div style={{ maxWidth: 640, margin: '0 auto' }}>
              <FormSection />
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
