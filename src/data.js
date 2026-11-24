// Todo el contenido del CV vive aquí: para actualizarlo no hace falta tocar el diseño.

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export const contact = {
  email: 'mateodcvnew@gmail.com',
  phone: '+57 302 413 7347',
  phoneHref: 'tel:+573024137347',
  github: 'https://github.com/theo272004',
  linkedin: 'https://www.linkedin.com/in/mateo-castro-villegas-84b738340',
  cv: asset('certificados/CV_Mateo_David_Castro_Villegas.pdf'),
}

export const navLinks = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#formacion', label: 'Formación' },
  { href: '#contacto', label: 'Contacto' },
]

export const titleBlock = [
  { icon: 'graduation', label: 'Título profesional', value: 'Ingeniero Mecatrónico · Universidad Autónoma del Caribe' },
  { icon: 'bolt', label: 'Especialidad', value: 'Automatización · IA aplicada · Software' },
  { icon: 'layers', label: 'Propiedad intelectual', value: '3 obras de software registradas (DNDA)' },
  { icon: 'globe', label: 'Idiomas', value: 'Español nativo · Inglés B2' },
]

// Lista junto al robot, en la portada
export const focus = [
  { icon: 'gear', label: 'Automatización industrial' },
  { icon: 'chip', label: 'IA aplicada' },
  { icon: 'code', label: 'Desarrollo de software' },
  { icon: 'layers', label: 'Integración de datos' },
]

export const about = [
  'Soy ingeniero mecatrónico de la Universidad Autónoma del Caribe. Trabajo como ingeniero de mantenimiento en Farmacápsulas, donde automatizo líneas de producción, diagnostico fallas mecánicas, eléctricas y electrónicas y acompaño la puesta en marcha de maquinaria nueva.',
  'Fuera de planta desarrollo software: tengo tres obras registradas ante la DNDA, cofundé Datafacta y dirijo Kaiva Studio. Esa mezcla me permite llevar un proyecto desde el tablero eléctrico hasta la aplicación que muestra sus datos.',
]

export const services = [
  { icon: 'gear', label: 'Automatización con PLC y HMI' },
  { icon: 'wrench', label: 'Mantenimiento y diagnóstico de fallas' },
  { icon: 'chip', label: 'Visión artificial e IA aplicada' },
  { icon: 'chart', label: 'Software, datos y tableros de KPI' },
]

export const principles = [
  {
    title: 'Automatización con criterio de negocio',
    text: 'Conecto operación, software y control sin perder claridad técnica ni de vista el resultado que la planta necesita.',
  },
  {
    title: 'IA útil, no decorativa',
    text: 'Uso agentes, visión artificial y flujos automatizados donde reducen tiempo, error y fricción de verdad.',
  },
  {
    title: 'De la idea a la puesta en marcha',
    text: 'Combino mecatrónica, integración de datos y desarrollo para llevar un proyecto desde el diseño hasta la implementación.',
  },
]

export const skills = [
  {
    name: 'Automatización industrial',
    items: ['PLC', 'HMI', 'Control de procesos', 'Puesta en marcha', 'Diagnóstico técnico', 'SolidWorks'],
  },
  {
    name: 'IA aplicada',
    items: ['Agentes de IA', 'LangGraph', 'Ollama', 'RAG', 'Visión artificial'],
  },
  {
    name: 'Integración de sistemas',
    items: ['n8n', 'APIs REST', 'Webhooks', 'Flujos de trabajo', 'Excel y Power BI'],
  },
  {
    name: 'Desarrollo',
    items: ['Python', 'C++', 'React', 'SQL y MySQL', 'MATLAB'],
  },
]

