import { useEffect, useState } from 'react'
import './App.css'

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const skills = [
  {
    icon: '🤖',
    name: 'IA & LLMs',
    tags: ['LangGraph', 'Ollama', 'Agentes IA', 'RAG'],
  },
  {
    icon: '⚡',
    name: 'Automatización',
    tags: ['n8n', 'API REST', 'Webhooks', 'Workflows', 'Integraciones'],
  },
  {
    icon: '💻',
    name: 'Programación',
    tags: ['Python', 'SQL', 'C++', 'React', 'MATLAB', 'MySQL'],
  },
  {
    icon: '🏭',
    name: 'Sistemas Industriales',
    tags: ['PLCs', 'HMI', 'Control de Procesos', 'Mecatrónica', 'SolidWorks'],
  },
  {
    icon: '🔌',
    name: 'Electrónica & IoT',
    tags: ['Electrónica analógica/digital', 'Microcontroladores', 'IoT', 'Sensórica', 'Integración HW/SW'],
  },
  {
    icon: '🛠️',
    name: 'Mecánica aplicada',
    tags: ['Diagnóstico mecánico', 'Montaje y ajuste', 'Mantenimiento mecánico', 'Lectura de planos'],
  },
  {
    icon: '👁️',
    name: 'Visión Artificial',
    tags: ['Computer Vision', 'IA Aplicada', 'Inspección Visual'],
  },
  {
    icon: '📊',
    name: 'Gestión Técnica',
    tags: ['Excel', 'Power BI', 'KPIs', 'Reportes', 'Mantenimiento', 'Documentación'],
  },
]

