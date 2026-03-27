export function VCMobileCard({ sub, index }) {
  const ben = sub.beneficiary?.[0];
  return (
    <div className="border-border bg-bg rounded-xl border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-text text-[0.9rem]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="text-text truncate text-sm font-medium">
              {ben?.beneficiary_name}
            </p>
          </div>
          <p className="text-text text-[0.8rem]">
            {ben?.bank_name} • {ben?.account_number}
          </p>
          <p className="text-text mt-0.5 text-[0.8rem]">
            {ben?.vote_head} • {ben?.nature_of_exp}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-text font-mono text-[0.8rem]">
            ₦{Number(ben?.amount || 0).toLocaleString()}
          </p>
          <p className="text-text mt-1 text-[12px]">
            {sub.created_at
              ? new Date(sub.created_at).toLocaleDateString('en-GB')
              : '—'}
          </p>
        </div>
      </div>
    </div>
  );
}
