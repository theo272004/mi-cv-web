import { useMemo, useState } from 'react'
import './App.css'

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const profile = {
  name: 'Mateo David Castro Villegas',
  role: 'Automation & AI Engineer · Ingeniero Mecatrónico',
  city: 'Barranquilla, Colombia',
  phone: '+57 302 413 7347',
  email: 'mateodcvnew@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mateo-castro-villegas-84b738340',
  github: 'https://github.com/theo272004',
  summary:
    'Diseño soluciones de automatización industrial y software con IA aplicada, enfocadas en resultados reales: mayor disponibilidad, menos tareas manuales y mejor toma de decisiones operativas.',
}

const skills = [
  { area: 'Automatización y Control', items: ['Programación PLC', 'Desarrollo HMI', 'Control de procesos industriales'] },
  { area: 'Programación', items: ['Python', 'C++', 'React', 'SQL', 'MATLAB'] },
  { area: 'IA aplicada', items: ['LLMs', 'LangChain/LangGraph', 'Ollama', 'Open WebUI'] },
  { area: 'Ingeniería', items: ['Mantenimiento preventivo/correctivo', 'Diagnóstico técnico', 'SolidWorks'] },
]

const projects = [
  {
    name: 'Sistema de fabricación Superflux',
    stack: ['PLC', 'HMI', 'Control industrial'],
    impact: 'Programación integral del sistema de fabricación y operación asistida.',
    metric: 'Disponibilidad estimada +12% en línea crítica',
    status: 'Implementado en planta',
    evidence: assetUrl('proyectos/superflux/README.md'),
    tag: 'automatizacion',
  },
  {
    name: 'Software DNDA #1 (automatización)',
    stack: ['Python', 'Automatización'],
    impact: 'Herramienta registrada para optimizar tareas operativas en planta.',
    metric: 'Reducción de tareas manuales repetitivas ~35%',
    status: 'Registro DNDA activo',
    evidence: assetUrl('proyectos/dnda-automatizacion/README.md'),
    tag: 'software',
  },
  {
    name: 'Software DNDA #2 (visión + IA)',
    stack: ['Visión artificial', 'IA'],
    impact: 'Prototipo aplicado a análisis visual y toma de decisiones.',
    metric: 'Tiempo de revisión visual -40% (piloto)',
    status: 'Piloto validado',
    evidence: assetUrl('proyectos/dnda-vision-ia/README.md'),
    tag: 'ia',
  },
  {
    name: 'SQL Maintenance Analytics',
    stack: ['SQL', 'SQLite', 'CTE', 'Window Functions'],
    impact: 'Mini data mart con KPIs de mantenimiento (MTTR, MTBF, SLA y scoring de riesgo).',
    metric: '9 consultas KPI listas para demo técnica',
    status: 'Repositorio técnico publicado',
    evidence: 'https://github.com/theo272004/sql-maintenance-analytics',
    tag: 'datos',
  },
  {
    name: 'n8n Maintenance Orchestrator',
    stack: ['n8n', 'Webhook', 'Automatización de flujo'],
    impact: 'Orquestación de tickets de mantenimiento con priorización automática por severidad.',
    metric: 'Respuesta operativa estructurada en un solo flujo',
    status: 'Workflow funcional importable',
    evidence: 'https://github.com/theo272004/n8n-maintenance-orchestrator',
    tag: 'n8n',
  },
]

const featuredCredentials = [
  { title: 'Registro DNDA 145 - Software Autotrigger', file: assetUrl('certificados/DNDA-145_Software_Autotrigger_Registro.pdf'), type: 'DNDA' },
  { title: 'Registro DNDA 146 - Software LaunchAssistPy', file: assetUrl('certificados/DNDA-146_Software_LaunchAssistPy_Registro.pdf'), type: 'DNDA' },
  { title: 'Registro DNDA 172 - Software STIMO', file: assetUrl('certificados/DNDA-172_Software_STIMO_Registro.pdf'), type: 'DNDA' },
  { title: 'Certificado SENA - Bases de Datos con MySQL', file: assetUrl('certificados/Certificado_SENA_Bases-de-Datos-MySQL.pdf'), type: 'MySQL' },
]

const downloadableResources = [
  { title: 'CV - Mateo David Castro Villegas', file: assetUrl('certificados/CV_Mateo_David_Castro_Villegas.pdf') },
  { title: 'Manual de Usuario - Autotrigger', file: assetUrl('certificados/Manual_Autotrigger.pdf') },
  { title: 'Manual de Usuario - LaunchAssistPy', file: assetUrl('certificados/Manual_LaunchAssistPy.pdf') },
  { title: 'Manual de Usuario - STIMO', file: assetUrl('certificados/Manual_STIMO.pdf') },
]

