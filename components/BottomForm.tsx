'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import PrivacyModal from './PrivacyModal'
import { parsePhone, validateForm, type ParsedPhone, cleanMobile2 } from '@/lib/validate'
import {
  INITIAL_FORM,
  LICENSE_OPTIONS,
  MOBILE_PREFIXES,
  REGIONS,
  SEX_OPTIONS,
  buildPayload,
  submitUrl,
  type LeadForm,
} from '@/lib/leadForm'

type Status = 'idle' | 'sending' | 'done' | 'error'

/**
 * 화면 하단 고정 상담 바.
 *  - app/layout.tsx 에서 전역 마운트 → 모든 페이지(모바일·PC)에 노출된다.
 *  - 본문 폼(components/FormSection.tsx)이 받는 항목을 전부, 그 항목만 받는다:
 *    성함 · 생년월일 · 성별 · 미용사(네일) 자격증 보유 여부 · 연락처(국번+번호) · 희망 지역.
 *    선택 목록·기본값·payload 는 lib/leadForm.ts 단일 소스에서 가져오므로 본문 폼과
 *    키·값 규칙이 어긋날 수 없고, 사용자가 입력하지 않은 값을 빈 문자열로 끼워 보내지 않는다.
 *  - 모든 입력칸은 처음부터 펼쳐져 있다(접었다 펴는 방식 없음).
 *  - 검증은 본문 폼과 같은 lib/validate 의 validateForm + parsePhone 만 쓴다.
 *    자체 번호 정규식은 10자리(예: 0101234567) 같은 없는 번호를 통과시키므로 금지.
 *  - 동의 항목·문구는 기존 바텀폼 그대로이며, 상세 내용은 기존 PrivacyModal 을
 *    띄워 보여주고 모달에서 동의하면 그대로 전송된다.
 */
/** 이 거리(px) 이상 스크롤해야 바텀폼이 올라온다 */
const SHOW_AFTER = 300

