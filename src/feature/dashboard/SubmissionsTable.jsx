import Spinner from '../../ui/SpinnerMini';
import { Empty } from './Empty';
import { MobileCard } from './MobileCard';
import { TableRow } from './TableRow';

const COLS = ['S/N', 'Beneficiary Name', 'Amount', 'Bank', 'Status', 'Date'];

export default function SubmissionsTable({
  data,
  record,
  isLoading,
  page,
  pageSize,
  onRowClick,
}) {
  console.log(record);
  if (isLoading) return <Spinner />;
  if (!data.length) return <Empty />;

  return (
    <div className="flex-1 overflow-auto px-4 py-4 sm:px-6">
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-xl border border-white/10 sm:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/3">
              {COLS.map((h) => (
                <th
                  key={h}
                  className="text-text px-4 py-3 text-left font-semibold tracking-widest whitespace-nowrap uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <TableRow
                key={row.id}
                row={row}
                index={page * pageSize + i}
                onClick={onRowClick}
                striped={i % 2 !== 0}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-2 sm:hidden">
        {data.map((row, i) => (
          <MobileCard
            key={row.id}
            row={row}
            index={page * pageSize + i}
            onClick={onRowClick}
          />
        ))}
      </div>
    </div>
  );
}
