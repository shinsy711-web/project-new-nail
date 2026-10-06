# project31_nail — 네일학원 종합가이드

네일 키워드 리서치 시트(2026-09-04 기준) 기반 DB 수집형 정보 사이트.
키워드 1개 = URL 1개 = H1 1개 원칙으로 설계했습니다.

## 배포 전 반드시 해야 할 것

`.env.local`의 TODO 3건:

| 항목 | 현재 값 | 해야 할 일 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://nailcost.kr` (확정) | Vercel 환경변수에도 동일하게 등록 |
| `NEXT_PUBLIC_DB_API_KEY` | `REPLACE_WITH_PROJECT31_KEY` | project31 전용 키 발급 후 교체 |
| `NEXT_PUBLIC_GA_ID` | 미설정 | GA4 측정 ID 입력 시 스크립트 자동 활성화 |
| `NEXT_PUBLIC_NAVER_VERIFICATION` | 미설정 | 네이버 서치어드바이저 인증값 입력 시 메타태그 자동 삽입 |

> API 키를 교체하지 않으면 상담 폼 전송이 실패합니다.
> DB 엔드포인트는 다른 프로젝트와 동일한 `project-db-bd.vercel.app/api/submit`이며,
> payload의 `category`는 `"네일"`입니다 (project22와 동일).

## 페이지 구조 (총 102개 URL)

```
/                          홈 (H1: 네일학원 수강료·국비지원·자격증 총정리)
/course      15건          학원·과정   — 네일아트 학원(2,270) 등
/license     18건          자격증      — 네일 자격증(1,950), 네일아트 자격증(1,090) 등
/cost         8건          비용·수강료 — 네일 학원 비용(130) 등
/funding      6건          국비지원    — 국비지원 네일학원(310) 등
/region      21건          지역별      — 부산(290)·대구(230)·광주(230) 등
/career       8건          취업·진로   — 네일리스트 되는법(580) 등
/startup      7건          창업        — 네일샵 창업(620) 등
/compare      6건          비교·선택   — 네일 학원 추천(20) 등
/guide                     등록 전 체크리스트
/qna                       FAQ 272건 통합
/about /contact            E-E-A-T (운영 기준·수익 구조 공개, 연락처)
/sitemap.xml /robots.txt /ads.txt
```

전부 SSG(정적 생성)이며 쿼리파라미터 URL은 쓰지 않았습니다.
(개별 글이 크롤 가능한 정적 URL이어야 한다는 project16 승인 사례 반영)

## 데이터 구조

콘텐츠는 전부 `data/*.ts`에 있고 라우트는 얇습니다.

```
lib/types.ts        Cluster / Page / Section / TableBlock / Faq 타입
data/<cluster>.ts   클러스터별 콘텐츠 (license, course, cost, funding, region, career, startup, compare)
data/index.ts       집계·조회 헬퍼 (getCluster / getPage / resolveRelated / TOP_PAGES)
app/[cluster]/page.tsx           허브 (generateStaticParams, dynamicParams=false)
app/[cluster]/[slug]/page.tsx    상세
components/Article.tsx           Sections/DataTable/Callout/FaqBlock/RelatedLinks/FaqJsonLd 렌더러
```

새 키워드를 추가하려면 해당 `data/<cluster>.ts`의 `pages` 배열에 항목 하나를 추가하면
라우트·사이트맵·푸터·FAQ 페이지에 자동 반영됩니다.

`region.ts`만 `RegionSeed` → `buildPage()` 방식입니다. 지역 고유 정보(밀집 상권, 교통,
시세, 시장 특징, 지역 FAQ)는 시드에 개별 작성되어 있고 구조만 공유합니다.

## DB 수집 폼

- **위치: 모든 페이지에서 H1 바로 아래, 첫 `<h2>`보다 위** (요구사항)
- 수집 항목: 성함, 성별, 생년월일, 연락처, 희망 지역, 미용사(네일) 자격증 보유 여부
- 제출 시 `PrivacyModal` → **개인정보 수집·이용 동의 + 개인정보 제3자 제공 동의** 2건 필수 체크
- 이탈 방지 모달("정말 나가시겠습니까?") 포함
- 푸터에 `PrivacyPolicyModal`(개인정보처리방침 11개조) · `LegalNoticeModal`(필수안내사항)

