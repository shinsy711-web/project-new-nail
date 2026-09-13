"use client"

import { useState } from "react"

export default function PrivacyPolicyModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ color: "inherit", textDecoration: "none", fontWeight: "inherit", background: "none", border: "none", cursor: "pointer", fontSize: "inherit", padding: 0 }}
      >
        개인정보처리방침
      </button>

      {open && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "1rem", width: "100%", maxWidth: "680px", maxHeight: "85dvh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #e5e7eb" }}>
              <h2 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 700 }}>주식회사 와야미디어 개인정보 처리방침</h2>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem", color: "#6b7280", lineHeight: 1 }}>✕</button>
            </div>

            <div style={{ overflowY: "auto", padding: "1.5rem", fontSize: "0.875rem", lineHeight: 1.8, color: "#374151" }}>
              <p style={{ marginBottom: "1.5rem" }}>
                주식회사 와야미디어(이하 &apos;회사&apos;)는 정보주체의 동의를 기반으로 개인정보를 수집·이용 및 제공하고 있으며, 정보주체의 개인정보자기결정권을 적극적으로 보장하고 개인정보와 관련한 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보처리방침을 수립·공개합니다.<br /><br />
                본 개인정보처리방침은 &apos;네일학원 상담 안내&apos; 서비스에 적용됩니다.
              </p>

              <Section title="제1조 (개인정보의 처리 목적)">
                ① 회사는 개인정보를 다음의 목적을 위해 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행합니다.<br /><br />
                ② 개인정보 처리목적<br />
                가) 정보주체의 식별 및 상담 신청 의사 확인<br />
                나) 네일학원 상담 안내 및 관련 서비스 제공<br />
                다) 신규 서비스 개발, 이벤트 및 마케팅 정보 전달<br />
                라) 서비스 이용기록 분석 및 맞춤형 정보 제공
              </Section>

              <Section title="제2조 (개인정보의 처리 및 보유 기간)">
                회사는 정보주체로부터 개인정보를 수집 시 동의 받은 보유·이용기간 내에서 처리·보유하며, 탈퇴 요청 또는 동의 철회 시 지체 없이 파기합니다.<br /><br />
                ① 관계법령에 따른 보관<br />
                서비스 이용 관련 개인정보 : 통신비밀보호법 / 3개월<br />
                표시/광고에 관한 기록 : 전자상거래법 / 6개월<br />
                소비자의 불만 또는 분쟁처리에 관한 기록 : 3년<br /><br />
                ② 상담 이력 관리를 위해 수집일로부터 1년간 보유함을 원칙으로 합니다.
              </Section>

              <Section title="제3조 (정보주체의 권리·의무 및 행사방법)">
                이용자는 언제든지 개인정보 열람 요구, 오류 정정 요구, 삭제 요구, 처리 정지 요구 등의 권리를 행사할 수 있습니다. 관련 요청은 회사의 개인정보관리책임자에게 서면, 전화 또는 이메일로 요청 시 신속히 처리합니다.
              </Section>

              <Section title="제4조 (수집하는 개인정보 항목)">
                회사는 서비스 제공에 필요한 최소한의 개인정보를 수집합니다.<br /><br />
                <b>서비스명:</b> 네일학원 상담 안내 서비스<br />
                <b>필수수집항목:</b> 성명, 연락처, 생년월일<br />
                <b>자동수집항목:</b> IP Address, 참여일시, 유입경로, 서비스 이용기록
              </Section>

              <Section title="제5조 (개인정보의 위탁처리)">
                회사는 서비스 제공을 위해 개인정보 처리 업무의 일부를 외부 전문업체에 위탁할 수 있습니다.
                위탁하는 업무의 내용과 수탁자는 아래와 같으며, 수탁자는 계약 체결·종료에 따라 변경될 수 있습니다.<br /><br />
                <b>수탁자:</b> 상담 업무 대행사 및 소속 상담사(컨설턴트), 문자메시지(SMS/LMS)·카카오 알림톡 발송 대행사<br />
                <b>위탁업무:</b> 상담 업무 대행, 상담 결과 안내, 문자·알림톡 발송<br />
                <b>보유 및 이용기간:</b> 수집 및 동의일로부터 1년<br /><br />
                회사는 위탁계약 체결 시 개인정보가 안전하게 관리되도록 필요한 사항을 계약서에 명시하고,
                수탁자가 개인정보를 안전하게 처리하는지 감독합니다. 수탁자가 변경되는 경우
                본 방침을 통해 공개합니다.
              </Section>

              <Section title="제6조 (개인정보의 제3자 제공)">
                회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않으며, 이용자가 상담 신청 시
                별도로 동의한 범위 내에서만 제공합니다.<br /><br />
                <b>제공받는 자:</b> 올댓뷰티 상담사<br />
                <b>제공 목적:</b> 네일학원 수강료·과정 안내, 국비지원 가능 여부 확인,
                1:1 유선 상담 진행<br />
                <b>제공 항목:</b> 성명, 휴대폰 번호, 생년월일, 성별, 희망 지역, 미용사(네일) 자격증 보유 여부<br />
                <b>보유 및 이용기간:</b> 상담 목적 달성 시 즉시 파기 (최대 수집일로부터 1년)<br /><br />
                이용자는 언제든지 개인정보 보호책임자(shinsy711@gmail.com)에게 요청하여
                제3자 제공 동의를 철회할 수 있습니다.
              </Section>

              <Section title="제7조 (개인정보의 파기)">
                회사는 개인정보 수집·이용목적이 달성된 경우 지체 없이 파기합니다.<br /><br />
                <b>파기방법:</b> 전자적 파일은 복구 불가능한 방법으로 영구 삭제하며, 인쇄물은 분쇄 또는 소각합니다.
              </Section>

              <Section title="제8조 (개인정보의 안전성 확보 조치)">
                ① 정기적인 자체 감사 실시<br />
                ② 개인정보 취급 인원 최소화 및 교육<br />
                ③ 해킹 등에 대비한 기술적 대책 (암호화 통신 SSL 등)<br />
                ④ 접속기록 보관 및 위변조 방지<br />
                ⑤ 개인정보에 대한 접근 권한 제한
              </Section>

              <Section title="제9조 (개인정보 보호책임자)">
                <b>성명:</b> 신승윤<br />
                <b>이메일:</b> shinsy711@gmail.com
              </Section>

              <Section title="제10조 (권익침해에 대한 구제)">
                개인정보 침해 관련 신고·상담이 필요하신 경우 아래 기관에 문의하실 수 있습니다.<br /><br />
                - 개인정보 침해신고센터 (privacy.kisa.or.kr, ☎ 118)<br />
                - 개인정보 분쟁조정위원회 (kopico.go.kr, ☎ 1833-6972)<br />
                - 대검찰청 사이버범죄수사단 (spo.go.kr, ☎ 02-3480-3573)<br />
                - 경찰청 사이버범죄수사단 (netan.go.kr, ☎ 1566-0112)
              </Section>

              <Section title="제11조 (개인정보 처리방침 변경)">
                본 방침의 변경이 있을 시 변경사항 시행 7일 전부터 공지합니다.<br /><br />
                <b>공고일자:</b> 2026년 05월 01일<br />
                <b>시행일자:</b> 2026년 05월 01일
              </Section>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.5rem", color: "#111827" }}>{title}</h3>
      <p style={{ margin: 0 }}>{children}</p>
    </div>
  )
}
