// ============================================================
// CONNECTION LINES — Neural synapses between hub nodes
// Tube geometry along CatmullRom curves + animated pulse signals
// ============================================================
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { NODES, CONNECTIONS } from '../data/aotData'

const GOLD    = new THREE.Color('#d4822a')
const VEIN    = new THREE.Color('#7a1f1f')
const SIGNAL_GOLD = new THREE.Color('#f0c060')

// ─── Single animated pulse sphere ────────────────────────
function PulseSignal({ curve, speed, offset, color }) {
  const ref = useRef()
  const t   = useRef(offset)

  useFrame((_, delta) => {
    t.current = (t.current + delta * speed) % 1
    if (!ref.current) return
    const pos = curve.getPoint(t.current)
    ref.current.position.copy(pos)

    // Fade at endpoints
    const fade = Math.sin(t.current * Math.PI)
    ref.current.material.opacity = fade * 0.9 + 0.05
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 8, 8]} />
      <meshBasicMaterial
        color={color}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// ─── One connection (tube + N pulse signals) ─────────────
function Connection({ fromPos, toPos, speed }) {
  // Build a gentle arc between the two nodes
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...fromPos)
    const end   = new THREE.Vector3(...toPos)
    const mid   = start.clone().lerp(end, 0.5)

    // Add a slight bulge perpendicular to the connection
    const dir  = end.clone().sub(start).normalize()
    const perp = new THREE.Vector3(-dir.z, dir.y * 0.5, dir.x).normalize()
    const dist = start.distanceTo(end)
    mid.addScaledVector(perp, dist * 0.18)
    mid.y += dist * 0.06  // small lift

    return new THREE.CatmullRomCurve3([start, mid, end], false, 'catmullrom', 0.5)
  }, [fromPos, toPos])

  // Tube geometry
  const tubeGeo = useMemo(() =>
    new THREE.TubeGeometry(curve, 24, 0.018, 5, false),
    [curve]
  )

  // Three staggered pulse signals per connection
  const pulses = useMemo(() => [
    { offset: 0.0,   color: SIGNAL_GOLD },
    { offset: 0.33,  color: VEIN },
    { offset: 0.66,  color: SIGNAL_GOLD },
  ], [])

  return (
    <group>
      {/* Faint tube */}
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial
          color="#3a2a18"
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      {/* Brighter tube overlay (additive) */}
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Pulse signals */}
      {pulses.map((p, i) => (
        <PulseSignal
          key={i}
          curve={curve}
          speed={speed}
          offset={p.offset}
          color={p.color}
        />
      ))}
    </group>
  )
}

// ─── All connections ──────────────────────────────────────
export function ConnectionLines() {
  return (
    <group>
      {CONNECTIONS.map((conn, i) => (
        <Connection
          key={i}
          fromPos={NODES[conn.from].position}
          toPos={NODES[conn.to].position}
          speed={conn.speed}
        />
      ))}
    </group>
  )
}