### 하단 고정 상담 바 — `components/BottomForm.tsx`

- `app/layout.tsx`에서 `<Footer />` 뒤에 전역 마운트 → **모든 페이지·모바일·PC 공통 노출**
- 구성: 휴대폰 번호 + 필수 동의 체크박스(수집·이용 / 제3자 제공, 상세는 `PrivacyModal` 재사용) + 전송 버튼
- 전송 경로는 `FormSection`과 완전히 동일(같은 엔드포인트·필드명·환경변수). 번호 외 항목은 빈 값, `category`만 `네일`
- 스타일은 `app/globals.css`의 `.bottom-bar*` 규칙. z-index 60 (Header 50 위 / 모달 999·9999 아래)
- 바 높이만큼 `body { padding-bottom }`을 주고, 마운트 후 실제 높이로 다시 맞춥니다(ResizeObserver)

### 수집 주체 고지 — 주식회사 와야미디어

개인정보를 **수집·이용하는 자(수집 주체)** 는 **주식회사 와야미디어**로 고지합니다.
값은 **`lib/site.ts`의 `DATA_COLLECTOR` 상수 한 곳**에서만 관리합니다
(`OPERATOR.name` 도 같은 법인이라 이 상수를 참조합니다).

| 위치 | 파일 |
|---|---|
| 단일 소스 상수 | `lib/site.ts` (`DATA_COLLECTOR`) |
| 상담 신청 동의 모달 — 수집·이용 동의의 "수집 주체" | `components/PrivacyModal.tsx` |
| 개인정보처리방침 제목 · 총칙 | `components/PrivacyPolicyModal.tsx` |
| 필수안내사항 (수집 주체 고지 + 운영 업체 안내) | `components/LegalNoticeModal.tsx` |
| 푸터 운영 정보 · 사이트 소개 · 문의하기 (`OPERATOR.name`) | `components/Footer.tsx` · `app/about/page.tsx` · `app/contact/page.tsx` |

> **수집 주체 ≠ 제3자 제공받는 자.** 수집 주체는 `DATA_COLLECTOR`(와야미디어),
> 제3자 제공받는 자는 `THIRD_PARTY_RECIPIENT`(올댓뷰티 상담사)로 서로 다른 항목입니다.
> 동의 모달에서 전자는 "개인정보 수집 및 이용 동의", 후자는 "개인정보 제3자 제공 동의" 박스에 나옵니다.

> 이전에는 동의 모달에만 `(주)와야미디어` 약칭이 하드코딩돼 처리방침 표기(`주식회사 와야미디어`)와
> 갈렸습니다. 2026-10-06 상수화하면서 처리방침 표기에 맞췄습니다.

### 광고성 정보 수신 동의 — 이 사이트에는 없음

이 사이트의 동의 항목은 **개인정보 수집·이용 동의 + 제3자 제공 동의 2개(둘 다 필수)** 뿐이고,
광고성 정보 수신(마케팅 수신) 동의 체크박스는 처음부터 만들지 않았습니다.
전송 payload(`lib/leadForm.ts` → `buildPayload`)에도 해당 필드가 없습니다.
새로 넣을 일이 생기면 `PrivacyModal`·`BottomForm` 양쪽과 `buildPayload` 를 함께 고쳐야 합니다.

> 처리방침 제1조 ②-다) "신규 서비스 개발, 이벤트 및 마케팅 정보 전달"은 **처리 목적 설명**이라
> 동의 UI 와 별개 항목이며 그대로 둡니다.

### 제3자 제공 고지 — 올댓뷰티 상담사

제공받는 자는 **올댓뷰티 상담사**로 고지합니다. (2026-09-13 사용자 지시로 변경 — 이전에는 "복수 제휴 상담처" 유형으로 고지했다.)

값은 **`lib/site.ts`의 `THIRD_PARTY_RECIPIENT` 상수 한 곳**에서만 관리합니다.
표기를 바꿀 일이 생기면 이 상수만 수정하면 아래 화면에 모두 반영됩니다.

