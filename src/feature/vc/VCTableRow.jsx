export function VCTableRow({ sub, index }) {
  const ben = sub.beneficiary?.[0];
  return (
    <tr
      className={`border-border hover:bg-primary-hover border-b transition-colors ${index % 2 === 0 ? 'bg-transparent' : 'bg-red'}`}
    >
      <td className="px-4 py-3.5">
        <span className="text-text text-xs">
          {String(index + 1).padStart(2, '0')}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <span className="text-text whitespace-nowrap">
          {ben?.beneficiary_name || '—'}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <span className="text-text">
          ₦{Number(ben?.amount || 0).toLocaleString()}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <span className="text-text whitespace-nowrap">
          {ben?.bank_name || '—'}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <span className="text-text text-[0.9rem]">
          {ben?.account_number || '—'}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <span className="text-text whitespace-nowrap">
          {ben?.vote_head || '—'}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <span className="text-text whitespace-nowrap">
          {ben?.nature_of_exp || '—'}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <span className="text-text text-[0.9rem] whitespace-nowrap">
          {sub.created_at
            ? new Date(sub.created_at).toLocaleDateString('en-GB')
            : '—'}
        </span>
      </td>
    </tr>
  );
}
