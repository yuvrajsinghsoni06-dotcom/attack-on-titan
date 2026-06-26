// ============================================================
// NEURAL CLOUD — InstancedMesh of 200 background neurons
// Single draw call, GPU-instanced, fully animated
// ============================================================
import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const VERTEX = /* glsl */`
  attribute float aPhase;
  attribute float aSpeed;
  varying float vBrightness;
  uniform float uTime;

  void main() {
    // Per-instance oscillation encoded in phase
    float t = uTime * aSpeed + aPhase;
    float scale = 0.85 + sin(t) * 0.15;

    vBrightness = 0.3 + sin(t * 1.3) * 0.3;

    vec3 pos = position * scale;
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
  }
`

const FRAGMENT = /* glsl */`
  uniform vec3 uColor;
  varying float vBrightness;

  void main() {
    gl_FragColor = vec4(uColor * vBrightness, 0.35 + vBrightness * 0.3);
  }
`

export function NeuralCloud({ count = 200 }) {
  const meshRef = useRef()
  const dummy  = useMemo(() => new THREE.Object3D(), [])

  // Pre-compute random positions, phases, speeds
  const { matrices, phases, speeds } = useMemo(() => {
    const matrices = []
    const phases = new Float32Array(count)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Random point in a large hollow shell
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 10 + Math.random() * 18

      dummy.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      )

      const s = 0.04 + Math.random() * 0.14
      dummy.scale.setScalar(s)
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
      dummy.updateMatrix()
      matrices.push(dummy.matrix.clone())

      phases[i] = Math.random() * Math.PI * 2
      speeds[i] = 0.3 + Math.random() * 0.7
    }
    return { matrices, phases, speeds }
  }, [count])

  // Build custom shader material once
  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader:   VERTEX,
    fragmentShader: FRAGMENT,
    uniforms: {
      uTime:  { value: 0 },
      uColor: { value: new THREE.Color('#8b7355') },
    },
    transparent: true,
    depthWrite:  false,
    blending:    THREE.AdditiveBlending,
  }), [])

  // Build geometry with per-instance attributes
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 5, 5)
    // Repeat phase/speed for every vertex using InstancedBufferAttribute
    geo.setAttribute('aPhase', new THREE.InstancedBufferAttribute(phases, 1))
    geo.setAttribute('aSpeed', new THREE.InstancedBufferAttribute(speeds, 1))
    return geo
  }, [phases, speeds])

  // Set initial matrices once the mesh is mounted
  useEffect(() => {
    if (!meshRef.current) return
    matrices.forEach((m, i) => meshRef.current.setMatrixAt(i, m))
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [matrices])

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
    />
  )
}
