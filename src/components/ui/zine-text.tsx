import { cn } from "@/lib/utils";

interface ZineTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  text: string;
  glitchOnHover?: boolean;
}

export function ZineText({
  as: Component = "h2",
  text,
  className,
  glitchOnHover = true,
  ...props
}: ZineTextProps) {
  return (
    <Component
      className={cn(
        "font-sans uppercase font-black leading-none tracking-tighter",
        glitchOnHover && "hover:text-glitch transition-colors duration-200",
        className
      )}
      data-text={text}
      {...props}
    >
      {text}
    </Component>
  );
}