export const experience = [
  {
    role: 'Ingeniero de Mantenimiento',
    company: 'Farmacápsulas',
    meta: ['Barranquilla, Colombia'],
    periods: [
      { dates: 'May. 2026 – actualidad', type: 'Contrato' },
      { dates: 'Nov. 2024 – abr. 2025', type: 'Prácticas' },
    ],
    portrait: true,
    images: [
      {
        src: asset('img/experience/farmacapsulas-plc.webp'),
        alt: 'Banco de pruebas con PLC y pantalla HMI Siemens, fuente de alimentación y pulsadores cableados.',
        caption: 'Pruebas de automatización PLC/HMI para línea de producción.',
      },
      {
        src: asset('img/experience/farmacapsulas-3.webp'),
        alt: 'Módulos de entradas y salidas Beckhoff en un tablero, con cables azules marcados y LED de estado encendidos.',
        caption: 'Diagnóstico de señales en módulos de E/S Beckhoff dentro del tablero.',
      },
      {
        src: asset('img/experience/farmacapsulas-2.webp'),
        alt: 'Plano eléctrico impreso con amplificadores de conmutación y conexiones de sensores, sostenido en planta.',
        caption: 'Lectura de planos eléctricos del fabricante durante el diagnóstico en planta.',
      },
    ],
    bullets: [
      'Automaticé de extremo a extremo el sistema de fabricación de Superflux: lógica PLC, integración HMI y puesta en marcha.',
      'Fui el enlace técnico entre los equipos internos y los representantes internacionales de Syntegon y Bosch durante la instalación de maquinaria nueva.',
      'Elaboré informes técnicos, registros operativos y tableros de KPI para las decisiones del equipo de operaciones.',
      'Diagnostiqué y resolví de forma autónoma fallas complejas mecánicas, eléctricas y electrónicas.',
      'Definí cronogramas de mantenimiento preventivo y correctivo que redujeron los tiempos de inactividad en producción crítica.',
    ],
  },
  {
    role: 'Fundador · Ingeniería de software, diseño y sistemas',
    company: 'Kaiva Studio',
    meta: ['Estudio digital', 'Barranquilla, Colombia · remoto'],
    link: { href: 'https://kaivastudio.com', label: 'kaivastudio.com' },
    bullets: [
      'Fundé y dirijo un estudio digital que diseña y desarrolla sitios web, marcas y software a medida para empresas de Colombia y Latinoamérica.',
      'Llevo la parte de ingeniería: arquitectura, programación y sistemas de cada proyecto, desde el sitio web hasta plataformas internas, portales, tableros e integraciones.',
      'Trabajamos con propuesta por escrito antes de empezar, entregas por fases y el código a nombre del cliente.',
    ],
  },
  {
    role: 'Cofundador',
    company: 'Datafacta',
    meta: ['Producto en producción · v2.5', 'Gestión de facturas para pymes', 'Colombia'],
    portrait: false,
    images: [
      {
        src: asset('img/experience/datafacta-team.webp'),
        alt: 'Dos integrantes del equipo de Datafacta en su stand durante un evento de startups, con el producto en pantalla.',
        caption: 'Presentación de Datafacta en un evento de startups.',
      },
    ],
    bullets: [
      'Cofundé una plataforma que escanea y estructura documentos financieros para pymes en Colombia.',
      'Reemplazamos procesos manuales sin trazabilidad, lo que reduce reprocesos, tiempos operativos y fricción al decidir.',
      'Diseñé el flujo completo de diagnóstico, validación y estructuración automática de facturas y comprobantes.',
      'Implementé el procesamiento en tiempo real con exportación directa a Excel y a sistemas contables, además de un panel analítico de seguimiento.',
    ],
  },
]