const orbitSkills = [
  { label: 'Python', radius: 210, speed: 16, delay: 0 },
  { label: 'APIs REST', radius: 210, speed: 20, delay: 2 },
  { label: 'LLMs', radius: 210, speed: 18, delay: 4 },
  { label: 'Ollama', radius: 210, speed: 22, delay: 6 },
  { label: 'PLC', radius: 260, speed: 24, delay: 1 },
  { label: 'HMI', radius: 260, speed: 28, delay: 3 },
  { label: 'n8n', radius: 260, speed: 26, delay: 5 },
  { label: 'Power BI', radius: 260, speed: 30, delay: 7 },
  { label: 'SQL', radius: 300, speed: 34, delay: 0 },
  { label: 'React', radius: 300, speed: 32, delay: 2.5 },
  { label: 'Visión IA', radius: 300, speed: 36, delay: 5 },
  { label: 'SolidWorks', radius: 300, speed: 38, delay: 7.5 },
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

const launchImages = [
  assetUrl('img/projects/launchassistpy-visual.jpg'),
  assetUrl('img/projects/launchassistpy-gesture.jpg'),
]

const certificates = [
  { title: 'CV - Mateo David Castro Villegas', file: assetUrl('certificados/CV_Mateo_David_Castro_Villegas.pdf') },
  { title: 'DNDA-145 Software Autotrigger', file: assetUrl('certificados/DNDA-145_Software_Autotrigger_Registro.pdf') },
  { title: 'DNDA-146 Software LaunchAssistPy', file: assetUrl('certificados/DNDA-146_Software_LaunchAssistPy_Registro.pdf') },
  { title: 'DNDA-172 Software STIMO', file: assetUrl('certificados/DNDA-172_Software_STIMO_Registro.pdf') },
  { title: 'SENA - Bases de Datos con MySQL', file: assetUrl('certificados/Certificado_SENA_Bases-de-Datos-MySQL.pdf') },
]

function App() {
  const [stimoIndex, setStimoIndex] = useState(0)
  const [launchIndex, setLaunchIndex] = useState(0)
  const [stimoExpanded, setStimoExpanded] = useState(false)
  const [autotriggerExpanded, setAutotriggerExpanded] = useState(false)
  const [launchExpanded, setLaunchExpanded] = useState(false)
  const [expOpen, setExpOpen] = useState({ farm: false, datafacta: false })
  const [skillOpen, setSkillOpen] = useState({})

  useEffect(() => {
    const stimoTimer = setInterval(() => {
      setStimoIndex((prev) => (prev + 1) % stimoImages.length)
    }, 2500)

    const launchTimer = setInterval(() => {
      setLaunchIndex((prev) => (prev + 1) % launchImages.length)
    }, 2800)

    return () => {
      clearInterval(stimoTimer)
      clearInterval(launchTimer)
    }
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

  const nextStimo = () => setStimoIndex((prev) => (prev + 1) % stimoImages.length)
  const prevStimo = () => setStimoIndex((prev) => (prev - 1 + stimoImages.length) % stimoImages.length)
  const nextLaunch = () => setLaunchIndex((prev) => (prev + 1) % launchImages.length)
  const prevLaunch = () => setLaunchIndex((prev) => (prev - 1 + launchImages.length) % launchImages.length)

  return (
    <>
      <nav>
        <a href="#" className="nav-logo">MCV</a>
        <ul className="nav-links">
          <li><a href="#skills">Habilidades</a></li>
          <li><a href="#experience">Experiencia</a></li>
          <li><a href="#projects">Proyectos</a></li>
          <li><a href="#education">Educación</a></li>
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
      </nav>

      <div className="hero">
        <div className="scanline"></div>
        <div className="hero-left">
          <div className="status-pill"><span className="status-dot"></span>Disponible para proyectos remotos</div>
          <span className="hero-tag">Barranquilla, Colombia</span>
          <h1 className="hero-name">
            <span className="line1">MATEO</span>
            <span className="line2">CASTRO</span>
            <span className="line3">VILLEGAS</span>
          </h1>
          <p className="hero-title">AUTOMATION & AI ENGINEER · INGENIERO MECATRÓNICO</p>
          <p className="hero-desc">
            Diseño y construyo automatizaciones end-to-end que conectan inteligencia artificial,
            sistemas industriales y software. Desde PLCs hasta agentes LLM — hago que las máquinas
            y los datos trabajen juntos de manera inteligente.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">Contactar ↗</a>
            <a href="#projects" className="btn btn-ghost">Ver proyectos</a>
            <a href="https://github.com/theo272004" target="_blank" rel="noreferrer" className="btn btn-icon" aria-label="GitHub" title="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.162 19.49c.5.092.682-.217.682-.48c0-.236-.009-.865-.014-1.697c-2.776.603-3.362-1.338-3.362-1.338c-.455-1.157-1.11-1.466-1.11-1.466c-.908-.62.069-.607.069-.607c1.004.07 1.532 1.032 1.532 1.032c.892 1.53 2.341 1.088 2.91.832c.092-.646.35-1.088.636-1.338c-2.217-.252-4.549-1.108-4.549-4.933c0-1.09.39-1.982 1.029-2.68c-.103-.252-.446-1.268.097-2.643c0 0 .84-.269 2.75 1.024A9.56 9.56 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.293 2.748-1.024 2.748-1.024c.544 1.375.201 2.391.098 2.643c.64.698 1.028 1.59 1.028 2.68c0 3.834-2.336 4.678-4.56 4.925c.359.31.678.923.678 1.86c0 1.343-.012 2.427-.012 2.757c0 .266.18.576.688.479A10 10 0 0 0 12 2"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/mateo-castro-villegas-84b738340" target="_blank" rel="noreferrer" className="btn btn-icon" aria-label="LinkedIn" title="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 18.34V10.8H5.83v7.54zM7.09 9.77a1.45 1.45 0 1 0 0-2.9a1.45 1.45 0 0 0 0 2.9m11.25 8.57v-4.12c0-2.21-1.18-3.24-2.76-3.24c-1.27 0-1.84.7-2.16 1.2v-1.03h-2.51c.03.68 0 7.19 0 7.19h2.51v-4.02c0-.21.02-.42.08-.57c.17-.42.55-.86 1.2-.86c.85 0 1.19.65 1.19 1.6v3.85z"/></svg>
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="circuit-container">
            <div className="circuit-ring"></div>
            <div className="circuit-ring"></div>
            <div className="circuit-ring"></div>
            <div className="circuit-center">
              <div className="circuit-core">
                <span className="circuit-icon">⚙️</span>
                <span className="circuit-label">Mecatrónico</span>
              </div>
            </div>

            {orbitSkills.map((item) => (
              <div
                key={item.label}
                className="orbit"
                style={{ '--radius': `${item.radius}px`, '--speed': `${item.speed}s`, '--delay': `-${item.delay}s` }}
              >
                <span className="orbit-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item reveal"><span className="stat-num">3</span><span className="stat-label">Softwares registrados DNDA</span></div>
        <div className="stat-item reveal"><span className="stat-num">B2</span><span className="stat-label">Inglés técnico</span></div>
      </div>

      <section id="skills">
        <div className="section-header reveal"><span className="section-num">01</span><h2 className="section-title">Habilidades</h2><div className="section-line"></div></div>
        <div className="skills-grid">
          {skills.map((skill) => {
            const isOpen = !!skillOpen[skill.name]
            return (
              <div className={isOpen ? 'skill-card reveal open' : 'skill-card reveal'} key={skill.name}>
                <button
                  className="skill-toggle"
                  onClick={() => setSkillOpen((prev) => ({ ...prev, [skill.name]: !prev[skill.name] }))}
                >
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
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
        <div className="section-header reveal"><span className="section-num">02</span><h2 className="section-title">Experiencia</h2><div className="section-line"></div></div>
        <div className="exp-panel reveal">
          <div className="exp-top-row">
            <div className="exp-role">Ingeniero de Automatización & Mantenimiento</div>
            <div className="exp-date">Oct 2024 – Abr 2025</div>
          </div>
          <div className="exp-company">Farmacápsulas · Barranquilla, Colombia · Contrato término fijo</div>
          <figure className="exp-photo">
            <img src={`${import.meta.env.BASE_URL}img/experience/farmacapsulas-plc.jpg`} alt="Tablero de automatización industrial en Farmacápsulas" loading="lazy" />
            <figcaption>Implementación y pruebas de automatización PLC/HMI en línea de producción.</figcaption>
          </figure>
          <button className="exp-toggle" onClick={() => setExpOpen((p) => ({ ...p, farm: !p.farm }))}>
            <span className={expOpen.farm ? 'exp-arrow open' : 'exp-arrow'}>▾</span>
            {expOpen.farm ? 'Ocultar detalles' : 'Ver más'}
          </button>
          {expOpen.farm && (
            <ul className="exp-bullets">
              <li>Automatización end-to-end del sistema completo de fabricación de Superflux — lógica PLC, integración HMI y puesta en marcha.</li>
              <li>Enlace técnico entre equipos internos y representantes internacionales (Syntegon, Bosch) para instalación de maquinaria nueva.</li>
              <li>Elaboración de informes técnicos, registros operativos y tableros de KPIs para decisiones del equipo de operaciones.</li>
              <li>Diagnóstico y resolución autónoma de fallas complejas: mecánicas, eléctricas y electrónicas.</li>
              <li>Cronogramas de mantenimiento preventivo/correctivo que redujeron tiempos de inactividad en producción crítica.</li>
            </ul>
          )}
        </div>

        <div className="exp-panel reveal">
          <div className="exp-top-row">
            <div className="exp-role">Co-founder · Datafacta</div>
            <div className="exp-date">Producto en producción</div>
          </div>
          <div className="exp-company">Datafacta · Solución para PyMEs (Sistema de Gestión de Facturas v2.5)</div>
          <figure className="exp-photo">
            <img src={`${import.meta.env.BASE_URL}img/experience/datafacta-team.jpg`} alt="Equipo Datafacta en evento de emprendimiento" loading="lazy" />
            <figcaption>Presentación de Datafacta como solución tecnológica para MYPES.</figcaption>
          </figure>
          <button className="exp-toggle" onClick={() => setExpOpen((p) => ({ ...p, datafacta: !p.datafacta }))}>
            <span className={expOpen.datafacta ? 'exp-arrow open' : 'exp-arrow'}>▾</span>
            {expOpen.datafacta ? 'Ocultar detalles' : 'Ver más'}
          </button>
          {expOpen.datafacta && (
            <ul className="exp-bullets">
              <li>Co-fundé una plataforma de escaneo y estructuración de documentos financieros para MYPES en Colombia.</li>
              <li>Atacamos procesos manuales sin trazabilidad (papel/digitalización manual), reduciendo reprocesos, tiempos operativos y fricción en la toma de decisiones.</li>
              <li>Diseñé el flujo completo de diagnóstico, validación y estructuración automática de facturas/comprobantes, sin infraestructura compleja ni intervención manual.</li>
              <li>Implementé procesamiento en tiempo real con exportación directa a Excel/sistemas contables y panel de control analítico para seguimiento operativo.</li>
            </ul>
          )}
        </div>
      </section>

      <section id="projects" className="section-bordered">
        <div className="section-header reveal"><span className="section-num">03</span><h2 className="section-title">Proyectos</h2><div className="section-line"></div></div>
        <div className="projects-grid">
          <div className="project-card reveal stimo-card" onClick={() => setAutotriggerExpanded(true)}>
            <div className="project-num">01</div>
            <div className="project-badge">DNDA</div>
            <div className="project-title">Software Autotrigger</div>
            <div className="project-desc">Firmware en ESP32 que convierte comandos seriales en movimiento físico del lanzador y activación de disparo.</div>
            <div className="stimo-carousel">
              <img src={`${import.meta.env.BASE_URL}img/projects/autotrigger-visual.jpg`} alt="Diagrama funcional de Autotrigger con ESP32 y control del lanzador" loading="lazy" />
            </div>
            <small className="stimo-hint">Toca este bloque para abrir el caso completo</small>
          </div>
          <div className="project-card reveal stimo-card" onClick={() => setLaunchExpanded(true)}>
            <div className="project-num">02</div>
            <div className="project-badge">DNDA</div>
            <div className="project-title">LaunchAssistPy</div>
            <div className="project-desc">Interfaz inteligente de visión artificial que traduce gestos de manos en comandos de control para el lanzador.</div>
            <div className="stimo-carousel">
              <img src={launchImages[launchIndex]} alt={`LaunchAssistPy evidencia ${launchIndex + 1}`} loading="lazy" />
              <div className="stimo-dots">
                {launchImages.map((_, i) => (
                  <button
                    key={i}
                    className={i === launchIndex ? 'dot active' : 'dot'}
                    onClick={(e) => { e.stopPropagation(); setLaunchIndex(i) }}
                    aria-label={`Ir a imagen ${i + 1}`}
                  ></button>
                ))}
              </div>
            </div>
            <small className="stimo-hint">Toca este bloque para abrir el caso completo</small>
          </div>
          <div className="project-card reveal stimo-card" onClick={() => setStimoExpanded(true)}>
            <div className="project-num">03</div>
            <div className="project-badge">DNDA</div>
            <div className="project-title">STIMO</div>
            <div className="project-desc">Dispositivo mecatrónico posoperatorio que integra termoterapia, TENS/EMS y monitoreo del ángulo de flexión en tiempo real.</div>
            <div className="stimo-carousel">
              <img src={stimoImages[stimoIndex]} alt={`STIMO evidencia ${stimoIndex + 1}`} />
              <div className="stimo-dots">
                {stimoImages.map((_, i) => (
                  <button
                    key={i}
                    className={i === stimoIndex ? 'dot active' : 'dot'}
                    onClick={(e) => { e.stopPropagation(); setStimoIndex(i) }}
                    aria-label={`Ir a imagen ${i + 1}`}
                  ></button>
                ))}
              </div>
            </div>
            <small className="stimo-hint">Toca este bloque para abrir el caso completo</small>
          </div>
        </div>

      </section>

      {autotriggerExpanded && (
        <div className="stimo-modal" onClick={() => setAutotriggerExpanded(false)}>
          <article className="stimo-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="stimo-modal-top">
              <h3>Software Autotrigger</h3>
              <button className="stimo-close" onClick={() => setAutotriggerExpanded(false)}>✕</button>
            </div>

            <p>
              Firmware para ESP32 que recibe comandos seriales del sistema de visión y los convierte
              en movimiento real del lanzador (base, elevación y disparo).
            </p>

            <h4 className="stimo-subtitle">Qué controla</h4>
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

            <div className="stimo-gallery-large single">
              <img src={`${import.meta.env.BASE_URL}img/projects/autotrigger-visual.jpg`} alt="Arquitectura del firmware Autotrigger" />
            </div>
          </article>
        </div>
      )}

      {launchExpanded && (
        <div className="stimo-modal" onClick={() => setLaunchExpanded(false)}>
          <article className="stimo-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="stimo-modal-top">
              <h3>LaunchAssistPy</h3>
              <button className="stimo-close" onClick={() => setLaunchExpanded(false)}>✕</button>
            </div>

            <p>
              Interfaz inteligente del sistema: usa visión artificial para detectar manos y convertir
              gestos en comandos de control para el lanzador en tiempo real.
            </p>

            <h4 className="stimo-subtitle">Pipeline</h4>
            <div className="stimo-kpis">
              <span>Cámara captura video en tiempo real</span>
              <span>Detección de manos y cálculo de punto medio</span>
              <span>Conversión a coordenadas/ángulos de movimiento</span>
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
                <button
                  key={i}
                  className={i === launchIndex ? 'dot active' : 'dot'}
                  onClick={() => setLaunchIndex(i)}
                  aria-label={`Ir a imagen ${i + 1}`}
                ></button>
              ))}
            </div>
          </article>
        </div>
      )}

      {stimoExpanded && (
        <div className="stimo-modal" onClick={() => setStimoExpanded(false)}>
          <article className="stimo-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="stimo-modal-top">
              <h3>STIMO</h3>
              <button className="stimo-close" onClick={() => setStimoExpanded(false)}>✕</button>
            </div>

            <p>
              Dispositivo mecatrónico de rehabilitación posoperatoria que integra termoterapia,
              electroestimulación TENS/EMS y monitoreo del ángulo de flexión en tiempo real.
              Desarrollado con ESP32, sensores inerciales, control térmico e interfaz web,
              validado con pacientes y profesionales de salud.
            </p>

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
              <span>Integración electrónica y configuración terapéutica (calor + TENS/EMS)</span>
              <span>Implementación de monitoreo de flexión y registro de datos</span>
              <span>Pruebas piloto, ajustes técnicos y soporte en validación clínica</span>
            </div>

            <div className="stimo-gallery-large">
              <button onClick={prevStimo} aria-label="Imagen anterior">‹</button>
              <img src={stimoImages[stimoIndex]} alt={`STIMO evidencia ${stimoIndex + 1}`} />
              <button onClick={nextStimo} aria-label="Siguiente imagen">›</button>
            </div>

            <div className="stimo-dots">
              {stimoImages.map((_, i) => (
                <button
                  key={i}
                  className={i === stimoIndex ? 'dot active' : 'dot'}
                  onClick={() => setStimoIndex(i)}
                  aria-label={`Ir a imagen ${i + 1}`}
                ></button>
              ))}
            </div>
          </article>
        </div>
      )}

      <section id="education" className="section-bordered">
        <div className="section-header reveal"><span className="section-num">04</span><h2 className="section-title">Educación</h2><div className="section-line"></div></div>
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
          <div>
            <div className="contact-headline reveal">Listo para <em>automatizar</em> con impacto real</div>
            <p className="contact-text reveal">También puedes descargar directamente tus certificados y CV desde aquí.</p>
            <div className="hero-cta reveal">
              <a href="mailto:mateodcvnew@gmail.com" className="btn btn-primary">Escribir ahora ↗</a>
              <a href="https://github.com/theo272004" target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub</a>
            </div>
          </div>

          <div className="contact-links reveal">
            <a href="mailto:mateodcvnew@gmail.com" className="contact-link"><span className="contact-link-icon">✉</span><span className="contact-link-text">mateodcvnew@gmail.com</span></a>
            <a href="tel:+573024137347" className="contact-link"><span className="contact-link-icon">📱</span><span className="contact-link-text">+57 302 413 7347</span></a>
            <a href="https://www.linkedin.com/in/mateo-castro-villegas-84b738340" target="_blank" rel="noreferrer" className="contact-link"><span className="contact-link-icon">in</span><span className="contact-link-text">LinkedIn</span></a>
          </div>
        </div>

        <div className="downloads">
          <h3 className="downloads-title">Descargar certificados y CV</h3>
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

      <footer>
        <span className="footer-text">© 2026 <span className="footer-accent">Mateo David Castro Villegas</span></span>
        <span className="footer-text">Automation & AI Engineer · Ingeniero Mecatrónico</span>
      </footer>
    </>
  )
}

export default App
