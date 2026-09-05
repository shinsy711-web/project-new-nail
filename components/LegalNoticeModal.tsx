"use client"

import { useState } from "react"

export default function LegalNoticeModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ color: "inherit", background: "none", border: "none", cursor: "pointer", fontSize: "inherit", padding: 0, fontWeight: "inherit" }}
      >
        필수안내사항
      </button>

      {open && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "1rem", width: "100%", maxWidth: "620px", maxHeight: "85dvh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <h2 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 700 }}>필수안내사항</h2>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem", color: "#6b7280", lineHeight: 1 }}>✕</button>
            </div>

            <div style={{ overflowY: "auto", padding: "1.5rem", fontSize: "0.875rem", lineHeight: 1.9, color: "#374151" }}>
              <p>※ 본 사이트에서 제공하는 네일학원 수강료, 국비지원 금액, 네일리스트 급여·창업 수익 등 모든 정보는 참고용이며, 실제와 다를 수 있습니다.</p><br />
              <p>※ 본 서비스는 네일학원 관련 정보 안내 및 전문 상담사 연결을 대행하는 서비스입니다. 상담 신청 시 입력하신 개인정보는 상담 목적으로만 활용됩니다.</p><br />
              <p>※ 상담 신청 시 동의하신 개인정보는 <b>제휴 상담처(복수)</b>에 제공될 수 있습니다. 네일·뷰티 교육기관 및 상담 대행사 등이며 특정 1개 업체가 아닙니다. 제휴 계약에 따라 제공처는 변동되며, 현재 목록은 문의 이메일로 요청하시면 안내해 드립니다.</p><br />
              <p>※ 이용자는 개인정보 제공에 대한 동의를 거부할 권리가 있으며, 거부 시 상담 서비스 이용이 제한될 수 있습니다.</p><br />
              <p>※ 본 사이트를 통한 학원 상담은 특정 결과를 보장하지 않으며, 최종 수강 결정은 이용자 본인의 판단에 따릅니다.</p><br />
              <p>※ 주식회사 와야미디어는 네일학원 정보 제공 및 상담 연결 서비스를 운영하는 업체입니다.</p>
            </div>

            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #e5e7eb" }}>
              <button
                onClick={() => setOpen(false)}
                style={{ width: "100%", padding: "0.75rem", backgroundColor: "#1c1917", color: "#fff", border: "none", borderRadius: "0.75rem", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
