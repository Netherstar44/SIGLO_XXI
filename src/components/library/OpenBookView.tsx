import { motion, AnimatePresence } from "framer-motion";
import { libraryBooks } from "@/data/library-books";
import { X, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";

export function OpenBookView({ 
  bookId, 
  onClose,
  onNavigate
}: { 
  bookId: string | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const book = libraryBooks.find(b => b.id === bookId);

  useEffect(() => {
    if (!bookId) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = libraryBooks.findIndex(b => b.id === bookId);
      if (currentIndex === -1) return;
      
      if (e.key === "ArrowLeft") {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : libraryBooks.length - 1;
        onNavigate(libraryBooks[newIndex].id);
      } else if (e.key === "ArrowRight") {
        const newIndex = currentIndex < libraryBooks.length - 1 ? currentIndex + 1 : 0;
        onNavigate(libraryBooks[newIndex].id);
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [bookId, onNavigate, onClose]);

  const handlePrev = () => {
    if (!bookId) return;
    const currentIndex = libraryBooks.findIndex(b => b.id === bookId);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : libraryBooks.length - 1;
    onNavigate(libraryBooks[newIndex].id);
  };

  const handleNext = () => {
    if (!bookId) return;
    const currentIndex = libraryBooks.findIndex(b => b.id === bookId);
    const newIndex = currentIndex < libraryBooks.length - 1 ? currentIndex + 1 : 0;
    onNavigate(libraryBooks[newIndex].id);
  };

  return (
    <AnimatePresence mode="wait">
      {book && (
        <motion.div
          key={book.id}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-8 lg:p-16 pointer-events-none"
        >
          {/* Backdrop blur */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-auto"
            onClick={onClose}
          />
          
          <div className="relative w-full max-w-6xl h-[85vh] bg-[#0c0f12] shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-sm flex flex-col md:flex-row overflow-hidden pointer-events-auto border border-white/5">
            
            {/* Center fold shadow */}
            <div className="absolute left-1/2 top-0 bottom-0 w-12 -ml-6 bg-gradient-to-r from-transparent via-black/80 to-transparent z-20 hidden md:block mix-blend-multiply pointer-events-none" />
            
            {/* Left Page (Text Content) */}
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 lg:p-16 flex flex-col justify-between overflow-y-auto border-b md:border-b-0 md:border-r border-white/10 text-white">
              {/* Subtle tech dot grid background */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <span className="font-mono text-xs text-[#00ffff]/70 tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00ffff] animate-pulse" />
                    VOL. ∞ // ARCHIVO
                  </span>
                  <BookOpen className="w-5 h-5 text-white/40" />
                </div>
                
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-8 text-white drop-shadow-md">
                  {book.title}
                </h2>
                
                <div className="space-y-6">
                  {book.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="font-serif text-base md:text-lg leading-relaxed text-white/70">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-12">
                  {book.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 text-white/80 border border-white/10 font-mono text-xs uppercase tracking-wider rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="relative z-10 mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                <span className="font-mono text-xs text-white/40">&lt; PÁGINA IZQUIERDA /&gt;</span>
                <span className="font-mono text-xs text-white/40">SIGLO XXI // SISTEMA CENTRAL</span>
              </div>
            </div>
            
            {/* Right Page (Visual/3D Content - Holographic Projection) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#030811] relative flex flex-col overflow-hidden">
              
              {/* Holographic Grid Background */}
              <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
                style={{ 
                  backgroundImage: 'linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)', 
                  backgroundSize: '40px 40px' 
                }} 
              />
              
              {/* Glowing Corner Accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00ffff] opacity-50 pointer-events-none" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#00ffff] opacity-50 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#00ffff] opacity-50 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00ffff] opacity-50 pointer-events-none" />

              {/* Scanning Line Animation */}
              <motion.div 
                className="absolute left-0 right-0 h-1 bg-[#00ffff]/30 shadow-[0_0_15px_#00ffff] z-20 pointer-events-none"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              />

              {book.imageUrl ? (
                <div className="w-full h-full relative z-10 flex items-center justify-center p-8 bg-[#010204]">
                  <img 
                    src={book.imageUrl} 
                    alt={book.title} 
                    className="max-w-full max-h-full object-contain rounded-sm border border-[#00ffff]/20 shadow-[0_0_30px_rgba(0,255,255,0.15)]"
                  />
                  {/* Overlay elements over the image */}
                  <div className="absolute bottom-6 left-6 right-6 pointer-events-none z-20">
                    <div className="bg-[#030811]/80 backdrop-blur-md border border-[#00ffff]/30 p-4 font-mono text-xs text-[#00ffff]/80 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                      &gt; REGISTRO VISUAL EXTRAÍDO // <br/>
                      &gt; ARCHIVO: {book.title.toUpperCase()} // <br/>
                      <span className="text-white/60 mt-1 inline-block">ANÁLISIS COMPLETADO_</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Canvas 
                    shadows
                    dpr={[1, 2]} 
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    className="w-full h-full cursor-grab active:cursor-grabbing z-10"
                  >
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" castShadow />
                    <directionalLight position={[-10, -10, -5]} intensity={1} color="#00ffff" />
                    
                    <Suspense fallback={null}>
                      {book.Scene && <book.Scene />}
                    </Suspense>
                  </Canvas>
                  
                  {/* Overlay elements over the 3D scene */}
                  <div className="absolute bottom-6 left-6 right-6 pointer-events-none z-20">
                    <div className="bg-[#030811]/80 backdrop-blur-md border border-[#00ffff]/30 p-4 font-mono text-xs text-[#00ffff]/80 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                      &gt; INICIALIZANDO PROYECCIÓN HOLOGRÁFICA // <br/>
                      &gt; MÓDULO: {book.title.toUpperCase()} // <br/>
                      <span className="text-white/60 mt-1 inline-block">INTERACCIÓN MANUAL HABILITADA_</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center rounded-full text-white transition-colors z-50 border border-white/20"
              aria-label="Cerrar libro"
            >
              <X className="w-5 h-5" />
            </button>
            
          </div>

          {/* External Navigation Arrows (Desktop mostly) */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 hidden md:flex items-center justify-center bg-black/50 hover:bg-[#00ffff]/20 border border-[#00ffff]/30 rounded-full text-[#00ffff] pointer-events-auto backdrop-blur-md transition-all z-50"
          >
            <ChevronLeft />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 hidden md:flex items-center justify-center bg-black/50 hover:bg-[#00ffff]/20 border border-[#00ffff]/30 rounded-full text-[#00ffff] pointer-events-auto backdrop-blur-md transition-all z-50"
          >
            <ChevronRight />
          </button>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
