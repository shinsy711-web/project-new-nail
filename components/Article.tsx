import { Fragment } from 'react'
import Link from 'next/link'
import type { Faq, Section, TableBlock } from '@/lib/types'
import { resolveRelated } from '@/data'

/** "앞 **강조** 뒤" 형태의 문자열을 <strong>이 섞인 노드로 변환. 일반 텍스트는 래핑하지 않는다. */
export function rich(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 900,
        color: 'var(--primary)',
        letterSpacing: '0.12em',
        marginBottom: 10,
      }}
    >
      {children}
    </p>
  )
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav
      aria-label="현재 위치"
      style={{
        fontSize: 13,
        color: 'var(--text-muted)',
        marginBottom: 18,
      }}
    >
      <ol
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 6,
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {items.map((item, i) => (
          <li key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <span aria-hidden="true">›</span>}
            {item.href ? (
              <Link href={item.href} style={{ color: 'var(--text-muted)' }}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 17,
        lineHeight: 1.85,
        color: 'var(--text-secondary)',
        fontWeight: 500,
        marginBottom: 28,
      }}
    >
      {children}
    </p>
  )
}

/** 페이지 도입부 — eyebrow + h1 + 리드 문단을 하나의 <header>로 묶는다. */
export function PageHeader({
  eyebrow,
  h1,
  lead,
  meta,
  id = 'page-title',
  size = 'md',
}: {
  eyebrow?: string
  h1: string
  lead?: string
  /** 발행/갱신일 등 부가 정보 */
  meta?: React.ReactNode
  id?: string
  size?: 'md' | 'lg'
}) {
  return (
    <header>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1
        id={id}
        style={{
          fontSize: size === 'lg' ? 'clamp(24px, 4.2vw, 34px)' : 'clamp(23px, 4vw, 32px)',
          fontWeight: 950,
          lineHeight: 1.28,
          marginBottom: 18,
        }}
      >
        {h1}
      </h1>
      {meta && (
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20, marginTop: -6 }}>
          {meta}
        </p>
      )}
      {lead && <Lead>{lead}</Lead>}
    </header>
  )
}

export function FactList({ facts, label }: { facts: { label: string; value: string }[]; label?: string }) {
  return (
    <dl
      aria-label={label ?? '핵심 요약'}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 1,
        background: 'var(--border-color)',
        border: '1px solid var(--border-color)',
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: 40,
      }}
    >
      {facts.map((f, i) => (
        <div key={i} style={{ background: 'var(--bg-card)', padding: '16px 20px' }}>
          <dt
            style={{
              fontSize: 11.5,
              fontWeight: 800,
              color: 'var(--primary)',
              letterSpacing: '0.04em',
              marginBottom: 5,
            }}
          >
            {f.label}
          </dt>
          <dd style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5 }}>
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function DataTable({ table }: { table: TableBlock }) {
  return (
    <figure style={{ margin: '0 0 22px' }}>
      {table.caption && (
        <figcaption
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: 'var(--text-secondary)',
            marginBottom: 10,
          }}
        >
          {table.caption}
        </figcaption>
      )}
      <div className="table-scroll" role="region" tabIndex={0} aria-label={table.caption ?? '데이터 표'}>
        <table className="data-table">
          <thead>
            <tr>
              {table.head.map((h, i) => (
                <th key={i} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) =>
                  j === 0 ? (
                    <th key={j} scope="row">
                      {cell || ' '}
                    </th>
                  ) : (
                    <td key={j}>{cell || ' '}</td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && (
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.7 }}>
          {table.note}
        </p>
      )}
    </figure>
  )
}

export function Callout({ label, body }: { label: string; body: string }) {
  return (
    <aside
      aria-label={label}
      style={{
        background: 'var(--primary-light)',
        borderLeft: '4px solid var(--primary)',
        borderRadius: 14,
        padding: '18px 22px',
        margin: '4px 0 22px',
      }}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 900,
          color: 'var(--primary-dark)',
          letterSpacing: '0.04em',
          marginBottom: 6,
        }}
      >
        {label}
      </p>
      <p style={{ fontSize: 14.5, lineHeight: 1.85, color: 'var(--text-secondary)' }}>{rich(body)}</p>
    </aside>
  )
}

export function Sections({
  sections,
  headingLevel = 2,
  idPrefix = 'sec',
}: {
  sections: Section[]
  headingLevel?: 2 | 3
  idPrefix?: string
}) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <>
      {sections.map((s, i) => {
        const hid = `${idPrefix}-${i}`
        return (
          <section key={i} aria-labelledby={hid} style={{ marginBottom: 44 }}>
            <H
              id={hid}
              style={{
                fontSize: headingLevel === 2 ? 21 : 18,
                fontWeight: 900,
                marginBottom: 14,
                color: 'var(--text-primary)',
                lineHeight: 1.35,
              }}
            >
              {s.h2}
            </H>
            <div className="prose">
              {s.p?.map((p, j) => (
                <p key={j}>{rich(p)}</p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((li, j) => (
                    <li key={j}>{rich(li)}</li>
                  ))}
                </ul>
              )}
              {s.after?.map((p, j) => (
                <p key={`after-${j}`}>{rich(p)}</p>
              ))}
            </div>
            {s.table && <DataTable table={s.table} />}
            {s.callout && <Callout label={s.callout.label} body={s.callout.body} />}
          </section>
        )
      })}
    </>
  )
}

export function FaqBlock({
  faqs,
  title = '자주 묻는 질문',
  id = 'faq-heading',
}: {
  faqs: Faq[]
  title?: string
  id?: string
}) {
  return (
    <section aria-labelledby={id} style={{ marginBottom: 44 }}>
      <h2 id={id} style={{ fontSize: 21, fontWeight: 900, marginBottom: 16 }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {faqs.map((f, i) => (
          <details
            key={i}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 16,
              padding: '18px 22px',
            }}
          >
            <summary
              style={{
                fontSize: 15.5,
                fontWeight: 800,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                listStyle: 'none',
                lineHeight: 1.5,
              }}
            >
              Q. {f.q}
            </summary>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.9,
                color: 'var(--text-secondary)',
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid var(--border-color)',
              }}
            >
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function RelatedLinks({
  hrefs,
  title = '함께 보면 좋은 글',
  id = 'related-heading',
}: {
  hrefs?: string[]
  title?: string
  id?: string
}) {
  const items = resolveRelated(hrefs)
  if (items.length === 0) return null
  return (
    <nav aria-labelledby={id} style={{ marginBottom: 44 }}>
      <h2 id={id} style={{ fontSize: 19, fontWeight: 900, marginBottom: 14 }}>
        {title}
      </h2>
      <ul className="card-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="link-card">
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  color: 'var(--primary)',
                  letterSpacing: '0.06em',
                  display: 'block',
                  marginBottom: 8,
                }}
              >
                {item.sub}
              </span>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>
                {item.label} →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** FAQPage 구조화 데이터 */
export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
