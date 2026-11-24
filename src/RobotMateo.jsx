import React, { useRef, Suspense, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Center, ContactShadows, Environment, Lightformer } from '@react-three/drei'

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
  const accentGreen = '#e5491b'

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

  // Tamaño normalizado: el modelo siempre mide lo mismo, así luces y sombra quedan en su sitio
  const fit = useMemo(() => {
    const size = new THREE.Box3().setFromObject(scene).getSize(new THREE.Vector3())
    const scale = 2.6 / Math.max(size.x, size.y, size.z)
    return { scale, height: size.y * scale }
  }, [scene])

  // Sombras propias y materiales con más respuesta a la luz
  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return
      child.castShadow = true
      child.receiveShadow = true
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      materials.forEach((material) => {
        if (!material) return
        if (material.name === 'Black plastic') {
          // Visor: acabado pulido para que recoja reflejos
          material.roughness = 0.3
          material.envMapIntensity = 1.5
          if ('clearcoat' in material) {
            material.clearcoat = 1
            material.clearcoatRoughness = 0.1
          }
        } else if (material.name === 'White leather') {
          // Carcasa: blanco limpio tipo cerámica, con una capa de barniz que marca las curvas
          material.color.set('#ffffff')
          material.roughness = 0.55
          material.metalness = 0
          material.envMapIntensity = 0.9
          if ('clearcoat' in material) {
            material.clearcoat = 0.5
            material.clearcoatRoughness = 0.22
          }
          if ('sheen' in material) {
            material.sheen = 0
            material.sheenRoughness = 0.5
            material.sheenColor.set('#eaf2ff')
          }
        }
        material.needsUpdate = true
      })
    })
  }, [scene])

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
            e1.material.emissiveIntensity = 1.05
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
            e2.material.emissiveIntensity = 1.05
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
    <>
      <group ref={robotRef} rotation={[0, Math.PI, 0]}>
        <group scale={fit.scale}>
          <Center>
            <primitive object={scene} />
          </Center>
        </group>
      </group>
      <ContactShadows
        position={[0, -fit.height / 2 - 0.42, 0]}
        scale={5.5}
        blur={2.6}
        far={2.4}
        opacity={0.42}
        resolution={512}
        color="#0b1218"
      />
    </>
  )
}

const MODEL_PATH = `${import.meta.env.BASE_URL}robotcito.glb`
useGLTF.preload(MODEL_PATH)

function RobotLoader() {
  const [dots, setDots] = useState('.')
  useEffect(() => {
    const id = setInterval(() => setDots(d => d.length >= 3 ? '.' : d + '.'), 400)
    return () => clearInterval(id)
  }, [])
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '8px', pointerEvents: 'none',
    }}>
      <div style={{
        width: 36, height: 36,
        border: '2px solid #c9cfcc',
        borderTop: '2px solid #e5491b',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <span style={{ color: '#e5491b', fontSize: '11px', letterSpacing: '0.1em', fontFamily: 'monospace' }}>
        cargando{dots}
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function RobotCanvas() {
  const wrapRef = useRef(null)
  const [onScreen, setOnScreen] = useState(true)

  useEffect(() => {
    if (!wrapRef.current) return undefined
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    observer.observe(wrapRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <ErrorBoundary>
      <div ref={wrapRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Suspense fallback={<RobotLoader />}>
          <Canvas
            shadows
            frameloop={onScreen ? 'always' : 'never'}
            dpr={[1, 1.75]}
            camera={{ position: [0, 0.15, 5.4], fov: 40 }}
            style={{ width: '100%', height: '100%', pointerEvents: 'none', background: 'transparent' }}
            gl={{
              alpha: true,
              preserveDrawingBuffer: false,
              antialias: true,
              powerPreference: 'high-performance',
              toneMapping: THREE.NeutralToneMapping,
              toneMappingExposure: 1,
            }}
            performance={{ min: 0.5 }}
          >
            {/* Luz de cielo y suelo: las sombras quedan azuladas y limpias, no grises */}
            <hemisphereLight args={['#ffffff', '#7f8fa3', 0.38]} />
            {/* Luz principal, con sombras propias (orejas y visor sobre el cuerpo) */}
            <directionalLight
              position={[-3.2, 5.5, 5]}
              intensity={2.4}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-radius={6}
              shadow-bias={-0.0004}
              shadow-normalBias={0.03}
              shadow-camera-left={-3}
              shadow-camera-right={3}
              shadow-camera-top={3}
              shadow-camera-bottom={-3}
              shadow-camera-near={0.5}
              shadow-camera-far={16}
            />
            {/* Relleno frontal suave para que el lado en sombra siga leyéndose blanco */}
            <directionalLight position={[4.5, 1.5, 4]} intensity={0.5} color="#e6efff" />
            {/* Contraluces: recortan la silueta por ambos lados */}
            <directionalLight position={[3, 3, -5]} intensity={2.2} color="#ffc4a8" />
            <directionalLight position={[-3.5, -1, -4]} intensity={1.2} color="#a9c8ff" />
            {/* Entorno generado en el navegador: paneles de luz que dibujan los reflejos sobre las curvas */}
            <Environment resolution={256} environmentIntensity={0.75}>
              <color attach="background" args={['#2f3740']} />
              <Lightformer form="rect" intensity={4} position={[0, 5, 1]} scale={[8, 3, 1]} target={[0, 0, 0]} />
              <Lightformer form="rect" intensity={2.4} position={[-5, 1.5, 3]} scale={[1.2, 6, 1]} target={[0, 0, 0]} />
              <Lightformer form="rect" intensity={1.6} position={[5, 1, 2]} scale={[1.2, 5, 1]} target={[0, 0, 0]} color="#ffe3d4" />
              <Lightformer form="ring" intensity={2.4} position={[-2, 2.5, 5]} scale={1.4} target={[0, 0, 0]} />
              <Lightformer form="rect" intensity={0.5} position={[0, -5, 0]} scale={[10, 10, 1]} target={[0, 0, 0]} color="#5d6c7e" />
            </Environment>
            <Suspense fallback={null}>
              <RobotModel url={MODEL_PATH} />
            </Suspense>
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}
