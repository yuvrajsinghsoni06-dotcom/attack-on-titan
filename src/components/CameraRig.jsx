// ============================================================
// CAMERA RIG — GSAP ScrollTrigger + CatmullRomCurve3
// Reads scroll progress from scrollStore each frame and
// smoothly moves the camera along the precomputed curve
// ============================================================
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { buildCameraCurve, NODES } from '../data/aotData'
import { scrollStore } from '../scrollStore'

const curve = buildCameraCurve()

// Look-at targets: the position of the hub node for each section
const LOOK_AT_TARGETS = NODES.map(n => new THREE.Vector3(...n.position))

// Smoothed camera state
const _camPos     = new THREE.Vector3()
const _camLookAt  = new THREE.Vector3()
const _targetPos  = new THREE.Vector3()
const _targetLook = new THREE.Vector3()

export function CameraRig() {
  const { camera } = useThree()
  const initialized = useRef(false)

  useFrame(() => {
    const progress = scrollStore.progress  // 0..1

    // Sample position on the curve
    curve.getPoint(progress, _targetPos)

    // Look toward the current section's node
    const section    = Math.min(Math.floor(progress * 8), 7)
    const nextProg   = Math.min(progress + 0.015, 1)
    curve.getPoint(nextProg, _targetLook)

    // Blend: 70% toward the curve's tangent direction, 30% toward node
    const nodeTarget = LOOK_AT_TARGETS[section]
    _targetLook.lerp(nodeTarget, 0.3)

    // Jump on first frame to avoid flying in from origin
    if (!initialized.current) {
      camera.position.copy(_targetPos)
      _camPos.copy(_targetPos)
      _camLookAt.copy(_targetLook)
      initialized.current = true
    }

    // Smooth follow with LERP
    _camPos.lerp(_targetPos, 0.06)
    _camLookAt.lerp(_targetLook, 0.05)

    camera.position.copy(_camPos)
    camera.lookAt(_camLookAt)
  })

  return null
}
