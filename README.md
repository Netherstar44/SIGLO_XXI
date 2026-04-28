# INGENIERÍA DEL FUTURO — Ponencia Digital

Experiencia web editorial 3D inmersiva, en español, sobre las innovaciones de ingeniería del siglo XXI. Construida con React, Vite, Tailwind CSS v4 y Three.js (React Three Fiber).

## Requisitos

- **Node.js 20.19+** (recomendado 22 o superior)
- **npm 10+**

## Instalación y arranque

```bash
npm install
npm run dev
```

El servidor de desarrollo arranca por defecto en `http://localhost:5173/`.

## Scripts disponibles

| Script             | Descripción                                       |
| ------------------ | ------------------------------------------------- |
| `npm run dev`      | Servidor de desarrollo Vite con HMR               |
| `npm run build`    | Genera la build de producción en `dist/`          |
| `npm run preview`  | Sirve la build de producción localmente           |
| `npm run typecheck`| Verificación de tipos con TypeScript              |

## Estructura

```
.
├── index.html
├── public/                 Activos estáticos (favicon, og image)
├── src/
│   ├── App.tsx             Router raíz
│   ├── main.tsx            Punto de entrada
│   ├── index.css           Estilos globales + tokens Tailwind v4
│   ├── components/
│   │   ├── 3d/             Escenas Three.js (R3F)
│   │   ├── layout/         Componentes de layout
│   │   └── ui/             shadcn/ui + componentes propios de la ponencia
│   ├── hooks/
│   ├── lib/
│   └── pages/              home.tsx, not-found.tsx
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Secciones de la ponencia

1. Portada — "Ingenierando el futuro"
2. Energía y movilidad — Baterías CATL Shenxing & Qilin
3. Agricultura vertical
4. Infraestructura digital — Cloud + 5G
5. Biotecnología y medicina — CRISPR, biosensores, prótesis 3D, carne cultivada
6. Inteligencia artificial y riesgos
7. Ingeniería espacial — Artemis II
8. Bibliografía + colofón
