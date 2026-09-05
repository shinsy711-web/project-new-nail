export type FormData = {
  customer_name: string
  customer_birth: string
  mobile1: string
  mobile2: string
  customer_sex: string
  region: string
  privacy: boolean
}

export type ParsedPhone = {
  mobile1: string
  mobile2: string
}

const SPECIAL_CHAR_REG = /[ \{\}\[\]\/.,;:|\)*~`^\-_+┼<>\%\'\"\\\(\=]/i

export function validateForm(data: FormData): string | null {
  if (!data.customer_name) return '이름을 입력해 주세요.'
  if (SPECIAL_CHAR_REG.test(data.customer_name)) return '이름에 특수문자는 입력하실 수 없습니다.'
  if (data.customer_name.length > 8) return '이름을 다시 입력해 주세요.'

  if (!data.customer_birth) return '생년월일을 입력해 주세요.'
  if (!/^\d{6}$/.test(data.customer_birth)) return '생년월일 6자리 숫자만 입력해 주세요.'
  const month = parseInt(data.customer_birth.slice(2, 4))
  const day = parseInt(data.customer_birth.slice(4, 6))
  if (month < 1 || month > 12) return '생년월일을 다시 확인해 주세요.'
  if (day < 1 || day > 31) return '생년월일을 다시 확인해 주세요.'

  if (!data.customer_sex) return '성별을 선택해 주세요.'

  if (!data.mobile2) return '전화번호를 다시 입력해 주세요.'
  if (!/^\d+$/.test(data.mobile2)) return '전화번호는 숫자만 입력해 주세요.'
  if (data.mobile2.length < 8) return '전화번호 8자리를 입력해 주세요.'

  if (!data.privacy) return '개인정보수집 및 활용에 동의해 주세요.'

  return null
}

export function parsePhone(mobile1: string, mobile2: string): ParsedPhone | string {
  const isValidPrefix = /^(010|011|016|017|018|019)/.test(mobile2.slice(0, 3))

  if (mobile2.length === 8) {
    if (isValidPrefix) return '전화번호를 다시 입력해주세요.'
    return { mobile1, mobile2 }
  }

  if (mobile2.length === 11) {
    if (isValidPrefix) {
      return { mobile1: mobile2.slice(0, 3), mobile2: mobile2.slice(3) }
    }
    return '전화번호를 다시 입력해주세요.'
  }

  return '전화번호를 다시 입력해주세요.'
}
