import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function CreditsOverlay({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-auto"
        >
          {/* Backdrop blur */}
          <div 
            className="absolute inset-0 bg-[#030811]/90 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-black border border-[#00ffff]/30 shadow-[0_0_30px_rgba(0,255,255,0.1)] overflow-y-auto custom-scrollbar"
          >
            {/* Header */}
            <div className="sticky top-0 bg-black/90 backdrop-blur-md border-b border-[#00ffff]/20 p-6 flex justify-between items-center z-10">
              <div>
                <h2 className="font-sans text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
                  Registro del Sistema
                </h2>
                <div className="font-mono text-xs text-[#00ffff]/70 mt-1">
                  &gt; AUTORES Y REFERENCIAS BIBLIOGRÁFICAS //
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-[#00ffff]/10 hover:bg-[#00ffff]/20 flex items-center justify-center rounded-full text-[#00ffff] transition-colors border border-[#00ffff]/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-10 space-y-16">
              
              {/* Autores */}
              <section>
                <h3 className="font-mono text-sm text-[#00ffff] border-b border-[#00ffff]/20 pb-2 mb-6">
                  &lt; ARQUITECTOS DE LA SIMULACIÓN /&gt;
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                  <div className="bg-[#030811] p-6 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#00ffff]" />
                    <h4 className="font-sans text-xl font-bold mb-2">Jose David Correa</h4>
                    <p className="font-mono text-xs text-white/50">INGENIERÍA Y DISEÑO</p>
                  </div>
                  <div className="bg-[#030811] p-6 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#00ffff]" />
                    <h4 className="font-sans text-xl font-bold mb-2">Simon Santiago Puentes</h4>
                    <p className="font-mono text-xs text-white/50">INGENIERÍA Y DISEÑO</p>
                  </div>
                </div>
              </section>

              {/* Bibliografía */}
              <section>
                <h3 className="font-mono text-sm text-[#00ffff] border-b border-[#00ffff]/20 pb-2 mb-6">
                  &lt; BASES DE DATOS EXTERNAS /&gt;
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-serif text-sm text-white/80">
                  <BibliographyEntry
                    num="01"
                    text='Vallejo, A. (2026). La gran pega al coche eléctrico es que tarda mucho en cargarse. CATL tiene una solución. Xataka.'
                    href="https://www.xataka.com/movilidad/catl-quiere-acabar-vez-todas-mayor-problema-coche-electrico-bateria-que-carga-seis-minutos"
                  />
                  <BibliographyEntry
                    num="02"
                    text='Birkby, J. & Soto-Vélez, G. (2025). Agricultura vertical. ATTRA.'
                    href="https://attra.ncat.org/es/publication/agricultura-vertical/"
                  />
                  <BibliographyEntry
                    num="03"
                    text='Cloudflare. (2023). What is the cloud? | Definition of cloud.'
                    href="https://www.cloudflare.com/es-es/learning/cloud/what-is-the-cloud/"
                  />
                  <BibliographyEntry
                    num="04"
                    text='Eufic. (2023). Carne cultivada en laboratorio: cómo se elabora y pros/contras.'
                    href="https://www.eufic.org/es/produccion-de-alimentos/articulo/carne-cultivada-en-laboratorio-como-se-elabora-y-cuales-son-sus-pros-y-sus-contras/"
                  />
                  <BibliographyEntry
                    num="05"
                    text='Fernández, Y. (2020). Qué es el 5G y qué diferencias tiene con el 4G. Xataka.'
                    href="https://www.xataka.com/basics/que-5g-que-diferencias-tiene-4g"
                  />
                  <BibliographyEntry
                    num="06"
                    text='Grapheano medical care. (2024). Grafeno en medicina.'
                    href="https://graphenanomedicalcare.com/grafeno-en-medicina/"
                  />
                  <BibliographyEntry
                    num="07"
                    text='Infante-López, D. et al. (2022). CRISPR-Cas9: el debate bioético. Persona y bioética, 25(2).'
                    href="https://doi.org/10.5294/pebi.2021.25.2.9"
                  />
                  <BibliographyEntry
                    num="08"
                    text='National Aeronautics and Space Administration. (2026). Mission: Artemis II.'
                    href="https://www.nasa.gov/mission/artemis-ii/"
                  />
                  <BibliographyEntry
                    num="09"
                    text='McMahon, L. & Tidy, J. (2026). Mythos, el nuevo modelo de IA de Anthropic. BBC.'
                    href="https://www.bbc.com/mundo/articles/cr71x5vgr9go"
                  />
                  <BibliographyEntry
                    num="10"
                    text='Veritasium. (2021). The weight of internet. YouTube.'
                  />
                  <BibliographyEntry
                    num="11"
                    text='NASA. (2011). Astronomers Find Largest, Most Distant Reservoir of Water.'
                    href="https://www.nasa.gov/topics/universe/features/universe20110722.html"
                  />
                  <BibliographyEntry
                    num="12"
                    text='EPA. (2022). Natural Radioactivity in Food.'
                    href="https://www.epa.gov/radtown/natural-radioactivity-food"
                  />
                  <BibliographyEntry
                    num="13"
                    text='Godfrey-Smith, P. (2016). Other Minds: The Octopus, the Sea, and the Deep Origins of Consciousness.'
                  />
                  <BibliographyEntry
                    num="14"
                    text='Nature. (2014). DNA packaging: Nucleosomes and Chromatin.'
                    href="https://www.nature.com/scitable/topicpage/dna-packaging-nucleosomes-and-chromatin-710/"
                  />
                </div>
              </section>

              {/* Documentación técnica */}
              <section>
                <h3 className="font-mono text-sm text-[#00ffff] border-b border-[#00ffff]/20 pb-2 mb-6">
                  &lt; DEPENDENCIAS DEL SISTEMA /&gt;
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-serif text-sm text-white/80">
                  <BibliographyEntry num="T1" text="Three.js — Biblioteca JavaScript para gráficos 3D con WebGL." href="https://threejs.org/docs/" />
                  <BibliographyEntry num="T2" text="React Three Fiber — Renderizador de React para Three.js." href="https://r3f.docs.pmnd.rs/" />
                  <BibliographyEntry num="T3" text="React — Biblioteca para interfaces de usuario." href="https://react.dev/" />
                  <BibliographyEntry num="T4" text="Framer Motion — Biblioteca de animaciones para React." href="https://motion.dev/" />
                </div>
              </section>

              <div className="pt-8 border-t border-white/10 font-mono text-xs text-white/40 flex justify-between">
                <span>EDICIÓN CERO // SIGLO XXI</span>
                <span>FIN DEL REGISTRO</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BibliographyEntry({ num, text, href }: { num: string; text: string; href?: string }) {
  return (
    <div className="relative pl-8">
      <span className="font-mono text-xs absolute left-0 top-1 text-[#00ffff]">[{num}]</span>
      <span>{text}</span>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center ml-2 align-middle hover:scale-110 transition-transform opacity-70 hover:opacity-100"
          title="Ver fuente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      )}
    </div>
  );
}
