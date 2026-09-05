/**
 * 콘텐츠 모델
 *
 * 모든 페이지는 "키워드 1개 = URL 1개 = H1 1개" 원칙으로 만든다.
 * - keyword : 키워드 리서치 시트의 정확한 검색어 (H1/타이틀에 원형 그대로 포함)
 * - h1      : 페이지에 단 하나만 존재하는 H1. keyword를 반드시 포함한다.
 * - title   : <title>. h1보다 길고 연도·수치 등 CTR 요소를 얹는다.
 * - lead    : 검색 결과 스니펫/AI 답변용 "먼저 답부터" 요약 2~3문장.
 */

export type Faq = { q: string; a: string }

export type TableBlock = {
  caption?: string
  head: string[]
  rows: string[][]
  note?: string
}

export type Section = {
  h2: string
  /** 문단. 문장 안의 **굵게** 표기는 렌더러가 <strong>으로 바꾼다. */
  p?: string[]
  list?: string[]
  /** list/table 뒤에 이어지는 문단 */
  after?: string[]
  table?: TableBlock
  /** 강조 박스 (핵심 요약·주의사항) */
  callout?: { label: string; body: string }
}

export type Page = {
  slug: string
  keyword: string
  /** 네이버 월간 총검색량 (2026-09-04 키워드 리서치 기준) */
  volume: number
  h1: string
  title: string
  description: string
  lead: string
  /** 페이지 상단 "핵심 요약" 3~4줄 */
  facts?: { label: string; value: string }[]
  sections: Section[]
  faqs: Faq[]
  /** 같은 클러스터 밖으로 내보내는 내부링크. "/license/nail-license" 형태 */
  related?: string[]
}

export type Cluster = {
  slug: string
  /** 내비게이션·브레드크럼에 쓰는 짧은 이름 */
  name: string
  keyword: string
  volume: number
  h1: string
  title: string
  description: string
  lead: string
  intro: Section[]
  pages: Page[]
}
