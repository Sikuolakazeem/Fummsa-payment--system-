import { StatusBadge } from './StatusBadge';

export function TableRow({ row, index, onClick, striped }) {
  return (
    <tr
      onClick={() => onClick(row)}
      className={`hover:bg-table-hover cursor-pointer border-b border-white/5 transition-colors ${striped ? 'bg-white/1' : 'bg-transparent'}`}
    >
      <td className="px-4 py-3.5">
        <span className="text-text text-xs">
          {String(index + 1).padStart(2, '0')}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <span className="text-text font-mono font-medium whitespace-nowrap">
          {row.beneficiary?.[0]?.beneficiary_name}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <span className="text-text">
          ₦{Number(row.beneficiary?.[0]?.amount || 0).toLocaleString()}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <span className="text-text whitespace-nowrap">
          {row.beneficiary?.[0]?.bank_name}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <StatusBadge status={row.status} />
      </td>
      <td className="px-4 py-3.5">
        <span className="text-text text-xs whitespace-nowrap">
          {row.created_at
            ? new Date(row.created_at).toLocaleDateString('en-GB')
            : '—'}
        </span>
      </td>
    </tr>
  );
}
