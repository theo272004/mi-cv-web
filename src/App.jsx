import { useEffect } from 'react'
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

const certificates = [
  { title: 'CV - Mateo David Castro Villegas', file: assetUrl('certificados/CV_Mateo_David_Castro_Villegas.pdf') },
  { title: 'DNDA-145 Software Autotrigger', file: assetUrl('certificados/DNDA-145_Software_Autotrigger_Registro.pdf') },
  { title: 'DNDA-146 Software LaunchAssistPy', file: assetUrl('certificados/DNDA-146_Software_LaunchAssistPy_Registro.pdf') },
  { title: 'DNDA-172 Software STIMO', file: assetUrl('certificados/DNDA-172_Software_STIMO_Registro.pdf') },
  { title: 'SENA - Bases de Datos con MySQL', file: assetUrl('certificados/Certificado_SENA_Bases-de-Datos-MySQL.pdf') },
]

function App() {
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
          <a href="https://github.com/theo272004" target="_blank" rel="noreferrer">⌥</a>
          <a href="https://www.linkedin.com/in/mateo-castro-villegas-84b738340" target="_blank" rel="noreferrer">in</a>
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
            <a href="https://github.com/theo272004" target="_blank" rel="noreferrer" className="btn btn-icon">⌥</a>
            <a href="https://www.linkedin.com/in/mateo-castro-villegas-84b738340" target="_blank" rel="noreferrer" className="btn btn-icon">in</a>
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
          {skills.map((skill) => (
            <div className="skill-card reveal" key={skill.name}>
              <span className="skill-icon">{skill.icon}</span>
              <div className="skill-name">{skill.name}</div>
              <div className="skill-tags">
                {skill.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
            </div>
          ))}
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
          <ul className="exp-bullets">
            <li>Automatización end-to-end del sistema completo de fabricación de Superflux — lógica PLC, integración HMI y puesta en marcha.</li>
            <li>Enlace técnico entre equipos internos y representantes internacionales (Syntegon, Bosch) para instalación de maquinaria nueva.</li>
            <li>Elaboración de informes técnicos, registros operativos y tableros de KPIs para decisiones del equipo de operaciones.</li>
            <li>Diagnóstico y resolución autónoma de fallas complejas: mecánicas, eléctricas y electrónicas.</li>
            <li>Cronogramas de mantenimiento preventivo/correctivo que redujeron tiempos de inactividad en producción crítica.</li>
          </ul>
        </div>
      </section>

      <section id="projects" className="section-bordered">
        <div className="section-header reveal"><span className="section-num">03</span><h2 className="section-title">Proyectos</h2><div className="section-line"></div></div>
        <div className="projects-grid">
          <div className="project-card reveal"><div className="project-num">01</div><div className="project-badge">DNDA</div><div className="project-title">Software Autotrigger</div><div className="project-desc">Automatización de tareas técnicas repetitivas en entorno industrial.</div></div>
          <div className="project-card reveal"><div className="project-num">02</div><div className="project-badge">DNDA</div><div className="project-title">LaunchAssistPy</div><div className="project-desc">Asistente para flujos operativos y soporte en procesos técnicos.</div></div>
          <div className="project-card reveal"><div className="project-num">03</div><div className="project-badge">DNDA</div><div className="project-title">STIMO (Visión + IA)</div><div className="project-desc">Inspección visual con IA para acelerar análisis y decisiones en piloto.</div></div>
        </div>
      </section>

      <section id="education" className="section-bordered">
        <div className="section-header reveal"><span className="section-num">04</span><h2 className="section-title">Educación</h2><div className="section-line"></div></div>
        <div className="edu-grid">
          <div className="edu-card reveal"><div className="edu-year">2025</div><div className="edu-degree">Ingeniería Mecatrónica</div><div className="edu-institution">Universidad Autónoma del Caribe</div></div>
          <div className="edu-card reveal"><div className="edu-year">2024</div><div className="edu-degree">Investigador Junior</div><div className="edu-institution">Universidad Autónoma del Caribe</div></div>
          <div className="edu-card reveal"><div className="edu-year">2025</div><div className="edu-degree">Bases de Datos con MySQL</div><div className="edu-institution">SENA</div></div>
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
