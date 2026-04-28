import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Loader } from "@/components/ui/loader";
import { SceneWrapper } from "@/components/3d/scene-wrapper";
import { Section } from "@/components/layout/section";
import { ZineText } from "@/components/ui/zine-text";
import { FloatingPanel } from "@/components/ui/floating-panel";
import { DataTag } from "@/components/ui/data-tag";

import { CoverScene } from "@/components/3d/scenes/cover-scene";
import { EnergyScene } from "@/components/3d/scenes/energy-scene";
import { AgricultureScene } from "@/components/3d/scenes/agriculture-scene";
import { CloudScene } from "@/components/3d/scenes/cloud-scene";
import { BiotechScene } from "@/components/3d/scenes/biotech-scene";
import { AIScene } from "@/components/3d/scenes/ai-scene";
import { SpaceScene } from "@/components/3d/scenes/space-scene";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Loader />
      <div className="noise-overlay" />
      
      <main className="bg-background text-foreground overflow-x-hidden">
        
        {/* 01. PORTADA */}
        <Section index={1} total={8} className="relative min-h-screen">
          <SceneWrapper className="absolute inset-0 z-0 pointer-events-none" withGlitch>
            <CoverScene />
          </SceneWrapper>
          
          <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[80vh] text-center mix-blend-difference text-white pt-20">
            <div className="border border-white/30 px-4 py-2 mb-8 font-mono text-xs md:text-sm tracking-widest inline-block bg-background/50 backdrop-blur-sm transform -rotate-2">
              EDICIÓN 001 / VOL. ∞ / SIGLO XXI
            </div>
            
            <ZineText 
              text="INGENIANDO" 
              className="text-5xl md:text-7xl lg:text-[8rem] text-primary whitespace-nowrap"
            />
            <ZineText 
              text="EL FUTURO" 
              className="text-5xl md:text-7xl lg:text-[8rem] ml-12 md:ml-32 mt-[-2rem] relative z-20 text-transparent whitespace-nowrap"
              style={{ WebkitTextStroke: "2px #00d9ff" }}
            />
            
            <p className="font-serif italic text-xl md:text-3xl mt-12 max-w-2xl bg-black text-white px-4 py-2">
              Crónicas del siglo XXI desde el laboratorio.
            </p>

            <div className="mt-8 font-mono text-xs md:text-sm tracking-wider text-white/70 flex flex-col items-center gap-1">
              <span>Jose David Correa</span>
              <span>Simon Santiago Puentes</span>
            </div>
          </div>
        </Section>

        {/* 02. ENERGÍA Y MOVILIDAD */}
        <Section index={2} total={8} className="relative bg-black/90">
          <SceneWrapper className="absolute top-0 right-0 w-full md:w-1/2 h-full z-0 pointer-events-none">
            <EnergyScene />
          </SceneWrapper>
          
          <div className="relative z-10 w-full md:w-1/2 flex flex-col gap-8">
            <div className="font-mono text-destructive tracking-widest">02 // ENERGÍA Y MOVILIDAD</div>
            <ZineText text="BATERÍAS QUE" className="text-5xl md:text-7xl text-white" />
            <ZineText text="DESAFÍAN AL FRÍO" className="text-5xl md:text-7xl text-destructive mt-[-1rem] ml-4 md:ml-12" />
            
            <FloatingPanel className="mt-8 bg-black/80 backdrop-blur-md max-w-xl text-white/90">
              <p className="font-serif text-lg leading-relaxed mb-6">
                La ansiedad por la autonomía ha muerto. En los laboratorios de CATL, las arquitecturas Shenxing y Qilin han reescrito las reglas de la termodinámica del almacenamiento de energía. Ya no estamos limitados por el frío glacial que solía drenar nuestras celdas. A través de innovaciones en materiales de ánodo y gestión térmica a nivel de sistema, el invierno dejó de ser el enemigo del vehículo eléctrico.
              </p>
              
              <div className="flex flex-wrap gap-2 mt-6">
                <DataTag variant="destructive">10% → 98% en 6 min 27 s</DataTag>
                <DataTag variant="destructive">80% en 3 min 44 s</DataTag>
                <DataTag variant="primary">Funciona a -30°C</DataTag>
                <DataTag>Resistencia interna 0,25 mΩ</DataTag>
                <DataTag>Autonomía 1500 km</DataTag>
              </div>
            </FloatingPanel>
          </div>
        </Section>

        {/* 03. AGRICULTURA Y SOSTENIBILIDAD */}
        <Section index={3} total={8} className="relative bg-background">
          <SceneWrapper className="absolute top-0 left-0 w-full md:w-1/2 h-full z-0 pointer-events-none">
            <AgricultureScene />
          </SceneWrapper>
          
          <div className="relative z-10 w-full md:w-1/2 ml-auto flex flex-col gap-8">
            <div className="font-mono text-primary tracking-widest text-right">03 // AGRICULTURA</div>
            <ZineText text="GRANJAS QUE" className="text-5xl md:text-7xl text-white text-right" />
            <ZineText text="CRECEN HACIA ARRIBA" className="text-5xl md:text-7xl text-primary mt-[-1rem] mr-4 md:mr-12 text-right" />
            
            <FloatingPanel className="mt-8 bg-zinc-900 border-primary" expandable expandedContent={
              <p className="font-mono text-xs text-primary mt-4 border-t border-primary/30 pt-4">
                * El control climático de precisión y las luces LED ajustadas al espectro de absorción de clorofila permiten cosechas continuas, inmunes a sequías o heladas.
              </p>
            }>
              <p className="font-serif text-lg leading-relaxed text-white/90">
                La tierra cultivable es una tecnología obsoleta. Al trasladar la fotosíntesis a entornos hipercontrolados y apilarla verticalmente, hemos abstraído la agricultura de las inclemencias climáticas. Las granjas verticales son fábricas de biomasa de alta precisión donde la iluminación LED pulsada dicta los ritmos circadianos de las plantas, consumiendo una fracción del agua tradicional y eliminando la necesidad de pesticidas.
              </p>
              
              <div className="flex flex-wrap gap-2 mt-6">
                <DataTag variant="primary">70-95% menos agua</DataTag>
                <DataTag>1 acre interior = 30 acres exteriores</DataTag>
                <DataTag>Reducción de combustibles fósiles</DataTag>
                <DataTag variant="accent">+ CLICK PARA EXPANDIR DATOS</DataTag>
              </div>
            </FloatingPanel>
          </div>
        </Section>

        {/* 04. INFRAESTRUCTURA DIGITAL */}
        <Section index={4} total={8} className="relative bg-black">
          <SceneWrapper className="absolute inset-0 z-0 pointer-events-none">
            <CloudScene />
          </SceneWrapper>
          
          <div className="relative z-10 w-full flex flex-col gap-8 items-center text-center mix-blend-difference text-white">
            <div className="font-mono text-accent tracking-widest">04 // INFRAESTRUCTURA DIGITAL</div>
            <ZineText text="LA NUBE" className="text-6xl md:text-8xl text-accent" />
            <ZineText text="NO EXISTE" className="text-6xl md:text-8xl text-transparent mt-[-1rem]" style={{ WebkitTextStroke: "2px #fff" }} />
            
            <div className="mt-12 flex flex-col md:flex-row gap-8 justify-center">
              <FloatingPanel className="max-w-md bg-black border-accent transform rotate-2">
                <p className="font-serif text-lg text-left text-white/90">
                  Lo que llamamos "nube" es, en realidad, la hiper-materialidad de la red. Millones de kilómetros de cables submarinos de fibra óptica y centros de datos que devoran gigavatios. Pero la verdadera innovación radica en la orquestación: la abstracción completa del hardware físico mediante virtualización extrema, permitiendo que la computación se comporte como un líquido que fluye hacia donde se necesita.
                </p>
              </FloatingPanel>
              
              <FloatingPanel className="max-w-xs bg-black border-white transform -rotate-3 flex flex-col justify-center gap-4">
                <DataTag variant="accent" className="w-full justify-center py-2 text-sm">Servidores distribuidos</DataTag>
                <DataTag className="w-full justify-center py-2 text-sm">Virtualización total</DataTag>
                <DataTag variant="accent" className="w-full justify-center py-2 text-sm">5G hasta 10.000 Mbps</DataTag>
                <DataTag className="w-full justify-center py-2 text-sm">Latencia 1-2 ms</DataTag>
              </FloatingPanel>
            </div>
          </div>
        </Section>

        {/* 05. BIOTECNOLOGÍA Y MEDICINA */}
        <Section index={5} total={8} className="relative bg-zinc-950">
          <SceneWrapper className="absolute top-0 right-0 w-full md:w-1/2 h-full z-0 pointer-events-none">
            <BiotechScene />
          </SceneWrapper>
          
          <div className="relative z-10 w-full md:w-1/2 flex flex-col gap-8">
            <div className="font-mono text-white tracking-widest">05 // BIOTECNOLOGÍA</div>
            <ZineText text="EL CUERPO COMO" className="text-5xl md:text-7xl text-white" />
            <ZineText text="HARDWARE" className="text-5xl md:text-7xl bg-white text-black px-4 inline-block transform -rotate-2 w-max" />
            
            <FloatingPanel className="mt-8 bg-zinc-900 border-white">
              <p className="font-serif text-lg leading-relaxed text-white/90">
                La línea divisoria entre el silicio y la célula se ha disuelto. La edición genética mediante herramientas como CRISPR-Cas9 nos ha entregado las llaves del código fuente de la vida. Ya no solo observamos pasivamente el declive biológico; aplicamos parches, recompilamos tejidos y actualizamos nuestro sistema inmune. La biología es la nueva frontera de la ingeniería de software.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="border border-white/20 p-3 bg-black/50">
                  <span className="block font-mono text-xs text-primary mb-1">PATCH v2.1</span>
                  <h4 className="font-sans font-bold text-white">CARNE CULTIVADA</h4>
                </div>
                <div className="border border-white/20 p-3 bg-black/50">
                  <span className="block font-mono text-xs text-accent mb-1">MONITOR_01</span>
                  <h4 className="font-sans font-bold text-white">BIOSENSORES DE GRAFENO</h4>
                </div>
                <div className="border border-white/20 p-3 bg-black/50">
                  <span className="block font-mono text-xs text-white mb-1">HARDWARE_MOD</span>
                  <h4 className="font-sans font-bold text-white">PRÓTESIS IMPRESAS 3D</h4>
                </div>
                <div className="border border-white/20 p-3 bg-black/50">
                  <span className="block font-mono text-xs text-destructive mb-1">ROOT_ACCESS</span>
                  <h4 className="font-sans font-bold text-white">EDICIÓN CRISPR</h4>
                </div>
              </div>
            </FloatingPanel>
          </div>
        </Section>

        {/* 06. IA */}
        <Section index={6} total={8} className="relative bg-zinc-900">
          <SceneWrapper className="absolute inset-0 w-full h-full z-0 pointer-events-none" withGlitch>
            <AIScene />
          </SceneWrapper>
          
          <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-8 mix-blend-difference text-white">
            <div className="font-mono text-destructive tracking-widest text-center">06 // INTELIGENCIA ARTIFICIAL</div>
            <ZineText text="MÁQUINAS QUE SUEÑAN," className="text-4xl md:text-6xl text-center" />
            <ZineText text="MÁQUINAS QUE FALLAN" className="text-4xl md:text-6xl text-destructive text-center mt-[-1rem] transform scale-y-[-1] opacity-50" />
            
            <FloatingPanel className="mt-8 bg-black/80 backdrop-blur-lg border-destructive/50 transform rotate-1 mx-auto w-full md:w-3/4">
              <p className="font-serif text-lg leading-relaxed text-white/90 text-center md:text-left">
                Hemos enseñado a la arena a pensar, y ahora nos enfrentamos a las consecuencias. Los modelos fundacionales no son simples bases de datos consultables; son arquitecturas estadísticas que exhiben propiedades emergentes imposibles de predecir por sus propios creadores. Mientras automatizamos la detección de vulnerabilidades con una eficiencia aterradora, simultáneamente engendramos el riesgo sistémico más profundo de nuestra era: la alineación de inteligencias no humanas.
              </p>
            </FloatingPanel>
          </div>
        </Section>

        {/* 07. ESPACIO */}
        <Section index={7} total={8} className="relative bg-black">
          <SceneWrapper className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <SpaceScene />
          </SceneWrapper>
          
          <div className="relative z-10 w-full md:w-1/2 ml-auto flex flex-col gap-8 mix-blend-screen text-white pt-32">
            <div className="font-mono text-accent tracking-widest text-right">07 // INGENIERÍA ESPACIAL</div>
            <ZineText text="VOLVER A" className="text-6xl md:text-8xl text-right text-white" />
            <ZineText text="LA LUNA" className="text-6xl md:text-8xl text-right text-transparent mt-[-1.5rem]" style={{ WebkitTextStroke: "2px #00d9ff" }} />
            
            <FloatingPanel className="mt-8 bg-transparent border-t-2 border-b-2 border-l-0 border-r-0 border-accent/50 max-w-xl self-end">
              <p className="font-serif text-lg leading-relaxed text-white/90 text-right">
                Artemis II no es un ejercicio de nostalgia; es la prueba de concepto para la expansión humana multiplanetaria. La nave Orion y el cohete SLS representan la culminación de décadas de ingeniería aeroespacial iterativa. Volvemos a nuestro satélite empleando una trayectoria de retorno libre, utilizando la mecánica celeste elemental como red de seguridad mientras empujamos los límites de la supervivencia biológica en el vacío absoluto.
              </p>
              
              <div className="flex flex-wrap justify-end gap-2 mt-6">
                <DataTag variant="accent">VUELO TRIPULADO</DataTag>
                <DataTag>NAVE ORION</DataTag>
                <DataTag>COHETE SLS</DataTag>
                <DataTag variant="accent">TRAYECTORIA DE RETORNO LIBRE</DataTag>
              </div>
            </FloatingPanel>
          </div>
        </Section>

        {/* 08. BIBLIOGRAFÍA */}
        <Section index={8} total={8} className="relative bg-zinc-100 text-black py-32 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] z-0">
            <h2 className="font-sans text-[20vw] leading-none whitespace-nowrap text-black font-black rotate-[-10deg]">
              REFERENCIAS
            </h2>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="border-b-4 border-black pb-4 mb-12 flex justify-between items-end">
              <h2 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tighter">
                Bibliografía
              </h2>
              <span className="font-mono text-sm">[08]</span>
            </div>
            
            <div className="columns-1 md:columns-2 gap-12 space-y-8 font-serif text-sm">
              <BibliographyEntry
                num="01"
                text='Vallejo, A. (2026, 23 de abril). La gran pega al coche eléctrico es que tarda mucho en cargarse. CATL tiene una solución de 6 minutos y 27 segundos. Xataka.'
                href="https://www.xataka.com/movilidad/catl-quiere-acabar-vez-todas-mayor-problema-coche-electrico-bateria-que-carga-seis-minutos"
              />
              <BibliographyEntry
                num="02"
                text='Birkby, J. & Soto-Vélez, G. (2025, 23 de marzo). Agricultura vertical. ATTRA.'
                href="https://attra.ncat.org/es/publication/agricultura-vertical/"
              />
              <BibliographyEntry
                num="03"
                text='Cloudflare. (2023, 23 de octubre). What is the cloud? | Definition of cloud.'
                href="https://www.cloudflare.com/es-es/learning/cloud/what-is-the-cloud/"
              />
              <BibliographyEntry
                num="04"
                text='Eufic. (2023, 19 de abril). Carne cultivada en laboratorio: cómo se elabora y cuáles son sus pros y sus contras.'
                href="https://www.eufic.org/es/produccion-de-alimentos/articulo/carne-cultivada-en-laboratorio-como-se-elabora-y-cuales-son-sus-pros-y-sus-contras/"
              />
              <BibliographyEntry
                num="05"
                text='Enel. (2025, 12 de diciembre). Célula fotovoltaica.'
                href="https://www.enel.com/es/learning-hub/renovables/energia-solar/celula-fotovoltaica"
              />
              <BibliographyEntry
                num="06"
                text='Fernández, Y. (2020, 9 de marzo). Qué es el 5G y qué diferencias tiene con el 4G. Xataka.'
                href="https://www.xataka.com/basics/que-5g-que-diferencias-tiene-4g"
              />
              <BibliographyEntry
                num="07"
                text='Grapheano medical care. (2024, 20 de abril). Grafeno en medicina.'
                href="https://graphenanomedicalcare.com/grafeno-en-medicina/"
              />
              <BibliographyEntry
                num="08"
                text='Hewlett-Packard. (2024, 28 de julio). How 3D printing prosthetics is changing the face of medicine.'
                href="https://www.hp.com/us-en/printers/3d-printers/learning-center/3d-printing-prosthetics.html"
              />
              <BibliographyEntry
                num="09"
                text='Infante-López, D., Céspedes-Galvis, M. & Wilches-Flórez, A. (2022). CRISPR-Cas9: el debate bioético más allá de la línea germinal. Persona y bioética, 25(2), 1-18.'
                href="https://doi.org/10.5294/pebi.2021.25.2.9"
              />
              <BibliographyEntry
                num="10"
                text='Jiménez, Á. (2026, 22 de abril). OpenAI lanza ChatGPT Images 2.0, un generador capaz de diseñar revistas enteras. El Mundo.'
                href="https://www.elmundo.es/tecnologia/creadores/2026/04/22/69e7f898fc6c83492e8b4594.html"
              />
              <BibliographyEntry
                num="11"
                text='National Aeronautics and Space Administration. (2026, 27 de abril). Mission: Artemis II.'
                href="https://www.nasa.gov/mission/artemis-ii/"
              />
              <BibliographyEntry
                num="12"
                text='National Geographic España. (2025, 15 de enero). Breve historia visual de la inteligencia artificial.'
                href="https://www.nationalgeographic.com.es/ciencia/breve-historia-visual-inteligencia-artificial_14419"
              />
              <BibliographyEntry
                num="13"
                text='McMahon, L. & Tidy, J. (2026, 17 de abril). Mythos, el nuevo modelo de IA de Anthropic que preocupa a gobiernos y bancos por su gran potencia. BBC.'
                href="https://www.bbc.com/mundo/articles/cr71x5vgr9go"
              />
            </div>

            {/* Documentación técnica */}
            <div className="mt-16 border-t-2 border-black pt-8">
              <h3 className="font-sans text-2xl md:text-3xl font-black uppercase tracking-tighter mb-6">
                Documentación Técnica
              </h3>
              <p className="font-serif text-sm text-black/60 mb-6">
                Recursos de aprendizaje para las tecnologías utilizadas en el desarrollo de este proyecto.
              </p>
              <div className="columns-1 md:columns-2 gap-12 space-y-6 font-serif text-sm">
                <BibliographyEntry
                  num="T1"
                  text="Three.js — Documentación oficial. Biblioteca JavaScript para gráficos 3D con WebGL."
                  href="https://threejs.org/docs/"
                />
                <BibliographyEntry
                  num="T2"
                  text="React Three Fiber — Renderizador de React para Three.js. Guía de inicio y API."
                  href="https://r3f.docs.pmnd.rs/getting-started/introduction"
                />
                <BibliographyEntry
                  num="T3"
                  text="Drei — Colección de helpers y abstracciones útiles para React Three Fiber."
                  href="https://drei.docs.pmnd.rs/getting-started/introduction"
                />
                <BibliographyEntry
                  num="T4"
                  text="React Three Postprocessing — Efectos de post-procesamiento (Bloom, Glitch, Noise) para R3F."
                  href="https://r3f.docs.pmnd.rs/tutorials/postprocessing"
                />
                <BibliographyEntry
                  num="T5"
                  text="React — Documentación oficial. Biblioteca para construir interfaces de usuario."
                  href="https://react.dev/learn"
                />
                <BibliographyEntry
                  num="T6"
                  text="Vite — Herramienta de build rápida para proyectos web modernos. Guía oficial."
                  href="https://vite.dev/guide/"
                />
                <BibliographyEntry
                  num="T7"
                  text="Tailwind CSS v4 — Framework de CSS utility-first. Documentación y configuración."
                  href="https://tailwindcss.com/docs"
                />
                <BibliographyEntry
                  num="T8"
                  text="TypeScript — Lenguaje tipado superset de JavaScript. Manual oficial."
                  href="https://www.typescriptlang.org/docs/handbook/"
                />
                <BibliographyEntry
                  num="T9"
                  text="Framer Motion — Biblioteca de animaciones para React. Guía de inicio."
                  href="https://motion.dev/docs/react-quick-start"
                />
                <BibliographyEntry
                  num="T10"
                  text="Lenis — Biblioteca de smooth scrolling para experiencias web fluidas."
                  href="https://lenis.darkroom.engineering/"
                />
              </div>
            </div>
            
            <div className="mt-24 pt-8 border-t border-black font-mono text-xs flex flex-col md:flex-row justify-between gap-4">
              <div>
                <p>TIPOGRAFÍAS: ARCHIVO BLACK, FRAUNCES, JETBRAINS MONO</p>
                <p>FECHA: 2026 // EDICIÓN DE PRUEBA ESTUDIANTIL</p>
              </div>
              <div className="text-left md:text-right">
                <p>DESPLEGADO EN VERCEL, V3.0//SIGLO_XXI</p>
                <p>OPEN SOURCE DISPONIBLE EN MI <a href="https://github.com/Netherstar44/SIGLO_XXI">GIT</a></p>
                <p className="text-primary font-bold mt-2 hover:text-glitch" data-text="&gt; END OF TRANSMISSION //">
                  &gt; END OF TRANSMISSION //
                </p>
              </div>
            </div>
          </div>
        </Section>
        
      </main>
    </>
  );
}

function BibliographyEntry({ num, text, href }: { num: string; text: string; href?: string }) {
  return (
    <div className="break-inside-avoid relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-4 before:h-[1px] before:bg-black">
      <span className="font-mono text-xs absolute -left-2 top-0 bg-zinc-100 px-1 leading-none">[{num}]</span>
      <span>{text}</span>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center ml-2 align-middle hover:scale-110 transition-transform"
          title="Ver fuente en navegador"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48" className="inline-block">
            <circle cx="24" cy="24" r="20" fill="#4285F4"/>
            <circle cx="24" cy="24" r="8" fill="#fff"/>
            <path d="M24 16h18.5c-2-4-5.4-7.2-9.6-9L24 24V16z" fill="#EA4335"/>
            <path d="M14.9 33l9.3-16.1L14.4 7C10.2 9.8 7.4 14 6.4 19L14.9 33z" fill="#FBBC05"/>
            <path d="M33 33l-9.3-16.1 9.8-9.9c3.2 3.3 5.2 7.7 5.2 12.7 0 5.3-2.3 10-5.9 13.3H33z" fill="#34A853"/>
            <circle cx="24" cy="24" r="6" fill="#4285F4"/>
          </svg>
        </a>
      )}
    </div>
  );
}

