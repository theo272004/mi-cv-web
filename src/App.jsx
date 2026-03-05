import { useMemo, useState } from 'react'
import './App.css'

const assetUrl = (path) => new URL(path, import.meta.env.BASE_URL).toString()

const profile = {
  name: 'Mateo David Castro Villegas',
  role: 'Ingeniero Mecatrónico | Automatización Industrial | IA aplicada',
  city: 'Barranquilla, Colombia',
  phone: '+57 302 413 7347',
  email: 'mateodcvnew@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mateo-castro-villegas-84b738340',
  github: 'https://github.com/theo272004',
  summary:
    'Ingeniero Mecatrónico con experiencia en mantenimiento industrial, automatización de procesos y programación PLC/HMI. Enfocado en construir soluciones prácticas con software, visión artificial e inteligencia artificial para mejorar productividad y confiabilidad operacional.',
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

const repoHighlights = [
  {
    name: 'sql-maintenance-analytics',
    focus: 'Analítica SQL aplicada a mantenimiento',
    value: 'Demuestra dominio de KPIs operativos y consultas de nivel medio para decisiones técnicas.',
    link: 'https://github.com/theo272004/sql-maintenance-analytics',
  },
  {
    name: 'n8n-maintenance-orchestrator',
    focus: 'Automatización de atención de incidentes',
    value: 'Convierte reportes de planta en prioridades y acciones claras con lógica reproducible.',
    link: 'https://github.com/theo272004/n8n-maintenance-orchestrator',
  },
  {
    name: 'predictive-maintenance-ai-starter',
    focus: 'IA aplicada a mantenimiento predictivo',
    value: 'Entrena un modelo base con datos sintéticos para anticipar riesgo de falla.',
    link: 'https://github.com/theo272004/predictive-maintenance-ai-starter',
  },
  {
    name: 'n8n-automation-starter',
    focus: 'Base reutilizable de automatizaciones',
    value: 'Acelera la construcción de nuevos workflows para casos de negocio reales.',
    link: 'https://github.com/theo272004/n8n-automation-starter',
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
    <main className="wrap">
      <header className="hero card">
        <div className="hero-content">
          <span className="hero-eyebrow">Portfolio Profesional</span>
          <h1>{profile.name}</h1>
          <p className="role">{profile.role}</p>
          <p className="hero-summary">{profile.summary}</p>

          <div className="meta">
            <span>📍 {profile.city}</span>
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

      <section className="grid">
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

        <article className="card">
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

      <section className="card">
        <h2>Repositorios técnicos alineados al perfil</h2>
        <p className="section-intro">Portafolio enfocado en SQL, n8n e IA aplicada a mantenimiento industrial.</p>
        <div className="repo-grid">
          {repoHighlights.map((repo) => (
            <article key={repo.name} className="repo-card">
              <h3>{repo.name}</h3>
              <p><strong>Enfoque:</strong> {repo.focus}</p>
              <p>{repo.value}</p>
              <a className="evidence-link" href={repo.link} target="_blank" rel="noreferrer">Ver repositorio →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
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
    </main>
  )
}

export default App
