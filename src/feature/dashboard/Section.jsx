export function Section({ title, children }) {
  return (
    <div>
      <p className="text-text mb-3 text-[12px] font-semibold tracking-widest uppercase">
        {title}
      </p>
      <div className="rounded-xl border border-white/5 p-3 sm:p-4">
        {children}
      </div>
    </div>
  );
}
