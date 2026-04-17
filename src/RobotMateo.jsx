import React, { useRef, Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Center, Bounds } from '@react-three/drei'

// Prevent crashes if the model fails by wrapping in a class boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ color: '#ff4444', textAlign: 'center', fontSize: '10px' }}>Modelo<br/>no disponible</div>
    }
    return this.props.children
  }
}

export function RobotModel({ url }) {
  const { scene } = useGLTF(url)
  const robotRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const lastMouseMoveTime = useRef(0)
  const blinkState = useRef({ timer: 0, nextBlink: 3 })
  const eyesRef = useRef({ e1: null, e2: null })
  const accentGreen = '#00ff88'

  useEffect(() => {
    lastMouseMoveTime.current = performance.now()
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
      lastMouseMoveTime.current = performance.now()
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Buscar los ojitos de manera infalible en todo el árbol 3D, priorizando Meshes
  useEffect(() => {
    let e1 = null;
    let e2 = null;
    scene.traverse((child) => {
      // Solo queremos deformar la malla (Mesh), no un grupo contenedor que podría tener mal la escala
      if (child.name && child.isMesh) {
        const normalized = child.name.toLowerCase().replace(/[^a-z0-9]/g, '')
        if (!e1 && normalized.includes('ojito1')) {
          e1 = child
          if (e1.userData.init === undefined) {
            e1.userData.origScaleY = e1.scale.y
            e1.userData.origRotX = e1.rotation.x
            e1.userData.origRotY = e1.rotation.y
            e1.userData.init = true
            e1.translateZ(0.015) // Empujar un poco hacia fuera para que no se hunda en el visor
          }
          if (e1.material) {
            e1.material = e1.material.clone()
            e1.material.color = new THREE.Color(accentGreen)
            e1.material.emissive = new THREE.Color(accentGreen)
            e1.material.emissiveIntensity = 1.8
            e1.material.needsUpdate = true
          }
        }
        if (!e2 && normalized.includes('ojito2')) {
          e2 = child
          if (e2.userData.init === undefined) {
            e2.userData.origScaleY = e2.scale.y
            e2.userData.origRotX = e2.rotation.x
            e2.userData.origRotY = e2.rotation.y
            e2.userData.init = true
            e2.translateZ(0.015) // Empujar un poco hacia fuera para que no se hunda en el visor
          }
          if (e2.material) {
            e2.material = e2.material.clone()
            e2.material.color = new THREE.Color(accentGreen)
            e2.material.emissive = new THREE.Color(accentGreen)
            e2.material.emissiveIntensity = 1.8
            e2.material.needsUpdate = true
          }
        }
      }
    })
    eyesRef.current = { e1, e2 }
  }, [scene])

  useFrame((state, delta) => {
    if (robotRef.current) {
      const timeSinceLastMove = performance.now() - lastMouseMoveTime.current
      const isIdle = timeSinceLastMove > 2000 
      const idleFactor = Math.min(1, Math.max(0, (timeSinceLastMove - 2000) / 1000)) 

      const downwardMultiplier = mouse.current.y < 0 ? 0.8 : 0.35

      let bodyTargetX = -mouse.current.y * downwardMultiplier 
      let bodyTargetY = Math.PI + (mouse.current.x * 0.5)

      // El cuerpo ya da el 99% de la sensación de movimiento.
      // Damos a los ojos una rotación casi nula (0.02) para evitar cualquier deformación o hundimiento en la malla.
      let eyeTargetX = -mouse.current.y * 0.02
      let eyeTargetY = mouse.current.x * 0.02

      if (isIdle) {
        bodyTargetY += Math.sin(state.clock.elapsedTime * 0.7) * 0.15 * idleFactor
        eyeTargetX += (Math.sin(state.clock.elapsedTime * 2.1) * 0.01) * idleFactor
        eyeTargetY += (Math.cos(state.clock.elapsedTime * 1.5) * 0.02 + Math.sin(state.clock.elapsedTime * 0.9) * 0.01) * idleFactor
      }

      robotRef.current.rotation.x += (bodyTargetX - robotRef.current.rotation.x) * 0.04
      robotRef.current.rotation.y += (bodyTargetY - robotRef.current.rotation.y) * 0.04
      robotRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08

      // Lógica de parpadeo (Blink)
      blinkState.current.timer += delta
      let isBlinking = false
      if (blinkState.current.timer > blinkState.current.nextBlink) {
        if (blinkState.current.timer < blinkState.current.nextBlink + 0.15) {
          isBlinking = true // Ojo cerrado
        } else {
          // Reiniciamos el temporizador para el próximo parpadeo (aleatorio entre 2 y 5 segundos)
          blinkState.current.timer = 0
          blinkState.current.nextBlink = 2 + Math.random() * 3
        }
      }

      const eyes = eyesRef.current

      if (eyes.e1) {
        const tRotX = eyes.e1.userData.origRotX + eyeTargetX
        const tRotY = eyes.e1.userData.origRotY + eyeTargetY
        eyes.e1.rotation.x += (tRotX - eyes.e1.rotation.x) * 0.06
        eyes.e1.rotation.y += (tRotY - eyes.e1.rotation.y) * 0.06
        
        const targetY = isBlinking ? eyes.e1.userData.origScaleY * 0.05 : eyes.e1.userData.origScaleY
        eyes.e1.scale.y = THREE.MathUtils.lerp(eyes.e1.scale.y, targetY, 0.4)
      }
      if (eyes.e2) {
        const tRotX = eyes.e2.userData.origRotX + eyeTargetX
        const tRotY = eyes.e2.userData.origRotY + eyeTargetY
        eyes.e2.rotation.x += (tRotX - eyes.e2.rotation.x) * 0.06
        eyes.e2.rotation.y += (tRotY - eyes.e2.rotation.y) * 0.06
        
        const targetY = isBlinking ? eyes.e2.userData.origScaleY * 0.05 : eyes.e2.userData.origScaleY
        eyes.e2.scale.y = THREE.MathUtils.lerp(eyes.e2.scale.y, targetY, 0.4)
      }
    }
  })

  // Clone the scene and center it
  return (
    <group ref={robotRef} rotation={[0, Math.PI, 0]}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

const MODEL_PATH = `${import.meta.env.BASE_URL}robotcito.glb`
useGLTF.preload(MODEL_PATH)

export default function RobotCanvas() {
  return (
    <ErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none', background: 'transparent' }}
        gl={{ alpha: true, preserveDrawingBuffer: false, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={2.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <Suspense fallback={null}>
          <Bounds fit clip margin={1.15}>
            <RobotModel url={MODEL_PATH} />
          </Bounds>
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  )
}
