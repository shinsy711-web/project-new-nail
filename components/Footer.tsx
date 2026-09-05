import Link from 'next/link'
import PrivacyPolicyModal from './PrivacyPolicyModal'
import LegalNoticeModal from './LegalNoticeModal'
import { CLUSTERS } from '@/data'
import { OPERATOR, SITE_NAME } from '@/lib/site'

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--accent)',
        color: 'white',
        padding: '64px 1.25rem 48px',
        marginTop: 40,
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        {/* 사이트맵 */}
        <nav
          aria-label="사이트맵"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 28,
            marginBottom: 44,
            paddingBottom: 36,
            borderBottom: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {CLUSTERS.map((c) => (
            <div key={c.slug}>
              <Link
                href={`/${c.slug}`}
                style={{
                  fontSize: 13,
                  fontWeight: 900,
                  color: 'var(--primary)',
                  display: 'block',
                  marginBottom: 12,
                }}
              >
                {c.name}
              </Link>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                {c.pages.slice(0, 5).map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/${c.slug}/${p.slug}`}
                      style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}
                    >
                      {p.keyword}
                    </Link>
                  </li>
                ))}
                {c.pages.length > 5 && (
                  <li>
                    <Link href={`/${c.slug}`} style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.35)' }}>
                      + {c.pages.length - 5}건 더보기
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </nav>

        {/* 운영 정보 */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 900, fontSize: 16, color: 'var(--primary)', marginBottom: 8 }}>
            {SITE_NAME}
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 22 }}>
            네일학원 수강료 · 국비지원 · 네일 자격증 · 취업 · 창업 정보 전문
          </p>

          <ul
            aria-label="사이트 정보"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.6rem',
              flexWrap: 'wrap',
              marginBottom: 26,
              fontSize: 13,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.55)',
              listStyle: 'none',
              margin: '0 0 26px',
              padding: 0,
            }}
          >
            <li>
              <Link href="/about" style={{ color: 'inherit' }}>
                사이트 소개
              </Link>
            </li>
            <li>
              <Link href="/contact" style={{ color: 'inherit' }}>
                문의하기
              </Link>
            </li>
            <li>
              <Link href="/qna" style={{ color: 'inherit' }}>
                자주 묻는 질문
              </Link>
            </li>
            <li>
              <Link href="/guide" style={{ color: 'inherit' }}>
                등록 전 체크리스트
              </Link>
            </li>
            <li>
              <PrivacyPolicyModal />
            </li>
            <li>
              <LegalNoticeModal />
            </li>
          </ul>

          <p
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.3)',
              lineHeight: 1.9,
              maxWidth: 640,
              margin: '0 auto',
            }}
          >
            운영: {OPERATOR.name} · 개인정보 보호책임자 {OPERATOR.manager} · {OPERATOR.email}
            <br />
            본 사이트는 정보 제공과 상담 연결을 목적으로 운영되며, 수강료·국비지원 금액·급여 등
            모든 수치는 참고용입니다. 실제 조건은 개별 학원과 관계 기관 안내를 확인하시기 바랍니다.
            <br />
            자격증 시험 일정과 응시료는 큐넷(q-net.or.kr), 국비지원은 HRD-Net(hrd.go.kr) 공고를 기준으로 하세요.
            <br />© 2026 {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
