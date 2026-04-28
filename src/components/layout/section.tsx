import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useScroll, motion, useTransform } from "framer-motion";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  index: number;
  total: number;
}

export function Section({ children, className, index, total, ...props }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      ref={ref}
      className={cn("relative min-h-screen w-full flex items-center py-20 px-4 md:px-12 lg:px-24 overflow-hidden", className)}
      {...props}
    >
      {/* Scroll Indicator */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-50 mix-blend-difference hidden md:flex text-white">
        <span className="font-mono text-xs opacity-50">[{String(index).padStart(2, '0')}]</span>
        <div className="w-[1px] h-24 bg-white/20 relative">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-white"
            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>
        <span className="font-mono text-xs opacity-50">[{String(total).padStart(2, '0')}]</span>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center">
        {children}
      </div>
    </section>
  );
}
