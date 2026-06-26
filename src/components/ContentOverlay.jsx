// ============================================================
// CONTENT OVERLAY — HTML panels for each section
// Panels animate in/out based on activeSection prop
// ============================================================
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { NODES } from '../data/aotData'

// ── Intro panel (section 0) ───────────────────────────────
function IntroPanel({ active }) {
  return (
    <div className={`intro-panel ${active ? 'active' : ''}`}>
      <div className="intro-title">
        <span className="t-attack">ATTACK</span>
        <span className="t-on">ON</span>
        <span className="t-titan">TITAN</span>
      </div>
      <p className="intro-sub">
        Every character, titan, and story arc is a glowing node in 3D space.
        Scroll to travel through the neural network of the AoT universe.
      </p>
      <div className="intro-stats">
        <div className="intro-stat"><span className="stat-num">9</span><span className="stat-label">Titan Shifters</span></div>
        <div className="intro-stat"><span className="stat-num">4</span><span className="stat-label">Seasons</span></div>
        <div className="intro-stat"><span className="stat-num">139</span><span className="stat-label">Chapters</span></div>
        <div className="intro-stat"><span className="stat-num">2K</span><span className="stat-label">Years of Lore</span></div>
      </div>
      <div className="scroll-cta">
        <div className="scroll-cta-line" />
        SCROLL TO EXPLORE
        <div className="scroll-cta-line" />
      </div>
    </div>
  )
}

// ── Lore panel ────────────────────────────────────────────
function LorePanel() {
  const { content } = NODES[1]
  return (
    <>
      <div className="panel-tag">{content.tag}</div>
      <h2 className="panel-title">{content.title}</h2>
      <div className="panel-divider" />
      <p className="panel-desc" dangerouslySetInnerHTML={{ __html: content.desc }} />
      <div className="facts-grid">
        {content.facts.map((f, i) => (
          <div className="fact-item" key={i}>
            <span className="fact-label">{f.label}</span>
            <span className="fact-value">{f.value}</span>
          </div>
        ))}
      </div>
      <p className="panel-desc" style={{ fontSize: '0.82rem', fontStyle: 'italic', opacity: 0.7 }}>
        {content.extra}
      </p>
    </>
  )
}

