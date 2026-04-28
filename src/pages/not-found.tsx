import { ZineText } from "@/components/ui/zine-text";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="noise-overlay" />

      <div className="relative z-10 text-center px-4 mix-blend-difference text-white">
        <div className="font-mono text-destructive tracking-widest mb-4">ERROR 404</div>
        <ZineText
          text="PÁGINA NO"
          className="text-6xl md:text-8xl lg:text-[8rem] text-destructive break-words max-w-full"
        />
        <ZineText
          text="ENCONTRADA"
          className="text-6xl md:text-8xl lg:text-[8rem] text-transparent mt-[-1rem] relative z-20 transform -rotate-2"
          style={{ WebkitTextStroke: "2px #fff" }}
        />

        <p className="font-serif text-xl mt-12 max-w-lg mx-auto text-white/70">
          La ruta solicitada no existe en esta edición de la . Los datos pueden haber sido corruptos o movidos a otro sector.
        </p>

        <div className="mt-12">
          <Link href="/" className="font-mono bg-white text-black px-6 py-3 uppercase font-bold hover:bg-primary transition-colors inline-block">
            &gt; VOLVER A LA PORTADA
          </Link>
        </div>
      </div>

      {/* Background shapes */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-destructive/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
    </div>
  );
}
