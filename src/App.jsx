// ============================================================
// APP — Root component
// Architecture:
//   - Tall scroll div (800vh) creates natural document scroll
//   - GSAP ScrollTrigger maps scroll → scrollStore.progress
//   - Fixed R3F Canvas renders the 3D neural network
//   - Fixed HTML overlay shows content panels
//   - Section dots + navbar allow direct section jumping
// ============================================================
import { useState, useEffect, useLayoutEffect, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import Scene from './components/Scene'
import { ContentOverlay } from './components/ContentOverlay'
import { Navbar } from './components/Navbar'
import { scrollStore } from './scrollStore'
import { SECTION_NAMES } from './data/aotData'

gsap.registerPlugin(ScrollTrigger)

const NUM_SECTIONS = 8
const TOTAL_HEIGHT  = `${NUM_SECTIONS * 100}vh`

// ── Loader component ─────────────────────────────────────
function Loader({ onDone }) {
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setFade(true)
      setTimeout(onDone, 800)
    }, 2800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className={`loader-overlay${fade ? ' fade-out' : ''}`}>
      <svg className="loader-wings" viewBox="0 0 100 70">
        <path
          d="M50 35 C40 20 10 8 2 25 C-2 36 15 42 25 36 C12 47 2 57 5 67 C10 77 28 70 36 57 C38 52 43 44 45 40 C43 50 43 61 50 65Z"
          fill="#d4822a"
        />
        <path
          d="M50 35 C60 20 90 8 98 25 C102 36 85 42 75 36 C88 47 98 57 95 67 C90 77 72 70 64 57 C62 52 57 44 55 40 C57 50 57 61 50 65Z"
          fill="#d4822a"
        />
        <circle cx="50" cy="42" r="5" fill="#d4822a" />
      </svg>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" />
      </div>
      <p className="loader-text">INITIALIZING NEURAL NETWORK…</p>
    </div>
  )
}

// ── Section navigation dots ───────────────────────────────
function SectionDots({ activeSection, onDotClick }) {
  return (
    <div className="section-dots">
      {SECTION_NAMES.map((name, i) => (
        <button
          key={i}
          className={`section-dot${activeSection === i ? ' active' : ''}`}
          data-label={name}
          onClick={() => onDotClick(i)}
          aria-label={`Go to ${name}`}
        />
      ))}
    </div>
  )
}

// ── Scroll progress bar ───────────────────────────────────
function ScrollProgressBar({ progress }) {
  return (
    <div
      className="scroll-progress-bar"
      style={{ width: `${progress * 100}%` }}
    />
  )
}

// ── Main App ──────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollDivRef = useRef(null)
  const stRef = useRef(null)

  // Subscribe to scrollStore changes
  useEffect(() => {
    const unsub = scrollStore.subscribe((section, progress) => {
      setActiveSection(section)
      setScrollProgress(progress)
    })
    return unsub
  }, [])

  // Set up GSAP ScrollTrigger after load
  useLayoutEffect(() => {
    if (!loaded) return

    stRef.current = ScrollTrigger.create({
      trigger:  scrollDivRef.current,
      start:    'top top',
      end:      'bottom bottom',
      scrub:    0.4,               // slight smoothing (GSAP recommended)
      onUpdate: (self) => {
        scrollStore.setProgress(self.progress)
      },
    })

    return () => {
      stRef.current?.kill()
    }
  }, [loaded])

  // Jump camera to a section by scrolling to that fraction
  const jumpToSection = (sectionIndex) => {
    if (!scrollDivRef.current) return
    const totalH = scrollDivRef.current.scrollHeight - window.innerHeight
    const target = (sectionIndex / (NUM_SECTIONS - 1)) * totalH
    gsap.to(window, {
      scrollTo: { y: target, autoKill: false },
      duration: 1.4,
      ease: 'power3.inOut',
    })
  }

  // Fallback for scrollTo plugin not being loaded
  const handleSectionJump = (i) => {
    const el = scrollDivRef.current
    if (!el) return
    const totalScrollable = el.scrollHeight - window.innerHeight
    const targetY = (i / (NUM_SECTIONS - 1)) * totalScrollable
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  return (
    <>
      {/* Loading screen */}
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      {/* Scroll progress bar */}
      <ScrollProgressBar progress={scrollProgress} />

      {/* ── Fixed 3D Canvas ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
      }}>
        <Canvas
          camera={{ position: [0, 12, 26], fov: 65, near: 0.1, far: 200 }}
          gl={{
            antialias:  true,
            alpha:      false,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl, scene }) => {
            gl.setClearColor(new THREE.Color('#0a0704'))
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            scene.fog = new THREE.FogExp2('#0a0704', 0.026)
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Scene activeSection={activeSection} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Fixed HTML overlay ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <Navbar
          activeSection={activeSection}
          onSectionClick={handleSectionJump}
        />
        <ContentOverlay activeSection={activeSection} />
        <SectionDots
          activeSection={activeSection}
          onDotClick={handleSectionJump}
        />
      </div>

      {/* ── Tall transparent div creates scroll height ── */}
      {/* pointer-events: none so canvas stays interactive */}
      <div
        ref={scrollDivRef}
        style={{
          position:      'relative',
          zIndex:        5,
          height:        TOTAL_HEIGHT,
          pointerEvents: 'none',   // pass clicks through to canvas
        }}
      />
    </>
  )
}
