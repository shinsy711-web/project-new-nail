"use client"

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/course', label: '학원·과정' },
  { href: '/license', label: '자격증' },
  { href: '/cost', label: '수강료' },
  { href: '/funding', label: '국비지원' },
  { href: '/region', label: '지역별' },
  { href: '/career', label: '취업' },
  { href: '/startup', label: '창업' },
  { href: '/compare', label: '학원비교' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <nav
      aria-label="주요 메뉴"
      style={{
        background: 'var(--glass)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '0 1.25rem',
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          display: 'flex',
          height: '3.9rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <Link
          href="/"
          style={{
            fontWeight: 900,
            fontSize: 16,
            color: 'var(--primary)',
            letterSpacing: '-0.03em',
            flexShrink: 0,
          }}
        >
          네일학원 <span style={{ color: 'var(--accent)' }}>종합가이드</span>
        </Link>

        <ul className="desktop-nav" style={{ display: 'flex', gap: '1.1rem', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="hamburger-btn"
          onClick={() => setOpen(!open)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            flexDirection: 'column',
            gap: 5,
          }}
          aria-label="메뉴 열기"
          aria-expanded={open}
        >
          <span
            style={{
              display: 'block',
              width: 22,
              height: 2,
              background: open ? 'transparent' : 'var(--text-primary)',
              transition: 'all 0.2s',
              transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 22,
              height: 2,
              background: 'var(--text-primary)',
              opacity: open ? 0 : 1,
              transition: 'opacity 0.2s',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 22,
              height: 2,
              background: 'var(--text-primary)',
              transition: 'all 0.2s',
              transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}
          />
        </button>
      </div>

      {open && (
        <div
          style={{
            position: 'fixed',
            top: '3.9rem',
            left: 0,
            right: 0,
            background: 'white',
            borderBottom: '1px solid var(--border-color)',
            padding: '0.5rem 1.25rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 30px rgba(31,23,32,0.08)',
            maxHeight: 'calc(100dvh - 3.9rem)',
            overflowY: 'auto',
          }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--text-primary)',
                padding: '13px 0',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/qna"
            onClick={() => setOpen(false)}
            style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', padding: '13px 0' }}
          >
            자주 묻는 질문
          </Link>
        </div>
      )}
    </nav>
  )
}
