# Mi CV Web · Portafolio técnico de Mateo

CV web interactivo orientado a oportunidades en **mecatrónica, automatización industrial e IA aplicada**.

## Propuesta de valor
Este proyecto funciona como hub profesional para mostrar:
- Experiencia y enfoque en mantenimiento/automatización
- Proyectos con evidencia técnica (capturas, stack y resultados)
- Ruta de crecimiento en analítica, visión artificial y agentes IA

## Stack
- React 19
- Vite 7
- ESLint 9
- GitHub Actions + GitHub Pages (deploy automático)

## Scripts
```bash
npm install
npm run dev      # entorno local
npm run build    # build de producción
npm run preview  # previsualizar build
npm run lint     # calidad estática
```

## Deploy
El despliegue se ejecuta con `.github/workflows/deploy-pages.yml` en cada push a `master`.

## Estructura clave
- `src/` → UI y componentes del CV
- `public/img/` → imágenes para perfil/proyectos
- `public/proyectos/` → recursos de evidencia técnica
- `docs/ROADMAP.md` → plan de escalamiento profesional (90 días)

## Enfoque de contenido recomendado
Cada proyecto del portafolio debería incluir:
1. Problema industrial real
2. Solución propuesta y arquitectura
3. Métricas/resultado (tiempo, calidad, costo, disponibilidad)
4. Evidencia visual + próximos pasos

## Próximos bloques (priorizados)
- Fichas de proyectos con KPIs de impacto
- Sección de certificados con trazabilidad (fecha + enlace)
- Integrar 2 repos demo: mantenimiento predictivo y visión artificial básica
- Añadir versión EN para postulaciones internacionales
