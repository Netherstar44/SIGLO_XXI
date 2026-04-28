import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface FloatingPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  expandable?: boolean;
  expandedContent?: React.ReactNode;
  randomRotation?: boolean;
}

export function FloatingPanel({
  children,
  className,
  expandable = false,
  expandedContent,
  randomRotation = true,
  ...props
}: FloatingPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotation = useRef(randomRotation ? Math.random() * 6 - 3 : 0);

  return (
    <motion.div
      initial={{ rotate: rotation.current }}
      whileHover={expandable ? { scale: 1.02, rotate: 0 } : {}}
      onClick={() => expandable && setIsExpanded(!isExpanded)}
      className={cn(
        "bg-card border-2 border-border p-6 shadow-[8px_8px_0_0_var(--color-primary)]",
        "relative mix-blend-normal overflow-hidden",
        expandable && "cursor-pointer",
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      
      {expandable && expandedContent && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          className="overflow-hidden mt-4 pt-4 border-t border-border/50 relative z-10"
        >
          {expandedContent}
        </motion.div>
      )}
      
      {/* Brutalist tape/corner accents */}
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-destructive rotate-45 z-0" />
    </motion.div>
  );
}
