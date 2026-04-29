import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@/components/ui/loader";
import { BookshelfScene } from "@/components/library/BookshelfScene";
import { OpenBookView } from "@/components/library/OpenBookView";
import { CreditsOverlay } from "@/components/library/CreditsOverlay";
import { ZineText } from "@/components/ui/zine-text";

export default function Home() {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [showCredits, setShowCredits] = useState(false);
  const [mobilePan, setMobilePan] = useState(0);

  return (
    <>
      <Loader />
      <div className="noise-overlay" />
      
      <main className="relative w-full h-screen bg-[#0c0a08] overflow-hidden">
        
        {/* Title overlay */}
        <div className="absolute top-8 left-8 z-10 pointer-events-none mix-blend-difference">
          <div className="font-mono text-xs md:text-sm tracking-widest text-[#00ffff]/70 mb-2 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
            ARCHIVO HISTÓRICO // INTERFAZ HOLOGRÁFICA ACTIVADA
          </div>
          <ZineText 
            text="SIGLO XXI" 
            className="text-4xl md:text-6xl text-white"
          />
        </div>

        {/* Info/Credits Button */}
        <button
          onClick={() => setShowCredits(true)}
          className={`absolute top-8 right-8 z-10 font-mono text-xs tracking-widest border border-[#00ffff]/30 px-4 py-2 bg-[#030811]/50 backdrop-blur-sm text-[#00ffff] hover:bg-[#00ffff]/10 transition-colors shadow-[0_0_15px_rgba(0,255,255,0.1)] ${selectedBookId ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          [ SISTEMA: AUTORES Y REFERENCIAS ]
        </button>

        {/* 3D Library Scene */}
        <div className="absolute inset-0">
          <Canvas 
            shadows
            dpr={[1, 2]} 
            camera={{ position: [0, 0, 9], fov: 45 }}
            gl={{ antialias: true, alpha: false }}
          >
            <Suspense fallback={null}>
              <BookshelfScene 
                selectedBookId={selectedBookId}
                onSelectBook={setSelectedBookId}
                mobilePan={mobilePan}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Book Reading View Overlay */}
        <OpenBookView 
          bookId={selectedBookId} 
          onClose={() => setSelectedBookId(null)} 
          onNavigate={(id) => setSelectedBookId(id)}
        />
        
        {/* Help text */}
        <div 
          className={`absolute bottom-8 left-0 right-0 flex justify-center z-10 pointer-events-none transition-opacity duration-500 ${
            selectedBookId ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="bg-[#030811]/80 backdrop-blur-md px-6 py-2 border border-[#00ffff]/30 text-[#00ffff] font-mono text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,255,0.15)] flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00ffff] animate-pulse" />
            <span className="hidden md:inline">Selecciona un volumen para extraer simulación</span>
            <span className="md:hidden">Toca un volumen para extraer</span>
          </div>
        </div>

        {/* Touch Pan Controls (Slider for mobile) */}
        <div 
          className={`absolute bottom-24 left-0 right-0 flex justify-center z-20 pointer-events-auto transition-opacity duration-500 md:hidden px-8 ${
            selectedBookId ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="w-full max-w-sm bg-[#030811]/90 backdrop-blur-xl p-4 rounded-xl border border-[#00ffff]/40 shadow-[0_0_20px_rgba(0,255,255,0.2)] flex flex-col gap-3">
            <div className="flex justify-between text-[#00ffff] font-mono text-[10px] tracking-widest">
              <span>&lt; VOL.01</span>
              <span className="opacity-70">NAVEGADOR</span>
              <span>VOL.27 &gt;</span>
            </div>
            <input 
              type="range" 
              min="-1" 
              max="1" 
              step="0.01" 
              value={mobilePan} 
              onChange={(e) => setMobilePan(parseFloat(e.target.value))} 
              className="w-full accent-[#00ffff] bg-white/10 rounded-full h-1.5 appearance-none outline-none cursor-grab active:cursor-grabbing"
            />
          </div>
        </div>

        {/* Credits Overlay */}
        <CreditsOverlay 
          isOpen={showCredits} 
          onClose={() => setShowCredits(false)} 
        />
      </main>
    </>
  );
}