| 위치 | 파일 |
|---|---|
| 단일 소스 상수 | `lib/site.ts` (`THIRD_PARTY_RECIPIENT`) |
| 상담 신청 동의 모달 (제3자 제공 동의) · 하단 유의사항 | `components/PrivacyModal.tsx` |
| 개인정보처리방침 제6조(제3자 제공) | `components/PrivacyPolicyModal.tsx` |
| 필수안내사항 | `components/LegalNoticeModal.tsx` |
| 사이트 소개 — 수익 구조 | `app/about/page.tsx` |
| 문의하기 안내 · 홈 히어로 하단 | `app/contact/page.tsx` · `app/page.tsx` |

> 처리방침 **제5조는 위탁(수탁자)** 조항이라 제3자 제공과 범주가 달라 그대로 둡니다.

> **project23 원본에서 바로잡은 것:** 처리방침 제5조의 수탁자가 `주식회사 와야미디어`로
> 적혀 있었습니다. 와야미디어는 개인정보처리자(회사) 본인이라 스스로를 수탁자로 둘 수 없어,
> `상담 업무 대행사 및 소속 상담사, 문자·알림톡 발송 대행사`로 수정했습니다.
> 다른 사이트와 문구를 통일하고 싶다면 이 부분만 되돌리면 됩니다.

모달 문구의 나머지는 project23_makeup 원본을 네일 업종에 맞게 수정한 것입니다
(수집 목적·항목을 네일 기준으로 교체).

## SEO 설계

### 메타 (102페이지 전수 확인)
title / description / canonical / og:title / og:description / og:url / og:image /
og:type / og:locale / twitter:card / robots / viewport / `lang="ko"` / charset — 전부 보유.

> **주의:** Next.js 는 페이지에서 `openGraph` 를 정의하면 루트 값을 상속하지 않고 **통째로 덮습니다.**
> 그래서 페이지별 metadata 에서는 반드시 `lib/site.ts` 의 `ogImages()` 헬퍼를 써야 og:image 가 유지됩니다.

### 구조화 데이터 (JSON-LD)

| 타입 | 위치 | 비고 |
|---|---|---|
| `WebSite` | 전 페이지(layout `@graph`) | `publisher` → Organization 참조 |
| `Organization` | 전 페이지 | `logo`(512×512) · `image` · `email` · `contactPoint` |
| `Service` | 전 페이지 | 상담 연결 서비스 |
| `SiteNavigationElement` | 전 페이지 | 8개 클러스터 |
| `Article` | 상세 89개 | headline·image·datePublished·dateModified·author·publisher·mainEntityOfPage·isPartOf·articleSection |
| `BreadcrumbList` | 101개 | 홈 → 클러스터 → 문서 |
| `FAQPage` | 100개 | 문서별 FAQ 3개 |
| `ItemList` | 허브 8개 | 하위 문서 목록 |
| `HowTo` | `/guide` | 등록 전 체크리스트 5단계 |
| `WebPage` | `/` | about 키워드 |

- 본문에도 `<time dateTime="…">최종 업데이트 …</time>` 를 노출해 `dateModified` 와 일치시킴
- 날짜는 `lib/site.ts` 의 `PUBLISHED_DATE` / `UPDATED_DATE` 한 곳에서 관리 —
  **콘텐츠를 크게 고치면 `UPDATED_DATE` 를 반드시 갱신하세요** (구조화데이터와 본문 표기가 함께 바뀝니다)

### 의도적으로 넣지 않은 것

- **`Organization.sameAs`** — 이 사이트 명의의 공식 SNS/블로그가 아직 없습니다.
  빈 배열을 넣으면 오히려 신호를 해치므로, `lib/site.ts` 의 `SOCIAL_PROFILES` 에 URL 을 채우면
  자동으로 `sameAs` 가 출력되도록만 배선해 뒀습니다.
- **`WebSite.potentialAction`(SearchAction)** — 사이트 검색 기능이 없고,
  구글이 sitelinks searchbox 리치결과를 종료해 현재는 효과가 없습니다. 검색 기능을 붙이면 그때 추가하세요.
- **`manifest`** — PWA 용도이며 검색 순위 요소가 아닙니다.

### 기타
- H1: 페이지당 1개, 타겟 키워드 원형 그대로 포함 (102개 전수 검증, 110자 초과 0건)
- title: 102개 전부 고유
- 제목 계층: h1→h2→h3 레벨 건너뜀 0건
- 내부링크: `related` 배열 → `resolveRelated()` 가 실제 존재하는 URL 만 렌더 (깨진 링크 0건, 고아 페이지 0건)
- sitemap: 102 URL 전부 lastmod·changefreq·priority 보유
- 본문 분량: 평균 3,302자 / 최소 1,935자 (헤더·푸터 포함 기준)

