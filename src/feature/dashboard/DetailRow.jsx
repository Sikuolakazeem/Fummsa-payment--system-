export function DetailRow({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-text text-[11px] font-medium tracking-wider uppercase">
        {label}
      </span>
      <span className="text-text-modal text-sm font-medium wrap-break-word">
        {value}
      </span>
    </div>
  );
}
