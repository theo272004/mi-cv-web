import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import './App.css'
import PhysicsOrbits from './PhysicsOrbits'

const RobotCanvas = lazy(() => import('./RobotMateo'))
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const skills = [
  {
    icon: '🤖',
    name: 'IA aplicada',
    tags: ['LangGraph', 'Ollama', 'Agentes IA', 'RAG', 'Visión Artificial'],
  },
  {
    icon: '⚙️',
    name: 'Automatización industrial',
    tags: ['PLC', 'HMI', 'Control de procesos', 'Puesta en marcha', 'Diagnóstico técnico'],
  },
  {
    icon: '🔗',
    name: 'Integración de sistemas',
    tags: ['n8n', 'APIs REST', 'Webhooks', 'Workflows', 'Excel / Power BI'],
  },
  {
    icon: '💻',
    name: 'Desarrollo',
    tags: ['Python', 'React', 'C++', 'SQL', 'MySQL', 'MATLAB'],
  },
]

const orbitSkills = [
  { label: 'PLC', icon: 'https://cdn.simpleicons.org/siemens/009999', radius: 250, speed: 24, delay: 0, scale: 2.2 },
  { label: 'SolidWorks', icon: assetUrl('img/solidworks.png'), radius: 250, speed: 26, delay: 2.5, scale: 1.22 },
  { label: 'HMI', icon: 'https://cdn.simpleicons.org/electron/47848F', radius: 250, speed: 22, delay: 5 },
  { label: 'Visión IA', icon: 'https://cdn.simpleicons.org/opencv/5C3EE8', radius: 250, speed: 28, delay: 7.5 },
  { label: 'n8n', icon: 'https://cdn.simpleicons.org/n8n/EA4E43', radius: 330, speed: 32, delay: 0 },
  { label: 'APIs REST', icon: 'https://cdn.simpleicons.org/postman/FF6C37', radius: 330, speed: 30, delay: 3 },
  { label: 'Power BI', icon: assetUrl('img/powerbi.svg'), radius: 330, speed: 36, delay: 6 },
  { label: 'SQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1', radius: 330, speed: 34, delay: 9 },
  { label: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB', radius: 410, speed: 42, delay: 0 },
  { label: 'LLMs', icon: 'https://cdn.simpleicons.org/huggingface/FFD21E', radius: 410, speed: 44, delay: 4 },
  { label: 'Ollama', icon: 'https://cdn.simpleicons.org/ollama/FFFFFF', radius: 410, speed: 46, delay: 8 },
  { label: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', radius: 410, speed: 40, delay: 12 },
]

const stimoImages = [
  assetUrl('img/stimo/stimo-1.jpg'),
  assetUrl('img/stimo/stimo-2.jpg'),
  assetUrl('img/stimo/stimo-3.jpg'),
  assetUrl('img/stimo/stimo-4.jpg'),
  assetUrl('img/stimo/stimo-5.jpg'),
  assetUrl('img/stimo/stimo-6.jpg'),
  assetUrl('img/stimo/stimo-7.jpg'),
  assetUrl('img/stimo/stimo-8.jpg'),
  assetUrl('img/stimo/stimo-9.jpg'),
]

const autotriggerImages = [
  assetUrl('img/projects/autotrigger-setup.jpg'),
  assetUrl('img/projects/autotrigger-visual.jpg'),
]

const launchImages = [
  assetUrl('img/projects/launchassistpy-visual.jpg'),
  assetUrl('img/projects/launchassistpy-gesture.jpg'),
]

const cvFile = assetUrl('certificados/CV_Mateo_David_Castro_Villegas.pdf')

const certificates = [
  { title: 'DNDA-145 Software Autotrigger', file: assetUrl('certificados/DNDA-145_Software_Autotrigger_Registro.pdf') },
  { title: 'DNDA-146 Software LaunchAssistPy', file: assetUrl('certificados/DNDA-146_Software_LaunchAssistPy_Registro.pdf') },
  { title: 'DNDA-172 Software STIMO', file: assetUrl('certificados/DNDA-172_Software_STIMO_Registro.pdf') },
  { title: 'SENA · Bases de Datos con MySQL', file: assetUrl('certificados/Certificado_SENA_Bases-de-Datos-MySQL.pdf') },
]

const highlights = [
  { value: '3', label: 'softwares registrados ante la DNDA' },
  { value: 'B2', label: 'inglés técnico para documentación y coordinación' },
  { value: 'End-to-end', label: 'integración real entre software, datos y operación' },
]

const focusAreas = [
  {
    title: 'Automatización con criterio de negocio',
    text: 'Diseño soluciones que conectan operación, software y control sin perder claridad técnica ni foco comercial.',
  },
  {
    title: 'IA útil, no decorativa',
    text: 'Trabajo con agentes, visión artificial y flujos automatizados donde la IA reduce tiempo, error y fricción real.',
  },
  {
    title: 'Perfil híbrido difícil de reemplazar',
    text: 'Combino mecatrónica, integración de datos y desarrollo para mover proyectos desde la idea hasta la implementación.',
  },
]

const experience = [
  {
    key: 'farm',
    role: 'Ingeniero de Automatización & Mantenimiento',
    date: 'Oct 2024 – Abr 2025',
    company: 'Farmacápsulas · Barranquilla, Colombia · Contrato término fijo',
    image: assetUrl('img/experience/farmacapsulas-plc.jpg'),
    caption: 'Implementación y pruebas de automatización PLC/HMI en línea de producción.',
    bullets: [
      'Automatización end-to-end del sistema completo de fabricación de Superflux: lógica PLC, integración HMI y puesta en marcha.',
      'Enlace técnico entre equipos internos y representantes internacionales (Syntegon, Bosch) para instalación de maquinaria nueva.',
      'Elaboración de informes técnicos, registros operativos y tableros de KPIs para decisiones del equipo de operaciones.',
      'Diagnóstico y resolución autónoma de fallas complejas mecánicas, eléctricas y electrónicas.',
      'Cronogramas de mantenimiento preventivo y correctivo que redujeron tiempos de inactividad en producción crítica.',
    ],
  },
  {
    key: 'datafacta',
    role: 'Co-founder · Datafacta',
    date: 'Producto en producción',
    company: 'Datafacta · Solución para PyMEs · Sistema de gestión de facturas v2.5',
    image: assetUrl('img/experience/datafacta-team.jpg'),
    caption: 'Presentación de Datafacta como solución tecnológica para MYPES.',
    bullets: [
      'Co-fundé una plataforma de escaneo y estructuración de documentos financieros para MYPES en Colombia.',
      'Atacamos procesos manuales sin trazabilidad, reduciendo reprocesos, tiempos operativos y fricción en la toma de decisiones.',
      'Diseñé el flujo completo de diagnóstico, validación y estructuración automática de facturas y comprobantes.',
      'Implementé procesamiento en tiempo real con exportación directa a Excel y sistemas contables, más panel analítico para seguimiento operativo.',
    ],
  },
]

const projectCards = [
  {
    key: 'autotrigger',
    number: '01',
    badge: 'DNDA',
    title: 'Software Autotrigger',
    desc: 'Firmware en ESP32 que convierte comandos seriales en movimiento físico del lanzador y activación de disparo.',
    image: autotriggerImages,
    onOpen: 'autotrigger',
  },
  {
    key: 'launch',
    number: '02',
    badge: 'DNDA',
    title: 'LaunchAssistPy',
    desc: 'Interfaz de visión artificial que traduce gestos de manos en comandos de control para el lanzador.',
    image: launchImages,
    onOpen: 'launch',
  },
  {
    key: 'stimo',
    number: '03',
    badge: 'DNDA',
    title: 'STIMO',
    desc: 'Dispositivo mecatrónico posoperatorio con termoterapia, TENS/EMS y monitoreo del ángulo de flexión en tiempo real.',
    image: stimoImages,
    onOpen: 'stimo',
  },
]

function App() {
  const [stimoIndex, setStimoIndex] = useState(0)
  const [autotriggerIndex, setAutotriggerIndex] = useState(0)
  const [launchIndex, setLaunchIndex] = useState(0)
  const [stimoExpanded, setStimoExpanded] = useState(false)
  const [autotriggerExpanded, setAutotriggerExpanded] = useState(false)
  const [launchExpanded, setLaunchExpanded] = useState(false)
  const [expOpen, setExpOpen] = useState({ farm: true, datafacta: false })
  const [skillOpen, setSkillOpen] = useState({ 'IA aplicada': true })
  const [showRobot, setShowRobot] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  const closeNav = () => setNavOpen(false)
  const openProject = (projectKey) => {
    if (projectKey === 'autotrigger') setAutotriggerExpanded(true)
    if (projectKey === 'launch') setLaunchExpanded(true)
    if (projectKey === 'stimo') setStimoExpanded(true)
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const stimoTimer = setInterval(() => setStimoIndex((prev) => (prev + 1) % stimoImages.length), 2500)
    const autotriggerTimer = setInterval(() => setAutotriggerIndex((prev) => (prev + 1) % autotriggerImages.length), 3000)
    const launchTimer = setInterval(() => setLaunchIndex((prev) => (prev + 1) % launchImages.length), 2800)

    return () => {
      clearInterval(stimoTimer)
      clearInterval(autotriggerTimer)
      clearInterval(launchTimer)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeNav()
        setStimoExpanded(false)
        setAutotriggerExpanded(false)
        setLaunchExpanded(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const scheduleRobot = () => setShowRobot(true)

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(scheduleRobot, { timeout: 1200 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timer = window.setTimeout(scheduleRobot, 350)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.12 }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const featuredProjects = useMemo(
    () => ({
      autotrigger: { images: autotriggerImages, index: autotriggerIndex, setIndex: setAutotriggerIndex },
      launch: { images: launchImages, index: launchIndex, setIndex: setLaunchIndex },
      stimo: { images: stimoImages, index: stimoIndex, setIndex: setStimoIndex },
    }),
    [autotriggerIndex, launchIndex, stimoIndex]
  )

  const nextStimo = () => setStimoIndex((prev) => (prev + 1) % stimoImages.length)
  const prevStimo = () => setStimoIndex((prev) => (prev - 1 + stimoImages.length) % stimoImages.length)
  const nextAutotrigger = () => setAutotriggerIndex((prev) => (prev + 1) % autotriggerImages.length)
  const prevAutotrigger = () => setAutotriggerIndex((prev) => (prev - 1 + autotriggerImages.length) % autotriggerImages.length)
  const nextLaunch = () => setLaunchIndex((prev) => (prev + 1) % launchImages.length)
  const prevLaunch = () => setLaunchIndex((prev) => (prev - 1 + launchImages.length) % launchImages.length)

  return (
    <>
      <nav aria-label="Navegación principal">
        <a href="#" className="nav-logo">MCV</a>
        <ul className="nav-links">
          <li><a href="#skills">Capacidades</a></li>
          <li><a href="#experience">Experiencia</a></li>
          <li><a href="#projects">Proyectos</a></li>
          <li><a href="#education">Formación</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
        <div className="nav-social">
          <a href="https://github.com/theo272004" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.162 19.49c.5.092.682-.217.682-.48c0-.236-.009-.865-.014-1.697c-2.776.603-3.362-1.338-3.362-1.338c-.455-1.157-1.11-1.466-1.11-1.466c-.908-.62.069-.607.069-.607c1.004.07 1.532 1.032 1.532 1.032c.892 1.53 2.341 1.088 2.91.832c.092-.646.35-1.088.636-1.338c-2.217-.252-4.549-1.108-4.549-4.933c0-1.09.39-1.982 1.029-2.68c-.103-.252-.446-1.268.097-2.643c0 0 .84-.269 2.75 1.024A9.56 9.56 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.293 2.748-1.024 2.748-1.024c.544 1.375.201 2.391.098 2.643c.64.698 1.028 1.59 1.028 2.68c0 3.834-2.336 4.678-4.56 4.925c.359.31.678.923.678 1.86c0 1.343-.012 2.427-.012 2.757c0 .266.18.576.688.479A10 10 0 0 0 12 2"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/mateo-castro-villegas-84b738340" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 18.34V10.8H5.83v7.54zM7.09 9.77a1.45 1.45 0 1 0 0-2.9a1.45 1.45 0 0 0 0 2.9m11.25 8.57v-4.12c0-2.21-1.18-3.24-2.76-3.24c-1.27 0-1.84.7-2.16 1.2v-1.03h-2.51c.03.68 0 7.19 0 7.19h2.51v-4.02c0-.21.02-.42.08-.57c.17-.42.55-.86 1.2-.86c.85 0 1.19.65 1.19 1.6v3.85z"/></svg>
          </a>
        </div>
        <button
          className={navOpen ? 'nav-hamburger open' : 'nav-hamburger'}
          type="button"
          aria-label={navOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={navOpen}
          aria-controls="mobile-navigation"
          onClick={() => setNavOpen((value) => !value)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      <div id="mobile-navigation" className={navOpen ? 'nav-mobile open' : 'nav-mobile'}>
        <a href="#skills" onClick={closeNav}>Capacidades</a>
        <a href="#experience" onClick={closeNav}>Experiencia</a>
        <a href="#projects" onClick={closeNav}>Proyectos</a>
        <a href="#education" onClick={closeNav}>Formación</a>
        <a href="#contact" onClick={closeNav}>Contacto</a>
      </div>

      <main>
      <header className="hero-shell">
        <div className="hero">
          <div className="hero-left reveal visible">
            <div className="hero-kicker-wrap">
              <span className="status-pill"><span className="status-dot"></span>Disponible para proyectos remotos</span>
              <span className="hero-tag">Barranquilla, Colombia</span>
            </div>
            <p className="eyebrow">Automation · AI · Industrial Systems</p>
            <h1 className="hero-name">
              Mateo Castro Villegas
            </h1>
            <p className="hero-title">Ingeniero mecatrónico que conecta automatización, IA y software para resolver operación real.</p>
            <p className="hero-desc">
              Diseño soluciones end-to-end donde PLCs, visión artificial, agentes LLM, integración de datos y desarrollo trabajan como un solo sistema.
              Mi foco no es solo construir tecnología: es hacerla útil, medible y lista para operación.
            </p>

            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary">Hablemos</a>
              <a href="#projects" className="btn btn-ghost">Ver proyectos</a>
              <a href={cvFile} target="_blank" rel="noreferrer" className="btn btn-ghost">Descargar CV</a>
            </div>

            <div className="hero-proof-grid reveal">
              {highlights.map((item) => (
                <div className="hero-proof-card" key={item.label}>
                  <span className="hero-proof-value">{item.value}</span>
                  <span className="hero-proof-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right reveal">
            <div className="hero-visual-panel">
              <div className="hero-panel-copy">
                <span className="panel-eyebrow">Stack principal</span>
                <h2>Software, control y operación en la misma conversación.</h2>
                <p>Una combinación poco común para productos técnicos, automatización industrial y sistemas asistidos por IA.</p>
              </div>
              <div className="circuit-container">
                <div className="circuit-ring"></div>
                <div className="circuit-ring"></div>
                <div className="circuit-ring"></div>
                <div className="circuit-center">
                  <div className="robot-shell" style={{ width: '280px', height: '280px', pointerEvents: 'auto' }}>
                    {showRobot ? (
                      <Suspense fallback={<div className="robot-loading">Cargando visual...</div>}>
                        <RobotCanvas />
                      </Suspense>
                    ) : (
                      <div className="robot-loading">Cargando visual...</div>
                    )}
                  </div>
                </div>
                <PhysicsOrbits skills={orbitSkills} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="summary-strip reveal">
        <div className="summary-intro">
          <span className="section-num">00</span>
          <div>
            <h2>Perfil orientado a ejecución</h2>
            <p>No solo documento capacidades: muestro un perfil que puede diseñar, integrar, probar y poner a funcionar soluciones técnicas completas.</p>
          </div>
        </div>
        <div className="summary-grid">
          {focusAreas.map((area) => (
            <article className="summary-card" key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="skills">
        <div className="section-header reveal"><span className="section-num">01</span><h2 className="section-title">Capacidades clave</h2><div className="section-line"></div></div>
        <div className="section-lead reveal">
          <p>Estas son las áreas donde más valor puedo aportar hoy: automatización industrial, IA aplicada, integración técnica y desarrollo orientado a resultados.</p>
        </div>
        <div className="skills-grid reveal">
          {skills.map((skill) => {
            const isOpen = !!skillOpen[skill.name]
            return (
              <div className={isOpen ? 'skill-card open' : 'skill-card'} key={skill.name}>
                <button className="skill-toggle" onClick={() => setSkillOpen((prev) => ({ ...prev, [skill.name]: !prev[skill.name] }))}>
                  <span className="skill-icon">{skill.icon}</span>
                  <div>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-summary">{skill.tags.slice(0, 3).join(' · ')}</span>
                  </div>
                  <span className={isOpen ? 'skill-arrow open' : 'skill-arrow'}>▾</span>
                </button>
                {isOpen && (
                  <div className="skill-tags">
                    {skill.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section id="experience" className="section-bordered">
        <div className="section-header reveal"><span className="section-num">02</span><h2 className="section-title">Experiencia relevante</h2><div className="section-line"></div></div>
        <div className="experience-stack">
          {experience.map((item) => (
            <article className="exp-panel reveal" key={item.key}>
              <div className="exp-top-row">
                <div>
                  <div className="exp-role">{item.role}</div>
                  <div className="exp-company">{item.company}</div>
                </div>
                <div className="exp-date">{item.date}</div>
              </div>
              <figure className="exp-photo">
                <img src={item.image} alt={item.caption} loading="lazy" />
                <figcaption>{item.caption}</figcaption>
              </figure>
              <button className="exp-toggle" onClick={() => setExpOpen((p) => ({ ...p, [item.key]: !p[item.key] }))}>
                <span className={expOpen[item.key] ? 'exp-arrow open' : 'exp-arrow'}>▾</span>
                {expOpen[item.key] ? 'Ocultar detalles' : 'Ver detalles'}
              </button>
              {expOpen[item.key] && (
                <ul className="exp-bullets">
                  {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section-bordered">
        <div className="section-header reveal"><span className="section-num">03</span><h2 className="section-title">Proyectos seleccionados</h2><div className="section-line"></div></div>
        <div className="section-lead reveal">
          <p>Casos donde combiné hardware, software, control o visión artificial para construir soluciones registradas y demostrables.</p>
        </div>
        <div className="projects-grid">
          {projectCards.map((project) => {
            const projectState = featuredProjects[project.onOpen]
            return (
              <article
                className="project-card reveal stimo-card"
                key={project.key}
                role="button"
                tabIndex={0}
                aria-label={`Abrir caso completo de ${project.title}`}
                onClick={() => openProject(project.onOpen)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openProject(project.onOpen)
                  }
                }}
              >
                <div className="project-num">{project.number}</div>
                <div className="project-badge">{project.badge}</div>
                <div className="project-title">{project.title}</div>
                <div className="project-desc">{project.desc}</div>
                <div className="stimo-carousel">
                  <img src={projectState.images[projectState.index]} alt={`${project.title} evidencia ${projectState.index + 1}`} loading="lazy" />
                  <div className="stimo-dots">
                    {projectState.images.map((_, i) => (
                      <button
                        key={i}
                        className={i === projectState.index ? 'dot active' : 'dot'}
                        onClick={(e) => {
                          e.stopPropagation()
                          projectState.setIndex(i)
                        }}
                        aria-label={`Ir a imagen ${i + 1}`}
                      ></button>
                    ))}
                  </div>
                </div>
                <small className="stimo-hint">Haz clic para abrir el caso completo</small>
              </article>
            )
          })}
        </div>
      </section>

      {autotriggerExpanded && (
        <div className="stimo-modal" role="dialog" aria-modal="true" aria-labelledby="autotrigger-title" onClick={() => setAutotriggerExpanded(false)}>
          <article className="stimo-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="stimo-modal-top">
              <h3 id="autotrigger-title">Software Autotrigger</h3>
              <button className="stimo-close" aria-label="Cerrar caso Autotrigger" onClick={() => setAutotriggerExpanded(false)}>✕</button>
            </div>
            <p>Firmware para ESP32 que recibe comandos seriales del sistema de visión y los convierte en movimiento real del lanzador: base, elevación y disparo.</p>
            <h4 className="stimo-subtitle">Qué resuelve</h4>
            <div className="stimo-kpis">
              <span>Motor DC + puente H para movimiento horizontal</span>
              <span>Servomotor para elevación del cañón</span>
              <span>Relé para activar disparo</span>
              <span>Interpretación de tramas como B90Y75F1</span>
            </div>
            <h4 className="stimo-subtitle">Tecnologías</h4>
            <div className="stimo-tech">
              <span>C++</span><span>Arduino IDE</span><span>ESP32Servo</span><span>PWM ESP32</span><span>Serial USB</span>
            </div>
            <div className="stimo-gallery-large">
              <button onClick={prevAutotrigger} aria-label="Imagen anterior">‹</button>
              <img src={autotriggerImages[autotriggerIndex]} alt={`Autotrigger evidencia ${autotriggerIndex + 1}`} />
              <button onClick={nextAutotrigger} aria-label="Siguiente imagen">›</button>
            </div>
            <div className="stimo-dots">
              {autotriggerImages.map((_, i) => (
                <button key={i} className={i === autotriggerIndex ? 'dot active' : 'dot'} onClick={() => setAutotriggerIndex(i)} aria-label={`Ir a imagen ${i + 1}`}></button>
              ))}
            </div>
          </article>
        </div>
      )}

      {launchExpanded && (
        <div className="stimo-modal" role="dialog" aria-modal="true" aria-labelledby="launch-title" onClick={() => setLaunchExpanded(false)}>
          <article className="stimo-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="stimo-modal-top">
              <h3 id="launch-title">LaunchAssistPy</h3>
              <button className="stimo-close" aria-label="Cerrar caso LaunchAssistPy" onClick={() => setLaunchExpanded(false)}>✕</button>
            </div>
            <p>Interfaz inteligente del sistema: usa visión artificial para detectar manos y convertir gestos en comandos de control para el lanzador en tiempo real.</p>
            <h4 className="stimo-subtitle">Pipeline</h4>
            <div className="stimo-kpis">
              <span>Cámara captura video en tiempo real</span>
              <span>Detección de manos y cálculo de punto medio</span>
              <span>Conversión a coordenadas y ángulos de movimiento</span>
              <span>Envío serial al ESP32 + gesto de disparo</span>
            </div>
            <h4 className="stimo-subtitle">Tecnologías</h4>
            <div className="stimo-tech">
              <span>Python 3</span><span>OpenCV</span><span>MediaPipe</span><span>NumPy</span><span>pySerial</span><span>Logging</span>
            </div>
            <div className="stimo-gallery-large">
              <button onClick={prevLaunch} aria-label="Imagen anterior">‹</button>
              <img src={launchImages[launchIndex]} alt={`LaunchAssistPy evidencia ${launchIndex + 1}`} />
              <button onClick={nextLaunch} aria-label="Siguiente imagen">›</button>
            </div>
            <div className="stimo-dots">
              {launchImages.map((_, i) => (
                <button key={i} className={i === launchIndex ? 'dot active' : 'dot'} onClick={() => setLaunchIndex(i)} aria-label={`Ir a imagen ${i + 1}`}></button>
              ))}
            </div>
          </article>
        </div>
      )}

      {stimoExpanded && (
        <div className="stimo-modal" role="dialog" aria-modal="true" aria-labelledby="stimo-title" onClick={() => setStimoExpanded(false)}>
          <article className="stimo-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="stimo-modal-top">
              <h3 id="stimo-title">STIMO</h3>
              <button className="stimo-close" aria-label="Cerrar caso STIMO" onClick={() => setStimoExpanded(false)}>✕</button>
            </div>
            <p>Dispositivo mecatrónico de rehabilitación posoperatoria que integra termoterapia, electroestimulación TENS/EMS y monitoreo del ángulo de flexión en tiempo real. Desarrollado con ESP32, sensores inerciales, control térmico e interfaz web, validado con pacientes y profesionales de salud.</p>
            <h4 className="stimo-subtitle">Datos clave</h4>
            <div className="stimo-kpis">
              <span>42–50 °C de rango térmico clínico</span>
              <span>15–20 min de estabilización térmica</span>
              <span>+9.32° de ganancia media de flexión</span>
              <span>3 pacientes en validación funcional</span>
            </div>
            <h4 className="stimo-subtitle">Tecnologías</h4>
            <div className="stimo-tech">
              <span>ESP32</span><span>MPU6050</span><span>MAX6675</span><span>TENS/EMS</span><span>Web UI</span><span>Registro de datos</span>
            </div>
            <h4 className="stimo-subtitle">Mi aporte</h4>
            <div className="stimo-kpis">
              <span>Diseño del sistema mecatrónico y arquitectura funcional</span>
              <span>Integración electrónica y configuración terapéutica</span>
              <span>Monitoreo de flexión y registro de datos</span>
              <span>Pruebas piloto, ajustes técnicos y soporte en validación clínica</span>
            </div>
            <div className="stimo-gallery-large">
              <button onClick={prevStimo} aria-label="Imagen anterior">‹</button>
              <img src={stimoImages[stimoIndex]} alt={`STIMO evidencia ${stimoIndex + 1}`} />
              <button onClick={nextStimo} aria-label="Siguiente imagen">›</button>
            </div>
            <div className="stimo-dots">
              {stimoImages.map((_, i) => (
                <button key={i} className={i === stimoIndex ? 'dot active' : 'dot'} onClick={() => setStimoIndex(i)} aria-label={`Ir a imagen ${i + 1}`}></button>
              ))}
            </div>
          </article>
        </div>
      )}

      <section id="education" className="section-bordered">
        <div className="section-header reveal"><span className="section-num">04</span><h2 className="section-title">Formación y credenciales</h2><div className="section-line"></div></div>
        <div className="edu-grid">
          <div className="edu-card reveal"><div className="edu-year">2025</div><div className="edu-degree">Ingeniería Mecatrónica</div><div className="edu-institution">Universidad Autónoma del Caribe</div></div>
          <div className="edu-card reveal"><div className="edu-year">2024</div><div className="edu-degree">Investigador Junior</div><div className="edu-institution">Universidad Autónoma del Caribe</div></div>
          <div className="edu-card reveal"><div className="edu-year">2025</div><div className="edu-degree">Bases de Datos con MySQL</div><div className="edu-institution">SENA</div></div>
          <div className="edu-card reveal"><div className="edu-year">2025</div><div className="edu-degree">Curso de liderazgo organizacional</div><div className="edu-institution">CorFomento / Astilleros Centro Cultural</div></div>
          <div className="edu-card reveal"><div className="edu-year">2020</div><div className="edu-degree">Bachiller Académico</div><div className="edu-institution">Nuevo Colegio del Prado</div></div>
          <div className="edu-card reveal"><div className="edu-year">Idiomas</div><div className="edu-degree">Español nativo · Inglés B2</div><div className="edu-institution">Documentación técnica y trabajo internacional</div></div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <div className="reveal">
            <span className="panel-eyebrow">Contacto</span>
            <div className="contact-headline">Listo para construir soluciones técnicas con impacto real.</div>
            <p className="contact-text">Si necesitas a alguien que pueda moverse entre automatización, software, datos e IA sin perder claridad operativa, aquí tienes mis enlaces directos y mi CV actualizado.</p>
            <div className="hero-cta">
              <a href="mailto:mateodcvnew@gmail.com" className="btn btn-primary">Escribir ahora</a>
              <a href="https://github.com/theo272004" target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub</a>
              <a href={cvFile} target="_blank" rel="noreferrer" className="btn btn-ghost">Descargar CV</a>
            </div>
          </div>

          <div className="contact-links reveal">
            <a href="mailto:mateodcvnew@gmail.com" className="contact-link"><span className="contact-link-icon">✉</span><span className="contact-link-text">mateodcvnew@gmail.com</span></a>
            <a href="tel:+573024137347" className="contact-link"><span className="contact-link-icon">📱</span><span className="contact-link-text">+57 302 413 7347</span></a>
            <a href="https://www.linkedin.com/in/mateo-castro-villegas-84b738340" target="_blank" rel="noreferrer" className="contact-link"><span className="contact-link-icon">in</span><span className="contact-link-text">LinkedIn</span></a>
          </div>
        </div>

        <div className="downloads reveal">
          <h3 className="downloads-title">Certificados y registros</h3>
          <div className="downloads-grid">
            {certificates.map((c) => (
              <a className="download-chip" key={c.title} href={c.file} target="_blank" rel="noreferrer">
                <span>⬇</span>
                <span>{c.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      </main>

      <footer>
        <span className="footer-text">© 2026 <span className="footer-accent">Mateo David Castro Villegas</span></span>
        <span className="footer-text">Automation & AI Engineer · Ingeniero Mecatrónico</span>
      </footer>
    </>
  )
}

export default App
