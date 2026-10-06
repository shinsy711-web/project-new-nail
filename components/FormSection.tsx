"use client"

import { useId, useState } from "react"
import PrivacyModal from "./PrivacyModal"
import { validateForm, parsePhone } from "@/lib/validate"
import {
  INITIAL_FORM,
  LICENSE_OPTIONS,
  MOBILE_PREFIXES,
  REGIONS,
  SEX_OPTIONS,
  buildPayload,
  submitUrl,
} from "@/lib/leadForm"

type Props = {
  /** 폼 상단 문구. 페이지별 타겟 키워드를 넣어 문맥을 맞춘다. */
  heading?: string
  sub?: string
  /** 히어로(어두운 배경) 위에 올릴 때 true */
  onDark?: boolean
}

export default function FormSection({ heading, sub, onDark = false }: Props) {
  const uid = useId()
  const id = {
    heading: `${uid}-heading`,
    name: `${uid}-name`,
    sex: `${uid}-sex`,
    birth: `${uid}-birth`,
    mobile1: `${uid}-mobile1`,
    mobile2: `${uid}-mobile2`,
    region: `${uid}-region`,
    license: `${uid}-license`,
  }

  const [form, setForm] = useState({ ...INITIAL_FORM })
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const set = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }))

  const SPECIAL_CHAR_REG = /[ \{\}\[\]\/.,;:|\)*~`^\-_+┼<>\%\'\"\\\(\=]/i
  const handleNameChange = (value: string) => {
    if (SPECIAL_CHAR_REG.test(value)) {
      alert("특수문자는 입력하실수 없습니다.")
      set("customer_name", value.slice(0, -1))
      return
    }
    set("customer_name", value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const error = validateForm({ ...form, privacy: true })
    if (error) { alert(error); return }
    setShowModal(true)
  }

  const handleConfirm = async () => {
    const phoneResult = parsePhone(form.mobile1, form.mobile2)
    if (typeof phoneResult === "string") { alert(phoneResult); return }

    const payload = buildPayload(form, phoneResult)

    setSubmitted(true)
    try {
      const res = await fetch(submitUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        alert(`전송 실패: ${err.error ?? res.status}`)
        setSubmitted(false)
        return
      }
      alert("상담 신청이 완료되었습니다. 담당자가 곧 연락드리겠습니다.")
      setForm({ ...INITIAL_FORM })
    } catch {
      alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.")
    }
    setSubmitted(false)
  }

  const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 800,
    color: 'var(--primary)',
    letterSpacing: '0.04em',
    paddingLeft: '4px',
    textAlign: 'left',
  }

  const getInputWrapperStyle = (fieldName: string): React.CSSProperties => ({
    background: 'var(--bg-card)',
    border: `1.5px solid ${focusedField === fieldName ? 'var(--primary)' : 'var(--border-color)'}`,
    borderRadius: '14px',
    padding: '11px 18px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: focusedField === fieldName ? '0 4px 20px rgba(214, 51, 108, 0.12)' : 'none',
  })

  const inputStyle: React.CSSProperties = {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    fontWeight: 500,
    color: 'var(--text-primary)',
    width: '100%',
    minWidth: 0,
  }

  return (
    <>
      {showModal && (
        <PrivacyModal onConfirm={handleConfirm} onClose={() => setShowModal(false)} />
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby={heading ? id.heading : undefined}
        aria-label={heading ? undefined : '네일학원 무료 상담 신청'}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '26px',
          padding: 'clamp(22px, 4vw, 34px)',
          boxShadow: onDark ? '0 24px 60px rgba(0,0,0,0.30)' : 'var(--shadow-md)',
          textAlign: 'left',
        }}
      >
        {(heading || sub) && (
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            {heading && (
              <p id={id.heading} style={{ fontSize: 18, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 6 }}>
                {heading}
              </p>
            )}
            {sub && (
              <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.6 }}>{sub}</p>
            )}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* 이름 & 성별 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
            <div style={inputGroupStyle}>
              <label htmlFor={id.name} style={labelStyle}>성함</label>
              <div style={getInputWrapperStyle('name')}>
                <input
                  id={id.name}
                  name="customer_name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.customer_name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  maxLength={8}
                  placeholder="성함 입력"
                  style={inputStyle}
                />
                <fieldset
                  style={{
                    display: 'flex', gap: '4px', marginLeft: '10px', paddingLeft: '10px',
                    borderLeft: '1px solid var(--border-color)', borderTop: 'none',
                    borderRight: 'none', borderBottom: 'none', flexShrink: 0, minWidth: 0,
                  }}
                >
                  <legend className="sr-only">성별</legend>
                  {SEX_OPTIONS.map(({ label, value: val }) => (
                    <span key={val} style={{ display: 'inline-flex' }}>
                      <input
                        className="sr-only"
                        type="radio"
                        id={`${id.sex}-${val}`}
                        name={id.sex}
                        value={val}
                        checked={form.customer_sex === val}
                        onChange={() => set('customer_sex', val)}
                      />
                      <label
                        htmlFor={`${id.sex}-${val}`}
                        style={{
                          width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 900, fontSize: '11px', transition: 'all 0.2s',
                          background: form.customer_sex === val ? 'var(--primary)' : 'var(--accent-light)',
                          color: form.customer_sex === val ? 'white' : 'var(--text-muted)',
                        }}
                      >
                        {label}
                      </label>
                    </span>
                  ))}
                </fieldset>
              </div>
            </div>

            <div style={inputGroupStyle}>
              <label htmlFor={id.birth} style={labelStyle}>생년월일</label>
              <div style={getInputWrapperStyle('birth')}>
                <input
                  id={id.birth}
                  name="customer_birth"
                  type="text"
                  inputMode="numeric"
                  autoComplete="bday"
                  required
                  value={form.customer_birth}
                  onChange={(e) => set("customer_birth", e.target.value.replace(/\D/g, ""))}
                  onFocus={() => setFocusedField('birth')}
                  onBlur={() => setFocusedField(null)}
                  maxLength={6}
                  placeholder="예) 950815"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* 연락처 & 희망 지역 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
            <div style={inputGroupStyle}>
              <label htmlFor={id.mobile2} style={labelStyle}>연락처</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ ...getInputWrapperStyle('mobile1'), width: '88px', flexShrink: 0, padding: '11px 10px 11px 14px', position: 'relative' }}>
                  <select
                    id={id.mobile1}
                    name="mobile1"
                    aria-label="휴대폰 국번"
                    value={form.mobile1}
                    onChange={(e) => set("mobile1", e.target.value)}
                    onFocus={() => setFocusedField('mobile1')}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                  >
                    {MOBILE_PREFIXES.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                  <span aria-hidden="true" style={{ position: 'absolute', right: '10px', pointerEvents: 'none', color: 'var(--text-muted)', fontSize: '10px' }}>▼</span>
                </div>
                <div style={{ ...getInputWrapperStyle('mobile2'), flex: 1 }}>
                  <input
                    id={id.mobile2}
                    name="mobile2"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    required
                    value={form.mobile2}
                    onChange={(e) => set("mobile2", e.target.value.replace(/\D/g, ""))}
                    onFocus={() => setFocusedField('mobile2')}
                    onBlur={() => setFocusedField(null)}
                    maxLength={11}
                    placeholder="- 없이 숫자만 입력"
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            <div style={inputGroupStyle}>
              <label htmlFor={id.region} style={labelStyle}>희망 지역</label>
              <div style={{ ...getInputWrapperStyle('region'), position: 'relative' }}>
                <select
                  id={id.region}
                  name="region"
                  required
                  value={form.region}
                  onChange={(e) => set("region", e.target.value)}
                  onFocus={() => setFocusedField('region')}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: form.region ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  <option value="" disabled hidden>지역 선택</option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <span aria-hidden="true" style={{ position: 'absolute', right: '18px', pointerEvents: 'none', color: 'var(--text-muted)', fontSize: '10px' }}>▼</span>
              </div>
            </div>
          </div>

          {/* 자격증 보유 여부 */}
          <div style={inputGroupStyle}>
            <span id={id.license} style={labelStyle}>자격증 보유 여부</span>
            <div style={getInputWrapperStyle('license')}>
              <span style={{ ...inputStyle, color: 'var(--text-secondary)', fontSize: '14.5px' }}>
                미용사(네일) 자격증 보유 여부
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={form.has_license === LICENSE_OPTIONS[0].value}
                aria-labelledby={id.license}
                onClick={() => set("has_license", form.has_license === "Y" ? "N" : "Y")}
                onFocus={() => setFocusedField('license')}
                onBlur={() => setFocusedField(null)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
              >
                <span style={{
                  fontSize: '13px', fontWeight: 700, width: '32px', textAlign: 'right',
                  color: form.has_license === "Y" ? 'var(--primary)' : 'var(--text-muted)',
                  transition: 'color 0.2s',
                }}>
                  {form.has_license === LICENSE_OPTIONS[0].value ? LICENSE_OPTIONS[0].label : LICENSE_OPTIONS[1].label}
                </span>
                <span aria-hidden="true" style={{
                  position: 'relative', display: 'block', width: '44px', height: '24px', borderRadius: '12px',
                  background: form.has_license === "Y" ? 'var(--primary)' : 'var(--border-color)',
                  transition: 'background 0.3s',
                }}>
                  <span style={{
                    position: 'absolute', top: '3px', left: '3px', display: 'block',
                    width: '18px', height: '18px', borderRadius: '50%', background: 'white',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    transform: form.has_license === "Y" ? 'translateX(20px)' : 'translateX(0)',
                    transition: 'transform 0.3s ease',
                  }} />
                </span>
              </button>
            </div>
          </div>

          {/* 제출 */}
          <div style={{ marginTop: '4px' }}>
            <button
              type="submit"
              disabled={submitted}
              style={{
                width: '100%',
                padding: '18px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                fontSize: '16px',
                fontWeight: 900,
                cursor: submitted ? 'not-allowed' : 'pointer',
                opacity: submitted ? 0.6 : 1,
                boxShadow: '0 8px 26px rgba(214, 51, 108, 0.28)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                letterSpacing: '0.02em',
              }}
            >
              {submitted ? '전송 중...' : '네일학원 무료 상담 신청'}
            </button>
            <p style={{ marginTop: '13px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', fontWeight: 500, lineHeight: 1.6 }}>
              상담료 없음 · 입력하신 정보는 암호화되어 전송됩니다.
            </p>
          </div>
        </div>
      </form>
    </>
  )
}