### 남은 약점 — 본문 이미지 0개

현재 본문에 `<img>` 가 하나도 없습니다. 이미지 검색 유입과 체류 신호에서 불리합니다.
네일 시술 사진은 저작권 문제가 있으니, **비용 구간·기간·합격 절차를 인라인 SVG 차트/다이어그램으로
직접 그려 넣는 방식**을 권합니다. 원본 자료라 저작권 문제가 없고 본문 데이터와 일치시킬 수 있습니다.

## 시멘틱 마크업 규칙

페이지 골격은 아래 순서를 지킵니다.

```
<main id="content">
  <nav aria-label="현재 위치">              브레드크럼 (ol/li)
  <article aria-labelledby="page-title">
    <header>  eyebrow(p) + h1#page-title + 리드(p)
    <dl aria-label="...핵심 요약">           facts
    <section aria-label="...무료 상담 신청">   <form>   ← DB 폼 (첫 h2보다 위)
    <section aria-labelledby="sec-N">        h2#sec-N + p/ul + figure>table + aside(callout)
    <section aria-labelledby="faq-heading">  h2 + details/summary
  </article>
  <nav aria-labelledby="related-heading">    내부링크 (ul/li)
  <nav aria-labelledby="siblings-heading">   같은 클러스터 문서 (ul/li)
  <aside aria-labelledby="cta-heading">      하단 상담 CTA + <form>
</main>
```

- 모든 `<section>` / `<nav>` / `<aside>` 에 `aria-labelledby` 또는 `aria-label` 부여 (landmark 인식)
- 표는 `figure > figcaption + table`, 열 머리 `th scope="col"`, 행 머리 `th scope="row"`,
  가로 스크롤 컨테이너는 `role="region" tabIndex=0` 으로 키보드 접근 가능
- 폼은 실제 `<form>` + `label htmlFor` 연결 + `type="submit"`,
  성별은 `fieldset` / `legend.sr-only` + 라디오, 자격증 토글은 `role="switch"`
- 한 페이지에 폼이 2개 이상이므로 `useId()` 로 id 충돌 방지
- 본문 텍스트는 `<span>` 래핑 없이 출력 (`rich()` 가 Fragment 사용)
- `<body>` 최상단에 `.skip-link`(본문 바로가기) → `<main id="content">`
- 링크 묶음은 전부 `ul/li` (헤더 메뉴, 푸터 사이트맵, 카드 그리드, 태그 목록)

## 검증 결과 (로컬 `next start` 기준)

- 빌드: 106개 페이지 SSG 성공, TypeScript 에러 0
- 사이트맵 101개 URL 전부 HTTP 200, 미존재 경로 404
- H1 1개/페이지 · title 중복 0 · canonical 누락 0 · JSON-LD 파싱 오류 0
- 폼이 첫 h2보다 위: 100/102 (예외는 `/contact` 의도된 배치, `/about` 은 폼 없음)
- 시멘틱 검사 102페이지 전수: main 1개, 끊긴 `label for` 0, 끊긴 `aria-labelledby` 0, 중복 id 0

## 로컬 실행

```bash
npm install
npm run dev            # 개발
npm run build && npx next start -p 3131   # 프로덕션 확인
```

> 빌드 위생: `next dev`를 켠 채로 `next build`하면 `.next`가 오염됩니다.
> 반드시 dev 프로세스를 종료하고 `.next`를 지운 뒤 빌드하세요.

## 기존 네일 프로젝트와의 관계

| 프로젝트 | 도메인 | 포지션 |
|---|---|---|
| project16_nail | nailstartup.com | 네일샵 창업 (AdSense 승인) |
| project22_nailpro | nailhakwon.com | 네일아트 학원비 비교 |
| **project31_nail** | (미정) | **네일 종합 허브 — 전 클러스터** |

`/startup`, `/cost` 클러스터가 위 두 사이트와 키워드가 겹칩니다.
순위 간섭이 관찰되면 project31의 해당 클러스터를 축소하는 방향으로 조정하세요.
