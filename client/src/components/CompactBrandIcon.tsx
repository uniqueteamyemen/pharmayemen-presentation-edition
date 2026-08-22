type CompactBrandIconProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function CompactBrandIcon({ size = "md", className = "" }: CompactBrandIconProps) {
  return (
    <span
      className={`compact-brand-icon compact-brand-icon--${size} ${className}`.trim()}
      aria-hidden="true"
    >
      <span className="grid h-full w-full place-items-center rounded-[inherit] bg-emerald-700 text-[0.45em] font-black text-white">PY</span>
    </span>
  );
}
