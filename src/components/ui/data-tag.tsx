import { cn } from "@/lib/utils";

interface DataTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "accent" | "destructive";
}

export function DataTag({ children, className, variant = "default", ...props }: DataTagProps) {
  const variants = {
    default: "bg-muted text-muted-foreground border-border",
    primary: "bg-primary/10 text-primary border-primary",
    accent: "bg-accent/10 text-accent border-accent",
    destructive: "bg-destructive/10 text-destructive border-destructive",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs font-mono font-medium border rounded-none whitespace-nowrap",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
