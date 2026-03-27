export function StatusBadge({ status }) {
  const cfg = {
    pending: {
      cls: 'bg-(--color-pending-bg) text-(--color-pending-text)  border-(--color-pending-border)',
      dot: 'bg-amber-400',
    },

    approved: {
      cls: 'bg-(--color-approved-bg) text-(--color-approved-text)  border-(--color-approved-border)',
      dot: 'bg-green-400',
    },
    rejected: {
      cls: 'bg-(--color-rejected-bg) text-(--color-rejected-text)  border-(--color-rejected-border)',
      dot: 'bg-red-400',
    },
  };
  const s = cfg[status] || cfg.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${s.cls}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}
