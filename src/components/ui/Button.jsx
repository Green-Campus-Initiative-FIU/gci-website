import { cn } from "@/utils/cn";

const VARIANTS = {
  primary: "primary-btn",
  secondary: "secondary-btn",
  category: "category-btn",
  readMore: "read-more-btn",
  loadMore: "load-more-btn",
};

const SIZES = {
  sm: "",
  md: "",
  lg: "",
};

export default function Button({
  as = "button",
  type = "button",
  variant = "primary",
  size = "md",
  active = false,
  disabled = false,
  icon: Icon,
  iconPosition = "start",
  iconClassName,
  label,
  className,
  "aria-selected": ariaSelected,
  role,
  onClick,
  ...rest
}) {
  const Comp = as;
  const base = VARIANTS[variant] ?? VARIANTS.primary;
  const sizeClass = SIZES[size] ?? SIZES.md;

  const IconEl = Icon ? <Icon className={cn("size-4", iconClassName)} /> : null;

  return (
    <Comp
      type={as === "button" ? type : undefined}
      role={role}
      aria-selected={ariaSelected}
      onClick={onClick}
      className={cn(
        "inline-flex items-center",
        base,
        sizeClass,
        active && "bg-light-green text-white",
        className
      )}
      {...rest}
    >
      {iconPosition === "start" && IconEl}
      {label && <span>{label}</span>}
      {iconPosition === "end" && IconEl}
    </Comp>
  );
}
