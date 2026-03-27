export function FormField({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium tracking-wider text-gray-700 uppercase">
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-400">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
