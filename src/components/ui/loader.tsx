import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INICIALIZANDO SISTEMA...");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const texts = [
      "CARGANDO TIPOGRAFÍAS...",
      "CALIBRANDO GEOMETRÍAS...",
      "INICIANDO MOTOR 3D...",
      "SINTETIZANDO NOISE...",
      "COMPILANDO ..."
    ];

    let currentText = 0;
    const textInterval = setInterval(() => {
      currentText = (currentText + 1) % texts.length;
      setText(texts[currentText]);
    }, 400);

    const startTime = Date.now();
    const duration = 2500; // 2.5s loading

    const animateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const p = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(p);

      if (p < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        clearInterval(textInterval);
        setText("SISTEMA LISTO. ACCEDIENDO.");
        setTimeout(() => setIsLoaded(true), 500);
      }
    };

    requestAnimationFrame(animateProgress);

    return () => {
      clearInterval(textInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-8 overflow-hidden"
        >
          <div className="w-full max-w-md flex flex-col gap-4">
            <div className="flex justify-between font-mono text-sm text-primary">
              <span>{text}</span>
              <span>{progress}%</span>
            </div>

            <div className="h-1 w-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>

            <div className="mt-8 font-sans font-black text-4xl md:text-6xl opacity-20 tracking-tighter text-center">
              INGENIERÍA DEL FUTURO
            </div>
          </div>

          <div className="absolute bottom-8 left-8 font-mono text-xs text-muted-foreground">
            V. 1.0.0 // EDICIÓN CLANDESTINA
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
