import { useState, useMemo } from 'react';
import { useSubmissionsForApproval } from './useSubmissions';
import { useUser } from '../authentication/useUser';
import { PAGE_SIZE } from '../../hook/page_size';

import TableHeader from './TableHeader';
import SubmissionsTable from './SubmissionsTable';
import TablePagination from './TablePagination';
import ApplicationModal from './ApplicationModal';

import DashboardContainer from '../../ui/DashboardContainer';
import MainContainer from '../../ui/MainContainer';
import DashboardLayout from '../../ui/DashboardLayout';

export default function DataTables() {
  const { user } = useUser();
  const { data: records = [], isLoading } = useSubmissionsForApproval();
  console.log('records:', records);

  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [sortKey, setSortKey] = useState('');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);

  const resetPage = () => setPage(0);

  const processed = useMemo(() => {
    let d = [...records];

    if (searchQuery.trim())
      d = d.filter((r) =>
        r.beneficiary?.[0]?.beneficiary_name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()),
      );
    if (status !== 'all') d = d.filter((r) => r.status === status);
    if (sortKey === 'date-desc')
      d.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    if (sortKey === 'date-asc')
      d.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    if (sortKey === 'amount-desc')
      d.sort(
        (a, b) =>
          (b.beneficiary?.[0]?.amount || 0) - (a.beneficiary?.[0]?.amount || 0),
      );
    if (sortKey === 'amount-asc')
      d.sort(
        (a, b) =>
          (a.beneficiary?.[0].amount || 0) - (b.beneficiary?.[0]?.amount || 0),
      );

    return d;
  }, [records, searchQuery, status, sortKey]);

  const pageCount = Math.ceil(processed.length / PAGE_SIZE);
  const pageData = processed.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const pending = records.filter((s) => s.status === 'pending').length;

  return (
    <DashboardContainer>
      <DashboardLayout />
      <MainContainer>
        <div className="flex h-full w-full flex-col overflow-hidden">
          <TableHeader
            role={user?.role}
            pending={pending}
            search={searchQuery}
            status={status}
            sortKey={sortKey}
            onSearch={(v) => {
              setSearchQuery(v);
              resetPage();
            }}
            onStatus={(v) => {
              setStatus(v);
              resetPage();
            }}
            onSort={(v) => {
              setSortKey(v);
              resetPage();
            }}
            setSearchQuery={setSearchQuery}
          />

          <SubmissionsTable
            data={pageData}
            isLoading={isLoading}
            page={page}
            pageSize={PAGE_SIZE}
            onRowClick={setSelected}
            record={records}
          />

          <TablePagination
            page={page}
            pageCount={pageCount}
            total={processed.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>
      </MainContainer>

      {selected && (
        <ApplicationModal
          record={selected}
          userRole={user?.role}
          onClose={() => setSelected(null)}
        />
      )}
    </DashboardContainer>
  );
}
