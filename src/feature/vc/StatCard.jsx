export function StatCard({ label, value, sub }) {
  return (
    <div className="border-border bg-bg rounded-xl border p-4">
      <p className="text-text mb-1 text-[12px] font-medium tracking-widest uppercase">
        {label}
      </p>
      <p className="text-text text-xl font-semibold">{value}</p>
      {sub && <p className="text-text mt-0.5 text-xs">{sub}</p>}
    </div>
  );
}
