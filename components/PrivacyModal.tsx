"use client"

import { useState } from "react"

type Props = {
  onConfirm: () => void
  onClose: () => void
}

export default function PrivacyModal({ onConfirm, onClose }: Props) {
  const [priAgree, setPriAgree] = useState(false)
  const [thirdAgree, setThirdAgree] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const allRequired = priAgree && thirdAgree
  const primary = 'var(--primary)'

  const handleAllAgree = () => {
    const next = !allRequired
    setPriAgree(next)
    setThirdAgree(next)
  }

  const handleConfirm = () => {
    if (!priAgree) { alert('개인정보 수집 및 이용에 동의해 주세요.'); return }
    if (!thirdAgree) { alert('개인정보 제3자 제공에 동의해 주세요.'); return }
    onConfirm()
    onClose()
  }

  const handleClose = () => setShowAlert(true)

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 580, maxHeight: '85dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}>

          {/* 헤더 */}
          <div style={{ padding: '32px 32px 20px', position: 'relative' }}>
            <button onClick={handleClose} style={{ position: 'absolute', top: 24, right: 24, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f4f5', border: 'none', borderRadius: '50%', cursor: 'pointer', color: '#71717a', fontSize: 18 }}>✕</button>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#111', marginBottom: 8, lineHeight: 1.3 }}>
              안전한 상담을 위한<br />
              <span style={{ color: primary }}>개인정보 동의</span>
            </h2>
            <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.7, margin: 0 }}>
              고객님의 소중한 정보는 상담 목적 외에는 절대 사용되지 않으며, 안전하게 보호됩니다.
            </p>
          </div>

          {/* 스크롤 영역 */}
          <div style={{ overflowY: 'auto', padding: '0 32px 120px', flex: 1 }}>

            {/* 전체 동의 */}
            <button
              onClick={handleAllAgree}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                padding: '16px 20px', borderRadius: 16, marginBottom: 20,
                border: allRequired ? `2px solid ${primary}` : '2px solid #e4e4e7',
                background: allRequired ? `${primary}0d` : '#fafafa',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <div style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: allRequired ? primary : '#d4d4d8', flexShrink: 0 }}>
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: 17, fontWeight: 700, color: allRequired ? primary : '#3f3f46' }}>약관 전체 동의하기</span>
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ContentBox checked={priAgree} onChange={setPriAgree} label="개인정보 수집 및 이용 동의" primary={primary}>
                수집 주체 : (주)와야미디어<br />
                수집 목적 : 네일학원 수강료·국비지원·자격증 과정 관련 상담 및 문의 응대<br />
                수집 항목 : 성명, 휴대폰 번호, 생년월일, 성별, 희망 지역, 미용사(네일) 자격증 보유 여부<br />
                보유 기간 : 수집일로부터 1년 (또는 요청 시 즉시 파기)<br />
                동의 거부 권리 : 동의를 거부하실 권리가 있으나, 거부 시 상담 신청이 제한될 수 있습니다.
              </ContentBox>

              <ContentBox checked={thirdAgree} onChange={setThirdAgree} label="개인정보 제3자 제공 동의" primary={primary}>
                제공받는 자 : <b>제휴 상담처 (복수)</b><br />
                · 네일·뷰티 교육기관 및 상담 대행사 등이며, <b>특정 1개 업체가 아닙니다.</b><br />
                · 제휴 계약에 따라 수시로 변동되며, 현재 시점의 목록은
                shinsy711@gmail.com 으로 요청하시면 안내해 드립니다.<br />
                제공 목적 : 네일학원 수강료·과정 안내 및 1:1 유선 상담 진행<br />
                제공 항목 : 성명, 휴대폰 번호, 생년월일, 성별, 희망 지역, 미용사(네일) 자격증 보유 여부<br />
                보유 기간 : 상담 목적 달성 시 즉시 파기 (최대 수집일로부터 1년)<br />
                동의 거부 권리 : 동의를 거부하실 권리가 있으나, 거부 시 상담 신청이 제한될 수 있습니다.
              </ContentBox>
            </div>

            <div style={{ marginTop: 20, background: '#fafafa', borderRadius: 12, padding: '16px', fontSize: 12, color: '#a1a1aa', lineHeight: 1.8 }}>
              <p>• 입력하신 정보는 상담 응대를 위한 필수 항목이며, 동의를 거부하실 경우 상담이 제한될 수 있습니다.</p>
              <p>• 수집된 정보는 상담 목적 외 다른 용도로 사용되지 않습니다.</p>
              <p>• 정보 주체는 언제든지 동의를 철회할 수 있으며, 이 경우 수집된 개인정보는 지체 없이 파기됩니다.</p>
              <p>• 제3자 제공은 단일 업체가 아닌 복수의 제휴 상담처를 대상으로 하며, 제공처는 변동될 수 있습니다.</p>
            </div>
          </div>

          {/* 하단 고정 버튼 */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '0 32px 32px', background: 'linear-gradient(to top, white 70%, transparent)', paddingTop: 48, boxSizing: 'border-box' }}>
            <button
              onClick={handleConfirm}
              style={{
                width: '100%', padding: '18px', fontSize: 16, fontWeight: 700,
                borderRadius: 16, border: 'none', cursor: allRequired ? 'pointer' : 'not-allowed',
                background: allRequired ? primary : '#d4d4d8',
                color: allRequired ? 'white' : '#a1a1aa',
                transition: 'all 0.2s',
              }}
            >
              동의하고 상담 신청하기
            </button>
          </div>
        </div>
      </div>

      {/* 이탈 경고 모달 */}
      {showAlert && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 340, padding: '36px', textAlign: 'center', boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ width: 64, height: 64, background: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: primary }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <h5 style={{ fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 8 }}>정말 나가시겠습니까?</h5>
            <p style={{ fontSize: 14, color: '#71717a', lineHeight: 1.7, marginBottom: 28 }}>지금 나가시면 작성하신 내용이<br/>모두 사라집니다.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => { setShowAlert(false); onClose() }} style={{ flex: 1, padding: '14px', background: '#f4f4f5', color: '#3f3f46', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>나가기</button>
              <button onClick={() => { setShowAlert(false); handleConfirm() }} style={{ flex: 1, padding: '14px', background: primary, color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>계속 쓰기</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ContentBox({ checked, onChange, label, primary, children }: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  primary: string
  children: React.ReactNode
}) {
  return (
    <div style={{ background: 'white', border: checked ? `1.5px solid ${primary}40` : '1.5px solid #e4e4e7', borderRadius: 16, overflow: 'hidden' }}>
      <div onClick={() => onChange(!checked)} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', cursor: 'pointer', background: '#fafafa' }}>
        <div style={{ width: 20, height: 20, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, background: checked ? primary : 'white', border: checked ? 'none' : '2px solid #d4d4d8', flexShrink: 0 }}>
          {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#111', flex: 1 }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: primary, background: `${primary}15`, padding: '2px 10px', borderRadius: 50 }}>필수</span>
      </div>
      <div style={{ padding: '12px 16px', borderTop: '1px solid #f4f4f5' }}>
        <div style={{ height: 104, overflowY: 'auto', fontSize: 12, color: '#71717a', lineHeight: 1.8 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