function App() {
  const [filter, setFilter] = useState('todos')
  const [search, setSearch] = useState('')

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const byTag = filter === 'todos' || p.tag === filter
      const byText = `${p.name} ${p.stack.join(' ')} ${p.impact}`
        .toLowerCase()
        .includes(search.toLowerCase())
      return byTag && byText
    })
  }, [filter, search])

  return (
    <>
      <nav className="top-nav">
        <a className="nav-logo" href="#home">MCV</a>
        <div className="nav-links">
          <a href="#skills">Habilidades</a>
          <a href="#projects">Proyectos</a>
          <a href="#credentials">Certificados</a>
          <a href="#contact">Contacto</a>
        </div>
      </nav>

      <main className="wrap" id="home">
        <header className="hero card">
          <div className="hero-content">
            <span className="hero-eyebrow">Disponible remoto · {profile.city}</span>
            <h1>{profile.name}</h1>
            <p className="role">{profile.role}</p>
            <p className="hero-summary">{profile.summary}</p>

            <div className="meta">
              <span>📧 {profile.email}</span>
              <span>📱 {profile.phone}</span>
            </div>

            <div className="hero-actions">
              <a className="btn btn-primary" href={assetUrl('certificados/CV_Mateo_David_Castro_Villegas.pdf')} target="_blank" rel="noreferrer">
                Descargar CV
              </a>
              <a className="btn btn-secondary" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="btn btn-secondary" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>

          <aside className="hero-stats" aria-label="Indicadores de perfil">
            <div className="photo-placeholder" aria-label="Espacio para foto de perfil">Foto</div>
            <div className="stat-card">
              <strong>3</strong>
              <span>Registros de software DNDA</span>
            </div>
            <div className="stat-card">
              <strong>1</strong>
              <span>Certificación MySQL (SENA)</span>
            </div>
            <div className="stat-card">
              <strong>+12%</strong>
              <span>Impacto estimado en disponibilidad</span>
            </div>
          </aside>
        </header>

        <section className="grid" id="skills">
          <article className="card">
            <h2>Habilidades técnicas</h2>
            {skills.map((group) => (
              <div key={group.area} className="skill-group">
                <h3>{group.area}</h3>
                <div className="chips">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </article>

          <article className="card" id="projects">
            <h2>Proyectos destacados</h2>
            <div className="controls">
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="todos">Todos</option>
                <option value="automatizacion">Automatización</option>
                <option value="ia">IA</option>
                <option value="software">Software</option>
                <option value="datos">Datos/SQL</option>
                <option value="n8n">n8n</option>
              </select>
              <input
                placeholder="Buscar por tecnología o nombre"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <ul className="project-list">
              {filteredProjects.map((project) => (
                <li key={project.name}>
                  <h3>{project.name}</h3>
                  <p>{project.impact}</p>
                  <p><strong>Impacto medible:</strong> {project.metric}</p>
                  <p><strong>Estado:</strong> {project.status}</p>
                  <small>{project.stack.join(' · ')}</small>
                  <p>
                    <a className="evidence-link" href={project.evidence} target="_blank" rel="noreferrer">Ver evidencia técnica →</a>
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="card" id="credentials">
          <h2>Certificados y descargables</h2>
          <p className="section-intro">Documentación clave para validación profesional y revisión técnica.</p>

          <div className="credentials-grid">
            {featuredCredentials.map((item) => (
              <article key={item.title} className="credential-card">
                <span className="credential-badge">{item.type}</span>
                <h3>{item.title}</h3>
                <a className="btn btn-secondary" href={item.file} target="_blank" rel="noreferrer">
                  Ver certificado
                </a>
              </article>
            ))}
          </div>

          <h3 className="subsection-title">Descargables adicionales</h3>
          <ul className="download-list">
            {downloadableResources.map((resource) => (
              <li key={resource.title}>
                <span>{resource.title}</span>
                <a className="download-link" href={resource.file} target="_blank" rel="noreferrer">
                  Descargar
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="card contact" id="contact">
          <h2>Contacto</h2>
          <p className="hero-summary">Si quieres, te ayudo a automatizar procesos, integrar IA y mejorar operaciones técnicas.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>Escribirme</a>
            <a className="btn btn-secondary" href={`tel:${profile.phone.replace(/\s/g, '')}`}>Llamar</a>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
