import { useMemo, useState } from 'react'
import './App.css'

const profile = {
  name: 'Mateo David Castro Villegas',
  role: 'Ingeniero Mecatrónico | Automatización Industrial | IA aplicada',
  city: 'Barranquilla, Colombia',
  phone: '+57 302 413 7347',
  email: 'mateodcvnew@gmail.com',
  summary:
    'Ingeniero Mecatrónico con experiencia en mantenimiento industrial, automatización de procesos y programación PLC/HMI. Enfocado en construir soluciones prácticas con software, visión artificial e inteligencia artificial para mejorar productividad y confiabilidad operacional.',
}

const skills = [
  { area: 'Automatización y Control', items: ['Programación PLC', 'Desarrollo HMI', 'Control de procesos industriales'] },
  { area: 'Programación', items: ['Python', 'C++', 'React', 'SQL básico', 'MATLAB'] },
  { area: 'IA aplicada', items: ['LLMs', 'LangChain/LangGraph', 'Ollama', 'Open WebUI'] },
  { area: 'Ingeniería', items: ['Mantenimiento preventivo/correctivo', 'Diagnóstico técnico', 'SolidWorks'] },
]

const projects = [
  {
    name: 'Sistema de fabricación Superflux',
    stack: ['PLC', 'HMI', 'Control industrial'],
    impact: 'Programación integral del sistema de fabricación y operación asistida.',
    tag: 'automatizacion',
  },
  {
    name: 'Software DNDA #1 (automatización)',
    stack: ['Python', 'Automatización'],
    impact: 'Herramienta registrada para optimizar tareas operativas en planta.',
    tag: 'software',
  },
  {
    name: 'Software DNDA #2 (visión + IA)',
    stack: ['Visión artificial', 'IA'],
    impact: 'Prototipo aplicado a análisis visual y toma de decisiones.',
    tag: 'ia',
  },
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
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p>{profile.summary}</p>
        <div className="meta">
          <span>📍 {profile.city}</span>
          <span>📧 {profile.email}</span>
          <span>📱 {profile.phone}</span>
        </div>
      </header>

      <section className="grid">
        <article className="card">
          <h2>Habilidades</h2>
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
                <small>{project.stack.join(' · ')}</small>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="card">
        <h2>Certificados (próximamente)</h2>
        <p>
          Aquí vamos a publicar tus certificados gratuitos con botón de descarga.
          Ruta de carga: <code>public/certificados/</code>
        </p>
      </section>

      <section className="card">
        <h2>Plan 90 días</h2>
        <p>
          Ya quedó creado el roadmap inicial en <code>docs/ROADMAP.md</code> para escalar tu perfil y enfocarlo a contratación.
        </p>
      </section>
    </main>
  )
}

export default App
