export const SITE_NAME = '네일학원 종합가이드'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nailcost.kr'
export const OG_IMAGE = `${SITE_URL}/thumb.webp`
export const LOGO_IMAGE = `${SITE_URL}/logo.png`

/** 사이트 최초 공개일 / 콘텐츠 최종 갱신일 (Article 구조화데이터·본문 표기에 함께 사용) */
export const PUBLISHED_DATE = '2026-09-05'
export const UPDATED_DATE = '2026-09-05'

/**
 * Organization.sameAs 에 들어갈 공식 프로필 URL.
 * TODO: 인스타그램·블로그·유튜브 등 이 사이트 명의의 계정을 만들면 여기에 넣으세요.
 *       비어 있으면 sameAs 자체를 출력하지 않습니다 (빈 배열은 오히려 신호를 해칩니다).
 * 예) ['https://www.instagram.com/xxx', 'https://blog.naver.com/xxx']
 */
export const SOCIAL_PROFILES: string[] = []

export const HOME_TITLE =
  '네일학원 총정리 2026 | 수강료·국비지원·네일 자격증·취업 한 번에 비교'
export const HOME_H1 = '네일학원 수강료·국비지원·자격증 총정리'
export const HOME_DESC =
  '네일학원 수강료 시세, 국비지원(내일배움카드) 활용법, 네일 자격증 취득 방법, 지역별 학원 비교까지 2026년 기준으로 정리했습니다. 자격증부터 취업·창업까지 필요한 정보를 확인하고 무료 상담으로 조건에 맞는 과정을 비교하세요.'

export const OPERATOR = {
  name: '주식회사 와야미디어',
  manager: '신승윤',
  email: 'shinsy711@gmail.com',
}

/** 페이지 metadata 의 openGraph.images 에 그대로 넣는 값. 페이지별로 openGraph를 정의하면
 *  루트 값이 상속되지 않고 통째로 덮이므로, 각 페이지에서 이 헬퍼를 써야 og:image가 유지된다. */
export function ogImages(alt = '네일학원 수강료·국비지원·자격증 총정리') {
  return [{ url: OG_IMAGE, width: 1200, height: 630, alt }]
}

/** 사이트 전역 키워드 — 리서치 시트 상위 키워드 기준 */
export const SITE_KEYWORDS = [
  '네일학원',
  '네일아트 학원',
  '네일 자격증',
  '네일아트 자격증',
  '네일 국가자격증',
  '네일 학원 비용',
  '네일학원 수강료',
  '국비지원 네일학원',
  '네일 국비지원',
  '내일배움카드 네일',
  '네일 실기',
  '네일 필기',
  '네일 배우기',
  '네일리스트',
  '네일리스트 되는법',
  '네일샵 창업',
  '네일샵 창업비용',
  '부산 네일학원',
  '대구 네일학원',
  '광주 네일학원',
  '수원 네일학원',
  '대전 네일학원',
  '강남 네일학원',
]