export const projects = [
  {
    id: 'autotrigger',
    title: 'Autotrigger',
    kind: 'Firmware · ESP32',
    summary:
      'Firmware que recibe órdenes por puerto serie desde el sistema de visión y las convierte en movimiento real del lanzador: giro de la base, elevación y disparo.',
    factsTitle: 'Qué resuelve',
    facts: [
      'Motor DC con puente H para el giro horizontal',
      'Servomotor para la elevación del cañón',
      'Relé para activar el disparo',
      'Interpretación de tramas como B90Y75F1',
    ],
    stack: ['C++', 'Arduino IDE', 'ESP32Servo', 'PWM', 'Serial USB'],
    docs: [
      { label: 'Registro DNDA', file: asset('certificados/DNDA-145_Software_Autotrigger_Registro.pdf') },
      { label: 'Manual técnico', file: asset('certificados/Manual_Autotrigger.pdf') },
    ],
    images: [
      {
        src: asset('img/projects/autotrigger-setup.webp'),
        alt: 'Prototipo del lanzador con base giratoria de engranajes, cámara superior y portátil conectado por USB.',
      },
      {
        src: asset('img/projects/autotrigger-visual.webp'),
        alt: 'Esquema de Autotrigger: las instrucciones se convierten en movimiento horizontal, vertical y disparo del lanzador.',
      },
    ],
  },
  {
    id: 'launchassistpy',
    title: 'LaunchAssistPy',
    kind: 'Visión artificial · Python',
    summary:
      'Interfaz que detecta las manos con una cámara y traduce sus gestos, en tiempo real, en órdenes de apuntado y disparo para el lanzador.',
    factsTitle: 'Cómo funciona',
    facts: [
      'La cámara captura video en tiempo real',
      'Detecta las manos y calcula su punto medio',
      'Convierte la posición en coordenadas y ángulos',
      'Envía la orden por serie al ESP32, incluido el gesto de disparo',
    ],
    stack: ['Python 3', 'OpenCV', 'MediaPipe', 'NumPy', 'pySerial'],
    docs: [
      { label: 'Registro DNDA', file: asset('certificados/DNDA-146_Software_LaunchAssistPy_Registro.pdf') },
      { label: 'Manual técnico', file: asset('certificados/Manual_LaunchAssistPy.pdf') },
    ],
    images: [
      {
        src: asset('img/projects/launchassistpy-gesture.webp'),
        alt: 'Ventana de detección de manos: una mano abierta en verde, otra cerrada en rojo y el aviso de objetivo fijado.',
      },
      {
        src: asset('img/projects/launchassistpy-visual.webp'),
        alt: 'Ilustración de LaunchAssistPy: cámara, detección de manos, código en Python y lanzador.',
      },
    ],
  },
  {
    id: 'stimo',
    title: 'STIMO',
    kind: 'Dispositivo médico · Mecatrónica',
    summary:
      'Dispositivo de rehabilitación posoperatoria que integra termoterapia, electroestimulación TENS/EMS y monitoreo del ángulo de flexión en tiempo real. Validado con pacientes y profesionales de la salud.',
    factsTitle: 'Datos clave',
    facts: [
      '42–50 °C de rango térmico clínico',
      '15–20 min de estabilización térmica',
      '+9,32° de ganancia media de flexión',
      '3 pacientes en la validación funcional',
    ],
    roleTitle: 'Mi aporte',
    role: 'Diseño del sistema mecatrónico y su arquitectura, integración electrónica, monitoreo de flexión con registro de datos y soporte técnico durante las pruebas piloto y la validación clínica.',
    stack: ['ESP32', 'MPU6050', 'MAX6675', 'TENS/EMS', 'Interfaz web'],
    docs: [
      { label: 'Registro DNDA', file: asset('certificados/DNDA-172_Software_STIMO_Registro.pdf') },
      { label: 'Manual técnico', file: asset('certificados/Manual_STIMO.pdf') },
    ],
    images: Array.from({ length: 9 }, (_, i) => ({
      src: asset(`img/stimo/stimo-${i + 1}.webp`),
      alt: `STIMO: imagen ${i + 1} de 9 del dispositivo y su validación.`,
    })),
  },
]

export const education = [
  { year: '2025', title: 'Ingeniería Mecatrónica', place: 'Universidad Autónoma del Caribe · Título profesional', featured: true },
  { year: '2025', title: 'Bases de Datos con MySQL', place: 'SENA', file: asset('certificados/Certificado_SENA_Bases-de-Datos-MySQL.pdf') },
  { year: '2025', title: 'Curso de liderazgo organizacional', place: 'CorFomento · Astilleros Centro Cultural' },
  { year: '2024', title: 'Investigador júnior', place: 'Universidad Autónoma del Caribe' },
  { year: '2020', title: 'Bachiller académico', place: 'Nuevo Colegio del Prado' },
]
