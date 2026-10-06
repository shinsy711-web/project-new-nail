'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import PrivacyModal from './PrivacyModal'
import { parsePhone } from '@/lib/validate'

type Status = 'idle' | 'sending' | 'done' | 'error'

/**
 * 화면 하단 고정 상담 바.
 *  - app/layout.tsx 에서 전역 마운트 → 모든 페이지(모바일·PC)에 노출된다.
 *  - 전송 경로는 components/FormSection.tsx 와 동일: 같은 엔드포인트·같은 필드명·같은 환경변수.
 *    번호만 받으므로 이름·생년월일·성별·지역·자격증 항목은 빈 값으로 보낸다.
 *  - 동의 항목은 기존 폼과 같은 2건(개인정보 수집 및 이용 동의 / 개인정보 제3자 제공 동의)이며,
 *    상세 내용은 기존 PrivacyModal 을 그대로 띄워 보여준다(문구를 새로 만들지 않는다).
 */
export default function BottomForm() {
  const [phone, setPhone] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const barRef = useRef<HTMLDivElement | null>(null)

  // 바가 본문 마지막 내용을 가리지 않게, 실제 바 높이만큼 body 하단 여백을 준다.
  // (모바일에서 두 줄로 접히거나 상태 문구가 붙어 높이가 바뀌어도 ResizeObserver 로 따라간다.)
  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const apply = () => {
      document.body.style.paddingBottom = `${bar.offsetHeight}px`
    }
    apply()

    const observer = new ResizeObserver(apply)
    observer.observe(bar)
    window.addEventListener('resize', apply)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', apply)
      document.body.style.paddingBottom = ''
    }
  }, [])

  const send = useCallback(async () => {
    const digits = phone.replace(/\D/g, '')
    if (!/^01\d{8,9}$/.test(digits)) {
      setStatus('error')
      setMessage('휴대폰 번호를 다시 입력해 주세요.')
      return
    }

    // 11자리는 기존 폼과 같은 parsePhone 규칙으로 국번/번호를 쪼갠다.
    const parsed =
      digits.length === 11
        ? parsePhone(digits.slice(0, 3), digits)
        : { mobile1: digits.slice(0, 3), mobile2: digits.slice(3) }
    if (typeof parsed === 'string') {
      setStatus('error')
      setMessage(parsed)
      return
    }

    const payload = {
      customer_name: '',
      customer_birth: '',
      mobile1: parsed.mobile1,
      mobile2: parsed.mobile2,
      mobile3: '',
      customer_sex: '',
      region: '',
      has_license: '',
      category: '네일',
    }

    setStatus('sending')
    setMessage('전송 중...')
    try {
      const url = process.env.NEXT_PUBLIC_DB_SUBMIT_URL!
      const key = process.env.NEXT_PUBLIC_DB_API_KEY!
      const res = await fetch(`${url}?api_key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        setStatus('error')
        setMessage(`전송 실패: ${err.error ?? res.status}`)
        return
      }
      setStatus('done')
      setMessage('상담 신청이 완료되었습니다. 담당자가 곧 연락드리겠습니다.')
      setPhone('')
      setAgreed(false)
    } catch {
      setStatus('error')
      setMessage('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }, [phone])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return

    const digits = phone.replace(/\D/g, '')
    if (!/^01\d{8,9}$/.test(digits)) {
      setStatus('error')
      setMessage('휴대폰 번호를 다시 입력해 주세요.')
      return
    }
    if (!agreed) {
      setStatus('error')
      setMessage('개인정보 수집 및 이용, 제3자 제공에 동의해 주세요.')
      return
    }
    void send()
  }

  return (
    <>
      {showModal && (
        <PrivacyModal
          onConfirm={() => {
            setAgreed(true)
            void send()
          }}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="bottom-bar" ref={barRef}>
        <form className="bottom-bar-inner" onSubmit={handleSubmit} noValidate aria-label="휴대폰 번호로 빠른 상담 신청">
          <div className="bottom-bar-consent">
            <input
              id="bottom-bar-agree"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="bottom-bar-check"
            />
            <label htmlFor="bottom-bar-agree" className="bottom-bar-consent-label">
              <b>[필수]</b> 개인정보 수집 및 이용 동의 · 개인정보 제3자 제공 동의
            </label>
            <button type="button" className="bottom-bar-detail" onClick={() => setShowModal(true)}>
              상세보기
            </button>
          </div>

          <div className="bottom-bar-fields">
            <label htmlFor="bottom-bar-phone" className="sr-only">
              휴대폰 번호
            </label>
            <input
              id="bottom-bar-phone"
              name="mobile2"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, ''))
                if (status !== 'idle') {
                  setStatus('idle')
                  setMessage('')
                }
              }}
              maxLength={11}
              placeholder="휴대폰 번호 ( - 없이 숫자만 )"
              className="bottom-bar-phone"
            />
            <button type="submit" className="bottom-bar-submit" disabled={status === 'sending'}>
              {status === 'sending' ? '전송 중...' : '무료 상담'}
            </button>
          </div>

          <p className="bottom-bar-status" aria-live="polite" data-state={status}>
            {message}
          </p>
        </form>
      </div>
    </>
  )
}
