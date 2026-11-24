import { Suspense, lazy, useEffect, useState } from 'react'
import Icon from './Icon'
import {
  about,
  contact,
  education,
  experience,
  focus,
  navLinks,
  principles,
  projects,
  services,
  skills,
  titleBlock,
} from './data'

const RobotCanvas = lazy(() => import('./RobotMateo'))
const external = { target: '_blank', rel: 'noreferrer' }

function SectionHead({ title, lead }) {
  return (
    <header className="section-head">
      <h2 className="bar-title">{title}</h2>
      {lead && <p>{lead}</p>}
    </header>
  )
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  const isDark = theme === 'dark'

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#0f151b' : '#f7f6f3')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Sin almacenamiento disponible: el tema solo dura esta visita.
    }
  }, [theme, isDark])

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
          </>
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  )
}

function Gallery({ title, images, portrait = false }) {
  const [index, setIndex] = useState(0)
  const active = images[index]

  return (
    <figure className={portrait ? 'gallery is-portrait' : 'gallery'}>
      <div className="gallery-main">
        <img src={active.src} alt={active.alt} loading="lazy" decoding="async" />
      </div>
      {images.length > 1 && (
        <div className="gallery-thumbs" role="group" aria-label={`Imágenes de ${title}`}>
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Ver imagen ${i + 1} de ${images.length}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <img src={image.src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
      {active.caption && <figcaption>{active.caption}</figcaption>}
    </figure>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [robotReady, setRobotReady] = useState(false)

  // El 3D pesa: se descarga cuando el navegador ya pintó el contenido y está libre
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setRobotReady(true), { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(() => setRobotReady(true), 400)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <header className="topbar">
        <div className="wrap topbar-inner">
          <a href="#inicio" className="brand" aria-label="Mateo Castro Villegas, inicio">
            MCV<span aria-hidden="true">_</span>
          </a>
          <nav aria-label="Navegación principal" className={menuOpen ? 'nav is-open' : 'nav'} id="menu">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="btn btn-small" href={contact.cv} {...external}>
            CV<span className="cv-long">en PDF</span> <Icon name="download" size={16} />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Cerrar' : 'Menú'}
          </button>
        </div>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="label hero-place">
                <Icon name="pin" size={16} />
                Barranquilla, Colombia
              </p>
              <h1>
                Mateo Castro Villegas
                <span className="hero-role">Ingeniero Mecatrónico</span>
              </h1>
              <p className="hero-lead">
                Automatizo procesos industriales y desarrollo el software que los conecta: PLC, HMI, visión
                artificial e IA aplicada, desde el diseño hasta la puesta en marcha.
              </p>
              <div className="actions">
                <a className="btn btn-primary" href="#contacto">
                  Hablemos <Icon name="arrow" size={18} />
                </a>
                <a className="btn" href="#proyectos">Ver proyectos</a>
                <ul className="socials">
                  <li>
                    <a href={contact.linkedin} aria-label="LinkedIn" {...external}>
                      <Icon name="linkedin" size={22} />
                    </a>
                  </li>
                  <li>
                    <a href={contact.github} aria-label="GitHub" {...external}>
                      <Icon name="github" size={22} />
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${contact.email}`} aria-label="Correo">
                      <Icon name="mail" size={22} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="robot-stage">
              <div className="robot" aria-hidden="true">
                {robotReady && (
                  <Suspense fallback={null}>
                    <RobotCanvas />
                  </Suspense>
                )}
              </div>
            </div>
            <ul className="focus" aria-label="Áreas de trabajo">
              {focus.map((item) => (
                <li key={item.label}>
                  <Icon name={item.icon} size={26} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="wrap">
            <dl className="title-block">
              {titleBlock.map((cell) => (
                <div key={cell.label}>
                  <dt>
                    <Icon name={cell.icon} size={28} />
                    {cell.label}
                  </dt>
                  <dd>{cell.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section" id="sobre-mi">
          <div className="wrap">
            <div className="about">
              <div className="about-text">
                <h2 className="bar-title">Sobre mí</h2>
                {about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <a className="more" href="#experiencia">
                  Ver mi experiencia <Icon name="arrow" size={18} />
                </a>
              </div>
              <div className="about-services">
                <h2 className="bar-title">Qué hago</h2>
                <ul className="services">
                  {services.map((item) => (
                    <li key={item.label}>
                      <Icon name={item.icon} size={34} />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="capabilities" id="capacidades">
              <h3>Capacidades</h3>
              <div className="skills">
                {skills.map((group) => (
                  <div className="skill" key={group.name}>
                    <h4>{group.name}</h4>
                    <ul>
                      {group.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <ol className="principles">
                {principles.map((item) => (
                  <li key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section" id="experiencia">
          <div className="wrap">
            <SectionHead title="Experiencia" />
            {experience.map((job) => (
              <article className={job.images ? 'job' : 'job job-wide'} key={job.company}>
                <div className="job-meta">
                  <h3>{job.company}</h3>
                  <ul>
                    {job.meta.map((line) => <li key={line}>{line}</li>)}
                    {job.link && (
                      <li>
                        <a href={job.link.href} {...external}>
                          {job.link.label} <span aria-hidden="true">↗</span>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="job-body">
                  <p className="job-role">{job.role}</p>
                  {job.periods && (
                    <ul className="job-periods">
                      {job.periods.map((period) => (
                        <li key={period.dates}>
                          <span>{period.dates}</span>
                          {period.type}
                        </li>
                      ))}
                    </ul>
                  )}
                  <ul className="bullets">
                    {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </div>
                {job.images && (
                  <div className="job-photo">
                    <Gallery title={job.company} images={job.images} portrait={job.portrait} />
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="proyectos">
          <div className="wrap">
            <SectionHead
              title="Proyectos"
              lead="Tres obras de software registradas ante la Dirección Nacional de Derecho de Autor (DNDA), con su manual y su certificado."
            />
            {projects.map((project, i) => (
              <article className="project" key={project.id}>
                <div className="project-info">
                  <p className="label">
                    <span className="project-num">{String(i + 1).padStart(2, '0')}</span>
                    {project.kind}
                  </p>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>

                  <h4>{project.factsTitle}</h4>
                  <ul className="facts">
                    {project.facts.map((fact) => <li key={fact}>{fact}</li>)}
                  </ul>

                  {project.role && (
                    <>
                      <h4>{project.roleTitle}</h4>
                      <p className="project-role">{project.role}</p>
                    </>
                  )}

                  <ul className="tags" aria-label="Tecnologías">
                    {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
                  </ul>

                  <div className="actions">
                    {project.docs.map((doc) => (
                      <a className="btn btn-small" key={doc.label} href={doc.file} {...external}>
                        {doc.label} <Icon name="download" size={16} />
                      </a>
                    ))}
                  </div>
                </div>
                <Gallery title={project.title} images={project.images} />
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="formacion">
          <div className="wrap">
            <SectionHead title="Formación" />
            <ul className="education">
              {education.map((item) => (
                <li key={item.title} className={item.featured ? 'is-featured' : undefined}>
                  <span className="label">{item.year}</span>
                  <strong>{item.title}</strong>
                  <span className="education-place">
                    {item.place}
                    {item.file && (
                      <>
                        {' · '}
                        <a href={item.file} {...external}>Ver certificado</a>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section contact" id="contacto">
          <div className="wrap contact-grid">
            <div>
              <p className="label">Contacto</p>
              <h2>¿Tienes un proceso que automatizar o un sistema que integrar?</h2>
              <p>
                Soy ingeniero mecatrónico y me muevo con soltura entre automatización, software, datos e IA
                sin perder de vista la operación. Escríbeme y conversamos.
              </p>
              <div className="actions">
                <a className="btn btn-primary" href={`mailto:${contact.email}`}>Escribirme</a>
                <a className="btn" href={contact.cv} {...external}>
                  Descargar CV <Icon name="download" size={18} />
                </a>
              </div>
            </div>
            <ul className="contact-list">
              <li>
                <span className="label">Correo</span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <span className="label">Teléfono</span>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
              <li>
                <span className="label">LinkedIn</span>
                <a href={contact.linkedin} {...external}>mateo-castro-villegas <span aria-hidden="true">↗</span></a>
              </li>
              <li>
                <span className="label">GitHub</span>
                <a href={contact.github} {...external}>theo272004 <span aria-hidden="true">↗</span></a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© 2026 Mateo David Castro Villegas</span>
          <span>Ingeniero Mecatrónico · Automatización e IA</span>
        </div>
      </footer>
    </>
  )
}

export default App
