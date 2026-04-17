import { useEffect, useRef } from 'react'

export default function PhysicsOrbits({ skills }) {
  const containerRef = useRef(null)
  const elementsRef = useRef([])
  const physicsRef = useRef({
    nodes: [],
    draggingId: null,
    mouseX: 0,
    mouseY: 0,
    lastTime: 0
  })

  useEffect(() => {
    // Inicializar nodos basados en los datos del componente (radio y velocidad)
    physicsRef.current.nodes = skills.map((skill, index) => {
      // Delay determina la posición angular inicial
      const initialAngle = (skill.delay / skill.speed) * Math.PI * 2
      return {
        id: index,
        x: Math.cos(initialAngle) * skill.radius,
        y: Math.sin(initialAngle) * skill.radius,
        vx: 0,
        vy: 0,
        radius: skill.radius,
        speed: skill.speed, 
        baseAngle: initialAngle,
        radiusSize: 25 // Radio de colisión real del icono (mitad de 42px + padding extra)
      }
    })

    let animationFrameId
    physicsRef.current.lastTime = performance.now()
    const springOrbit = 0.05
    const damping = 0.82
    const pushForce = 0.8
    const dragSpring = 0.2

    const loop = (time) => {
      const dt = Math.min((time - physicsRef.current.lastTime) / 16.66, 3) 
      physicsRef.current.lastTime = time

      const { nodes, draggingId, mouseX, mouseY } = physicsRef.current

      // 1. Movimiento orbital y fuerzas de resorte central
      nodes.forEach(node => {
        const angularDelta = (Math.PI * 2) / (node.speed * 60) * dt
        node.baseAngle += angularDelta

        if (draggingId === node.id) {
          // Si está agarrado, tirarlo hacia el ratón
          node.vx += (mouseX - node.x) * dragSpring
          node.vy += (mouseY - node.y) * dragSpring
        } else {
          // Si no, tirarlo hacia su posición orbital objetivo
          const targetX = Math.cos(node.baseAngle) * node.radius
          const targetY = Math.sin(node.baseAngle) * node.radius
          
          node.vx += (targetX - node.x) * springOrbit
          node.vy += (targetY - node.y) * springOrbit
        }
      })

      // 2. Colisiones (Que no se atraviesen)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i]
          const n2 = nodes[j]
          
          const dx = n2.x - n1.x
          const dy = n2.y - n1.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const minDist = n1.radiusSize + n2.radiusSize 
          
          if (dist > 0 && dist < minDist) {
            const penetration = minDist - dist
            const nX = dx / dist
            const nY = dy / dist
            const force = penetration * pushForce
            
            n1.vx -= nX * force * 0.5
            n1.vy -= nY * force * 0.5
            n2.vx += nX * force * 0.5
            n2.vy += nY * force * 0.5
          }
        }
      }

      // 3. Aplicar físicas al DOM directamente para máximo rendimiento (sin setState / Re-renders)
      nodes.forEach((node, i) => {
        node.vx *= damping
        node.vy *= damping
        node.x += node.vx * dt
        node.y += node.vy * dt

        const el = elementsRef.current[i]
        if (el) {
          // Transformación: Centrado relativo y luego posicionamiento en (x,y)
          el.style.transform = `translate(-50%, -50%) translate(${node.x}px, ${node.y}px)`
          
          // Efecto sutil: inclinar mientras dejas arrastrar (opcional, pero mejora la interactividad)
          if (draggingId === node.id) {
            const tiltX = Math.min(Math.max(node.vx * 1.5, -45), 45);
            el.style.transform += ` rotate(${tiltX}deg) scale(1.2)`;
          }
        }
      })

      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animationFrameId)
  }, [skills])

  // Lógica global del mouse (para no perder el agarre si el cursor es muy rápido)
  useEffect(() => {
    const handleMove = (e) => {
      if (physicsRef.current.draggingId !== null) {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        physicsRef.current.mouseX = e.clientX - centerX
        physicsRef.current.mouseY = e.clientY - centerY
      }
    }
    const handleUp = () => {
      if (physicsRef.current.draggingId !== null) {
        const i = physicsRef.current.draggingId;
        if (elementsRef.current[i]) elementsRef.current[i].style.zIndex = '';
        physicsRef.current.draggingId = null
        document.body.style.cursor = 'auto'
      }
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }
  }, [])

  return (
    <div ref={containerRef} className="physics-container">
      {skills.map((item, i) => (
        <div
          key={item.label}
          ref={el => elementsRef.current[i] = el}
          className="physics-orbit-icon"
          onPointerDown={(e) => {
            e.preventDefault() // previene arrastre fantasma de imágenes
            const rect = containerRef.current.getBoundingClientRect()
            physicsRef.current.mouseX = e.clientX - (rect.left + rect.width / 2)
            physicsRef.current.mouseY = e.clientY - (rect.top + rect.height / 2)
            physicsRef.current.draggingId = i
            document.body.style.cursor = 'grabbing'
            if (elementsRef.current[i]) elementsRef.current[i].style.zIndex = 100;
          }}
        >
          <img src={item.icon} alt={item.label} style={item.scale ? { transform: `scale(${item.scale})` } : undefined} draggable="false" />
          <span className="orbit-tooltip">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