// ── Characters panel ──────────────────────────────────────
function CharactersPanel() {
  const { content } = NODES[2]
  return (
    <>
      <div className="panel-tag">{content.tag}</div>
      <h2 className="panel-title">{content.title}</h2>
      <div className="panel-divider" />
      <p className="panel-desc">{content.desc}</p>
      <div className="chars-mini">
        {content.characters.map((c, i) => (
          <div className="char-mini" key={i}>
            <div className="char-mini-icon">{c.icon}</div>
            <div className="char-mini-info">
              <div className="char-mini-name">{c.name}</div>
              <div className="char-mini-role">{c.role}</div>
              <div className="char-mini-quote">{c.quote}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Titans panel ──────────────────────────────────────────
function TitansPanel() {
  const { content } = NODES[3]
  return (
    <>
      <div className="panel-tag">{content.tag}</div>
      <h2 className="panel-title">{content.title}</h2>
      <div className="panel-divider" />
      <p className="panel-desc" dangerouslySetInnerHTML={{ __html: content.desc }} />
      <div className="titans-list">
        {content.titans.map((t, i) => (
          <div className="titan-mini" key={i}>
            <div className="titan-mini-icon">{t.icon}</div>
            <div>
              <div className="titan-mini-name">{t.name}</div>
              <div className="titan-mini-ability">{t.ability}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Factions panel ────────────────────────────────────────
function FactionsPanel() {
  const { content } = NODES[4]
  return (
    <>
      <div className="panel-tag">{content.tag}</div>
      <h2 className="panel-title">{content.title}</h2>
      <div className="panel-divider" />
      <p className="panel-desc">{content.desc}</p>
      <div className="factions-grid-mini">
        {content.factions.map((f, i) => (
          <div
            className="faction-chip"
            key={i}
            style={{ background: f.bg, borderColor: f.border, color: f.nameColor }}
          >
            <span className="faction-chip-icon">{f.icon}</span>
            <div>
              <div className="faction-chip-name" style={{ color: f.nameColor }}>{f.name}</div>
              <div className="faction-chip-motto" style={{ color: 'var(--text-muted)' }}>{f.motto}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Walls panel ───────────────────────────────────────────
function WallsPanel() {
  const { content } = NODES[5]
  return (
    <>
      <div className="panel-tag">{content.tag}</div>
      <h2 className="panel-title">{content.title}</h2>
      <div className="panel-divider" />
      <p className="panel-desc" dangerouslySetInnerHTML={{ __html: content.desc }} />
      <div className="walls-list">
        {content.walls.map((w, i) => (
          <div className="wall-item" key={i} style={{ borderLeftColor: w.color }}>
            <div className="wall-item-dot" style={{ background: w.color, boxShadow: `0 0 8px ${w.color}` }} />
            <div>
              <div className="wall-item-name" style={{ color: w.color }}>{w.name}</div>
              <div className="wall-item-district">{w.district}</div>
              <div className="wall-item-status">{w.status}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="panel-desc" style={{ fontSize: '0.82rem', opacity: 0.7, fontStyle: 'italic' }}>
        Each wall is 50 metres tall, built from hardened Colossal Titans standing shoulder-to-shoulder. The Wall Cult worshipped them as divine — secretly preventing discovery of the titans within.
      </p>
    </>
  )
}

// ── World panel ───────────────────────────────────────────
function WorldPanel() {
  const { content } = NODES[6]
  return (
    <>
      <div className="panel-tag">{content.tag}</div>
      <h2 className="panel-title">{content.title}</h2>
      <div className="panel-divider" />
      <p className="panel-desc">{content.desc}</p>
      <div className="world-facts-list">
        {content.worldFacts.map((f, i) => (
          <div className="world-fact" key={i}>
            <div className="world-fact-icon">{f.icon}</div>
            <div>
              <div className="world-fact-label">{f.label}</div>
              <div className="world-fact-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Rumbling panel ────────────────────────────────────────
function RumblingPanel() {
  const { content } = NODES[7]
  return (
    <>
      <div className="panel-tag">{content.tag}</div>
      <h2 className="panel-title" style={{ color: 'var(--vein-bright)' }}>{content.title}</h2>
      <div className="panel-divider" style={{ background: 'linear-gradient(90deg, var(--vein-bright), transparent)' }} />
      <p className="panel-desc" dangerouslySetInnerHTML={{ __html: content.desc }} />
      <div className="arcs-list">
        {content.arcs.map((a, i) => (
          <div className="arc-item" key={i}>
            <div className="arc-season">{a.season} · {a.year}</div>
            <div className="arc-name">{a.arc}</div>
            <div className="arc-desc">{a.desc}</div>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Panel map ─────────────────────────────────────────────
const PANELS = [
  null,           // 0: intro (handled separately)
  LorePanel,
  CharactersPanel,
  TitansPanel,
  FactionsPanel,
  WallsPanel,
  WorldPanel,
  RumblingPanel,
]

// ── Main ContentOverlay ───────────────────────────────────
export function ContentOverlay({ activeSection }) {
  const panelRefs = useRef([])

  // Animate panels in/out with GSAP when activeSection changes
  useEffect(() => {
    panelRefs.current.forEach((el, i) => {
      if (!el) return
      if (i === activeSection) {
        gsap.to(el, { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out', overwrite: true })
      } else {
        gsap.to(el, { opacity: 0, x: 30, duration: 0.35, ease: 'power2.in', overwrite: true })
      }
    })
  }, [activeSection])

  return (
    <div className="content-overlay">
      {/* Section 0: Intro (left-side special layout) */}
      <IntroPanel active={activeSection === 0} />

      {/* Sections 1–7: Right-side panels */}
      {PANELS.slice(1).map((PanelComponent, idx) => {
        const sectionIdx = idx + 1
        return (
          <div
            key={sectionIdx}
            className="section-panel"
            ref={el => (panelRefs.current[sectionIdx] = el)}
            style={{ opacity: 0, transform: 'translateX(30px)' }}
          >
            {PanelComponent && <PanelComponent />}
          </div>
        )
      })}
    </div>
  )
}
