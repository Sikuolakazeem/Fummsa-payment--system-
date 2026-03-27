import { StatusBadge } from './StatusBadge';

export function MobileCard({ row, index, onClick }) {
  return (
    <div
      onClick={() => onClick(row)}
      className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/2 p-4 transition-colors hover:bg-[#c49a6c]/5 active:scale-[0.99]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 font-mono text-xs text-[#5a5448]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[#e8e3d9]">
            {row.beneficiary?.[0]?.beneficiary_name}
          </p>
          <p className="mt-0.5 text-xs text-[#7a7060]">
            {row.beneficiary?.[0]?.bank_name} •
            <span className="text-[#c49a6c]">
              ₦{Number(row.beneficiary?.[0]?.amount || 0).toLocaleString()}
            </span>
          </p>
        </div>
      </div>
      <div className="ml-2 flex shrink-0 items-center gap-2">
        <StatusBadge status={row.status} />
        <span className="text-xs text-[#5a5448]">›</span>
      </div>
    </div>
  );
}