export default function BottomForm() {
  const uid = useId()
  const id = {
    name: `${uid}-name`,
    birth: `${uid}-birth`,
    sex: `${uid}-sex`,
    sexLabel: `${uid}-sex-label`,
    license: `${uid}-license`,
    licenseLabel: `${uid}-license-label`,
    mobile1: `${uid}-mobile1`,
    mobile2: `${uid}-mobile2`,
    region: `${uid}-region`,
    agree: `${uid}-agree`,
  }

  const [form, setForm] = useState<LeadForm>({ ...INITIAL_FORM })
  const [agreed, setAgreed] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const barRef = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)
  // 모바일에서만 쓰는 접힘 상태 — 처음엔 한 줄짜리 신청 바만 보이고, 누르면 입력칸이 펼쳐진다.
  const [open, setOpen] = useState(false)

  const set = (key: keyof LeadForm, value: string) => {
    setForm((p) => ({ ...p, [key]: value }))
    if (status === 'error' || status === 'done') {
      setStatus('idle')
      setMessage('')
    }
  }

  // 바가 본문 마지막 내용(푸터)을 가리지 않게, 실제 바 높이만큼 body 하단 여백을 준다.
  // 입력칸이 전부 보이는 만큼 바가 높고 모바일/PC·상태 문구에 따라 높이가 바뀌므로
  // ResizeObserver 로 실측해 따라간다. (globals.css 값은 하이드레이션 전 대략값일 뿐)
  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const apply = () => {
      // 소수점 높이(예: 315.4px)가 내림되어 푸터 마지막 1px 이 가려지지 않도록 올림한다.
      // 모바일 카드는 바닥에서 8px 띄우므로 그만큼 여유를 더 준다.
      document.body.style.paddingBottom = `${Math.ceil(bar.getBoundingClientRect().height) + 16}px`
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

  // 처음엔 화면 아래에 숨겨 두고, SHOW_AFTER(px) 이상 스크롤하면 올라온다. 맨 위로 돌아가면 다시 내려간다.
  // 단, 한 번이라도 바 안에 입력을 시작했으면 계속 띄워 둔다(입력·동의 모달·전송 결과 확인 중 사라지지 않게).
  // 스크롤할 거리가 SHOW_AFTER 보다 짧은 페이지는 처음부터 보여준다.
  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    let pinned = false
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setShown(pinned || scrollable < SHOW_AFTER || window.scrollY > SHOW_AFTER)
    }
    const pin = () => {
      pinned = true
      update()
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    bar.addEventListener('focusin', pin)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      bar.removeEventListener('focusin', pin)
    }
  }, [])

  /**
   * 본문 폼과 똑같은 규칙으로 검증한다.
   *  1) validateForm : 성함(특수문자·길이) · 생년월일 6자리 · 성별 · 번호 숫자/길이
   *  2) 희망 지역    : 기본 선택값이 없는 항목이라 빈 값으로 보내지 않게 선택을 요구
   *  3) parsePhone   : 번호 최종 판정(국번 제외 8자리 또는 국번 포함 11자리만 통과)
   * 통과하면 전송에 쓸 ParsedPhone 을, 실패하면 안내 문구를 돌려준다.
   */
  const validate = useCallback((): ParsedPhone | string => {
    const error = validateForm({ ...form, privacy: true })
    if (error) return error
    if (!form.region) return '희망 지역을 선택해 주세요.'
    return parsePhone(form.mobile1, form.mobile2)
  }, [form])

  const send = useCallback(async () => {
    const phone = validate()
    if (typeof phone === 'string') {
      setStatus('error')
      setMessage(phone)
      return
    }

    const payload = buildPayload(form, phone)

    setStatus('sending')
    setMessage('전송 중...')
    try {
      const res = await fetch(submitUrl(), {
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
      setForm({ ...INITIAL_FORM })
      setAgreed(false)
    } catch {
      setStatus('error')
      setMessage('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }, [form, validate])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return

    const phone = validate()
    if (typeof phone === 'string') {
      setStatus('error')
      setMessage(phone)
      return
    }
    if (!agreed) {
      // 동의 체크 줄을 숨겼으므로 미동의 상태면 본문 폼과 같이 동의 모달을 바로 띄운다. 확인하면 onConfirm 이 이어서 전송한다.
      setStatus('error')
      setMessage('개인정보 수집 및 이용, 제3자 제공에 동의해 주세요.')
      setShowModal(true)
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

      <div className={`bottom-bar${shown ? ' is-shown' : ''}${open ? ' is-open' : ''}`} ref={barRef}>
    {/* 모바일 전용 접기/펼치기 바 (PC 에서는 CSS 로 숨기고 입력칸을 항상 보인다) */}
    <button type="button" className="bf-toggle" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
      <span className="bf-toggle__eyebrow">무료</span>
      <span className="bf-toggle__text">1:1 상담 신청하기</span>
      <span className="bf-toggle__icon" aria-hidden="true">{open ? '▼' : '▲'}</span>
    </button>
        <form
          className="bottom-bar-inner"
          onSubmit={handleSubmit}
          noValidate
          aria-label="네일학원 무료 상담 신청"
        >
          {/* 동의 체크 줄은 숨겼다. 상담 신청을 누르면 동의 모달(두 항목 모두 동의해야 확인됨)이 뜬다. */}
          <div className="bottom-bar-grid">
            {/* 성함 */}
            <div className="bottom-bar-cell">
              <label htmlFor={id.name} className="sr-only">
                성함
              </label>
              <input
                id={id.name}
                name="customer_name"
                type="text"
                autoComplete="name"
                maxLength={8}
                value={form.customer_name}
                onChange={(e) => set('customer_name', e.target.value)}
                placeholder="예) 홍길동"
                className="bottom-bar-input"
              />
            </div>

            {/* 생년월일 */}
            <div className="bottom-bar-cell">
              <label htmlFor={id.birth} className="sr-only">
                생년월일
              </label>
              <input
                id={id.birth}
                name="customer_birth"
                type="text"
                inputMode="numeric"
                autoComplete="bday"
                maxLength={6}
                value={form.customer_birth}
                onChange={(e) => set('customer_birth', e.target.value.replace(/\D/g, ''))}
                placeholder="예) 950815"
                className="bottom-bar-input"
              />
            </div>

            {/* 성별 */}
            <div className="bottom-bar-cell bottom-bar-seg-cell" role="group" aria-labelledby={id.sexLabel}>
              <span className="bottom-bar-seg-tag" id={id.sexLabel}>
                성별
              </span>
              <div className="bottom-bar-seg">
                {SEX_OPTIONS.map(({ label, value }) => (
                  <span key={value} className="bottom-bar-seg-item">
                    <input
                      className="sr-only"
                      type="radio"
                      id={`${id.sex}-${value}`}
                      name="bottom_bar_customer_sex"
                      value={value}
                      checked={form.customer_sex === value}
                      onChange={() => set('customer_sex', value)}
                    />
                    <label htmlFor={`${id.sex}-${value}`}>{label}</label>
                  </span>
                ))}
              </div>
            </div>

            {/* 미용사(네일) 자격증 보유 여부 */}
            <div className="bottom-bar-cell bottom-bar-seg-cell" role="group" aria-labelledby={id.licenseLabel}>
              <span className="bottom-bar-seg-tag" id={id.licenseLabel}>
                자격증
              </span>
              <div className="bottom-bar-seg">
                {LICENSE_OPTIONS.map(({ label, value }) => (
                  <span key={value} className="bottom-bar-seg-item">
                    <input
                      className="sr-only"
                      type="radio"
                      id={`${id.license}-${value}`}
                      name="bottom_bar_has_license"
                      value={value}
                      checked={form.has_license === value}
                      onChange={() => set('has_license', value)}
                    />
                    <label htmlFor={`${id.license}-${value}`}>{label}</label>
                  </span>
                ))}
              </div>
            </div>

            {/* 연락처 (국번 + 번호) */}
            <div className="bottom-bar-cell bottom-bar-cell-phone">
              <label htmlFor={id.mobile2} className="sr-only">
                연락처
              </label>
              <div className="bottom-bar-phone-row">
                <select
                  id={id.mobile1}
                  name="mobile1"
                  aria-label="휴대폰 국번"
                  value={form.mobile1}
                  onChange={(e) => set('mobile1', e.target.value)}
                  className="bottom-bar-input bottom-bar-select bottom-bar-prefix"
                >
                  {MOBILE_PREFIXES.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <input
                  id={id.mobile2}
                  name="mobile2"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={form.mobile2}
                  onChange={(e) => set('mobile2', cleanMobile2(e.target.value))}
                  placeholder="- 없이 숫자만 입력"
                  className="bottom-bar-input"
                />
              </div>
            </div>

            {/* 희망 지역 */}
            <div className="bottom-bar-cell">
              <label htmlFor={id.region} className="sr-only">
                희망 지역
              </label>
              <select
                id={id.region}
                name="region"
                value={form.region}
                onChange={(e) => set('region', e.target.value)}
                className="bottom-bar-input bottom-bar-select"
                data-empty={form.region ? undefined : 'true'}
              >
                <option value="" disabled hidden>
                  지역 선택
                </option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* 제출 */}
            <div className="bottom-bar-cell bottom-bar-cell-submit">
              <button type="submit" className="bottom-bar-submit" disabled={status === 'sending'}>
                {status === 'sending' ? '전송 중...' : '무료 상담 신청'}
              </button>
            </div>
          </div>

          <p className="bottom-bar-status" aria-live="polite" data-state={status}>
            {message}
          </p>
        </form>
      </div>
    </>
  )
}
