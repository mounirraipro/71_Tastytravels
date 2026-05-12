'use client';
import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/play', label: 'Play' },
  { href: '/how-to-play', label: 'Guide' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-light)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.1rem',
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
        }}>
          Tasty Travels
        </Link>

        <nav className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.125rem',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
                fontSize: '0.8125rem',
                fontWeight: 450,
                transition: 'all var(--transition)',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.background = 'var(--cream-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/play" style={{
            marginLeft: '0.5rem',
            padding: '0.375rem 1rem',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--black)',
            color: 'var(--white)',
            fontSize: '0.8125rem',
            fontWeight: 500,
          }}>
            Play Now
          </Link>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '0.375rem',
            lineHeight: 1,
          }}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {isOpen && (
        <nav className="mobile-nav" style={{
          padding: '0.5rem 1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.125rem',
          borderTop: '1px solid var(--border-light)',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                padding: '0.625rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: 450,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
