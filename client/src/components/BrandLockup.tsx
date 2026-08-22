import { useLanguage } from "@/contexts/LanguageContext";

type BrandLockupProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLockup({ compact = false, className = "" }: BrandLockupProps) {
  const { language } = useLanguage();
  const subtitle = language === "ar" ? "منصة الدواء اليمني" : "Yemen Pharma Intelligence";

  return (
    <div className={`brand-lockup ${compact ? "brand-lockup--compact" : ""} ${className}`.trim()}>
      <span className="brand-mark" aria-hidden="true">
        <span className="grid h-full w-full place-items-center rounded-[inherit] bg-emerald-700 text-[0.55em] font-black text-white">PY</span>
      </span>
      <span className="brand-lockup__copy">
        <span className="brand-wordmark">Pharma<span>Yemen</span></span>
        {!compact && <span className="brand-subtitle">{subtitle}</span>}
      </span>
    </div>
  );
}
