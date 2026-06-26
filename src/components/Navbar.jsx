// ============================================================
// NAVBAR — Fixed top navigation with Wings of Freedom logo
// ============================================================
import { useEffect, useState } from 'react'
import { SECTION_NAMES } from '../data/aotData'
import { scrollStore } from '../scrollStore'

const NUM_SECTIONS = 8

function WingsLogo() {
  return (
    <svg viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 14 C16 8 4 3 1 10 C-0.5 14.5 6 17 10 14.5 C5 19 1 23 2 27 C4 31 11 28 14.5 23 C15.5 21 17 18 18 16.5 C17 20 17 24 20 26Z"
        fill="#d4822a"
      />
      <path
        d="M20 14 C24 8 36 3 39 10 C40.5 14.5 34 17 30 14.5 C35 19 39 23 38 27 C36 31 29 28 25.5 23 C24.5 21 23 18 22 16.5 C23 20 23 24 20 26Z"
        fill="#d4822a"
      />
      <circle cx="20" cy="16" r="2" fill="#d4822a" />
    </svg>
  )
}

export function Navbar({ activeSection, onSectionClick }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ pointerEvents: 'auto' }}>
      <div className="nav-logo">
        <WingsLogo />
        SNK
      </div>

      <ul className="nav-links">
        {SECTION_NAMES.map((name, i) => (
          <li key={i}>
            <a
              href="#"
              className={activeSection === i ? 'active' : ''}
              onClick={e => { e.preventDefault(); onSectionClick(i) }}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-scroll-hint">▼ SCROLL</div>
    </nav>
  )
}
