// ============================================================
// SCENE — Root R3F scene component
// Assembles all 3D objects: cloud, nodes, connections, camera
// ============================================================
import { Suspense } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { NeuralCloud }     from './NeuralCloud'
import { HubNode }         from './HubNode'
import { ConnectionLines } from './ConnectionLines'
import { CameraRig }       from './CameraRig'
import { NODES }           from '../data/aotData'

function Atmosphere() {
  const { scene } = useThree()
  scene.fog = new THREE.FogExp2('#0a0704', 0.028)
  return null
}

export default function Scene({ activeSection }) {
  return (
    <>
      {/* Fog / atmosphere */}
      <Atmosphere />

      {/* Lights */}
      <ambientLight intensity={0.15} color="#2a1f14" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.4}
        color="#d4822a"
      />
      {/* Subtle fill from below */}
      <directionalLight
        position={[-5, -10, -5]}
        intensity={0.1}
        color="#7a1f1f"
      />

      {/* Background neural cloud — 200 neurons, 1 draw call */}
      <Suspense fallback={null}>
        <NeuralCloud count={200} />
      </Suspense>

      {/* Neural connections (tubes + pulse signals) */}
      <ConnectionLines />

      {/* Hub nodes */}
      {NODES.map((node, i) => (
        <HubNode
          key={node.id}
          node={node}
          isActive={activeSection === i}
        />
      ))}

      {/* Scroll-driven camera */}
      <CameraRig />
    </>
  )
}
