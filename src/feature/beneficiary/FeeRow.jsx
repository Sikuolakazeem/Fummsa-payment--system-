export function FeeRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between text-[0.9rem]">
      <span className={highlight ? 'text-text font-medium' : 'text-text'}>
        {label}
      </span>
      <span className={highlight ? 'text-text font-semibold' : 'text-text'}>
        {value}
      </span>
    </div>
  );
}
