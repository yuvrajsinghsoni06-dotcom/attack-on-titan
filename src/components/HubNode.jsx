// ============================================================
// HUB NODE — Glowing sphere with custom GLSL shader
// Vertex: sine-wave vertex displacement ("breathing")
// Fragment: Fresnel rim glow + pulsing core
// ============================================================
import { useRef, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Html, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ─── Custom shader material ──────────────────────────────
const VERT = /* glsl */`
  uniform float uTime;
  varying vec3  vNormal;
  varying vec3  vViewPos;

  void main() {
    vNormal = normalize(normalMatrix * normal);

    // Sine-wave displacement from center — the "breath"
    float dist    = length(position);
    float breathe = sin(uTime * 1.8 + dist * 4.0) * 0.055;
    vec3  newPos  = position * (1.0 + breathe);

    vec4 mv    = modelViewMatrix * vec4(newPos, 1.0);
    vViewPos   = -mv.xyz;              // vector toward camera in view space
    gl_Position = projectionMatrix * mv;
  }
`

const FRAG = /* glsl */`
  uniform vec3  uColor;
  uniform vec3  uRimColor;
  uniform float uTime;
  uniform float uIntensity;   // 1.0 normal, 1.5+ when active
  varying vec3  vNormal;
  varying vec3  vViewPos;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vViewPos);

    // Fresnel — brightens at silhouette edges
    float fresnel = pow(1.0 - abs(dot(n, v)), 2.6);

    // Slow pulse
    float pulse = sin(uTime * 2.2) * 0.35 + 0.65;

    // Faint interior core
    vec3  core = uColor * 0.08;

    // Rim glow (fresnel-driven)
    vec3  rim  = uRimColor * fresnel * 2.8 * pulse * uIntensity;
    rim       += uColor    * fresnel * uIntensity * 0.7;

    float alpha = 0.06 + fresnel * 0.94;

    gl_FragColor = vec4(core + rim, alpha);
  }
`

// Create the extended material class
const NeuronMaterial = shaderMaterial(
  {
    uTime:      0,
    uColor:     new THREE.Color('#d4822a'),
    uRimColor:  new THREE.Color('#7a1f1f'),
    uIntensity: 1.0,
  },
  VERT,
  FRAG,
)
extend({ NeuronMaterial })

// ─── Inner glow ring ─────────────────────────────────────
function InnerCore({ color, size }) {
  return (
    <mesh scale={size * 0.38}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.0}
        transparent
        opacity={0.18}
      />
    </mesh>
  )
}

// ─── HubNode ─────────────────────────────────────────────
export function HubNode({ node, isActive }) {
  const { position, color, rimColor, size, label, sublabel } = node
  const matRef  = useRef()
  const meshRef = useRef()

  const colColor = useMemo(() => new THREE.Color(color),    [color])
  const rimCol   = useMemo(() => new THREE.Color(rimColor), [rimColor])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    matRef.current.uTime      = clock.elapsedTime
    matRef.current.uIntensity = isActive
      ? THREE.MathUtils.lerp(matRef.current.uIntensity, 2.2, 0.04)
      : THREE.MathUtils.lerp(matRef.current.uIntensity, 1.0, 0.04)
  })

  return (
    <group position={position}>
      {/* Outer fresnel shell — back face so it halos behind */}
      <mesh ref={meshRef} scale={size * 1.6}>
        <sphereGeometry args={[1, 48, 48]} />
        <neuronMaterial
          ref={matRef}
          uColor={colColor}
          uRimColor={rimCol}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Front-face shell (thinner rim) */}
      <mesh scale={size * 1.55}>
        <sphereGeometry args={[1, 32, 32]} />
        <neuronMaterial
          uColor={colColor}
          uRimColor={rimCol}
          transparent
          depthWrite={false}
          side={THREE.FrontSide}
          uIntensity={0.4}
        />
      </mesh>

      {/* Glowing core */}
      <InnerCore color={color} size={size} />

      {/* Point light that illuminates nearby connections */}
      <pointLight color={color} intensity={isActive ? 5 : 1.8} distance={8} decay={2} />

      {/* Label rendered in DOM via drei Html */}
      <Html
        center={false}
        position={[0, size * 1.9, 0]}
        style={{ pointerEvents: 'none' }}
        distanceFactor={18}
        occlude={false}
      >
        <div className="node-label">
          <span className="node-label-name">{label}</span>
          <span className="node-label-sub">{sublabel}</span>
        </div>
      </Html>
    </group>
  )
}
