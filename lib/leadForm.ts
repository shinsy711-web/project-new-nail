/**
 * 상담 폼 단일 소스.
 *
 * 본문 폼(components/FormSection.tsx)과 하단 고정 바(components/BottomForm.tsx)가
 * 똑같은 입력 항목·선택 목록·기본값·전송 payload 를 쓰도록 여기 한 곳에만 둔다.
 * 목록을 컴포넌트에 다시 적지 말고 반드시 여기서 import 한다.
 *
 * 검증 규칙은 lib/validate.ts(validateForm · parsePhone)가 단일 소스다.
 */

import type { ParsedPhone } from './validate'

/** 사용자가 입력하는 항목(두 폼 공통). 이 7개가 폼이 받는 항목 전부다. */
export type LeadForm = {
  customer_name: string
  customer_birth: string
  mobile1: string
  mobile2: string
  customer_sex: string
  region: string
  has_license: string
}

/** 휴대폰 국번 */
export const MOBILE_PREFIXES = ['010', '011', '016', '017', '019'] as const

/** 희망 지역 (17개 광역시·도) */
export const REGIONS = [
  '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
  '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주',
] as const

/** 성별 — 수집 서버가 받는 값은 남 '1' / 여 '2' */
export const SEX_OPTIONS = [
  { label: '남', value: '1' },
  { label: '여', value: '2' },
] as const

/** 미용사(네일) 자격증 보유 여부 — 보유 'Y' / 없음 'N' */
export const LICENSE_OPTIONS = [
  { label: '보유', value: 'Y' },
  { label: '없음', value: 'N' },
] as const

/** 수집 서버에 함께 보내는 업종 구분 */
export const SUBMIT_CATEGORY = '네일'

/** 두 폼 공통 초기값(= 전송 시 기본 선택값). 쓸 때는 반드시 복사해서 쓴다. */
export const INITIAL_FORM: LeadForm = {
  customer_name: '',
  customer_birth: '',
  mobile1: MOBILE_PREFIXES[0],
  mobile2: '',
  customer_sex: '2',
  region: '',
  has_license: 'N',
}

/** 수집 서버 전송 URL (환경변수는 빌드 시 인라인된다) */
export function submitUrl(): string {
  const url = process.env.NEXT_PUBLIC_DB_SUBMIT_URL!
  const key = process.env.NEXT_PUBLIC_DB_API_KEY!
  return `${url}?api_key=${key}`
}

/**
 * 전송 payload. 두 폼이 같은 함수를 쓰므로 키·값 규칙이 어긋날 수 없다.
 * 번호는 반드시 parsePhone 이 돌려준 ParsedPhone 을 넣는다(자체 파싱 금지).
 */
export function buildPayload(form: LeadForm, phone: ParsedPhone) {
  return {
    customer_name: form.customer_name,
    customer_birth: form.customer_birth,
    mobile1: phone.mobile1,
    mobile2: phone.mobile2,
    mobile3: '',
    customer_sex: form.customer_sex,
    region: form.region,
    has_license: form.has_license,
    category: SUBMIT_CATEGORY,
  }
}
