import type { ReactNode, ElementType } from "react";
import clsx from "clsx";

type BaseProps<T extends ElementType = "div"> = {
  children: ReactNode;
  className?: string;
  as?: T;
};

export default function Base<T extends ElementType = "div">({
  children,
  className,
  as,
}: BaseProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={clsx(
        "w-full max-w-[1680px] mx-auto",
        className
      )}
    >
      {children}    
    </Component>
  );
}
