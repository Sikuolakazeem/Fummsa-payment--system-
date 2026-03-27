import { FiSearch } from 'react-icons/fi';
import { HiOutlineDatabase } from 'react-icons/hi';
import { useState, useMemo } from 'react';
import DashboardContainer from '../../ui/DashboardContainer';
import MainContainer from '../../ui/MainContainer';
import DashboardLayout from '../../ui/DashboardLayout';
import { useUser } from '../authentication/useUser';

import { downloadPDF } from '../../hook/downloadPDF';
import { StatCard } from './StatCard';
import { VCTableRow } from './VCTableRow';
import { VC_PAGE_SIZE } from '../../hook/page_size';
import { COLS } from '../../hook/approval_order';
import { useApprovedSubmissions } from '../dashboard/useSubmissions';
import TablePagination from '../dashboard/TablePagination';
import { SearchInput } from '../dashboard/SearchInput';
import { Empty } from '../dashboard/Empty';

export default function VCDashboard() {
  const { user } = useUser();
  const { data: records = [], isLoading } = useApprovedSubmissions();
  const [search] = useState('');
  // setSearch
  const [sortKey, setSortKey] = useState('date-desc');
  const [page, setPage] = useState(0);

  const processed = useMemo(() => {
    let d = [...records];
    if (search.trim())
      d = d.filter((r) =>
        r.beneficiary?.[0]?.beneficiary_name
          ?.toLowerCase()
          .includes(search.toLowerCase()),
      );
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
          (a.beneficiary?.[0]?.amount || 0) - (b.beneficiary?.[0]?.amount || 0),
      );
    return d;
  }, [records, search, sortKey]);

  const pageCount = Math.ceil(processed.length / VC_PAGE_SIZE);
  const pageData = processed.slice(
    page * VC_PAGE_SIZE,
    (page + 1) * VC_PAGE_SIZE,
  );
  const totalAmount = processed.reduce(
    (sum, r) => sum + Number(r.beneficiary?.[0]?.amount || 0),
    0,
  );

  const roleLabel = user?.role?.toUpperCase();

  return (
    <DashboardContainer>
      <DashboardLayout />
      <MainContainer>
        <div className="flex h-full w-full flex-col overflow-hidden ">
          <div className="bg-bg border-border shrink-0 border-b px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-text text-sm text-[1.7rem] font-semibold sm:text-lg">
                  {roleLabel} Dashboard
                </h1>
                <p className="text-text mt-0.5 text-[13px] sm:text-xs">
                  All approved payment submissions
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadPDF(processed, totalAmount)}
                  className="hover:bg-text/70 text-bg bg-text flex h-9 items-center gap-2 rounded-lg px-4 text-xs font-medium transition-all"
                >
                  <span>↓</span>
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                </button>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <div className="relative flex-1 sm:flex-none">
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xs text-[#5a5448]">
                  <FiSearch className="absolute top-1/2 -translate-y-1/2 text-gray-400" />
                </span>
                {/* <input
                  type="text"
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                  }}
                  className="h-9 w-full rounded-lg border border-white/10 bg-white/5 pr-3 pl-8 text-xs text-[#c9c0b0] placeholder-[#4a4840] transition-colors focus:border-[#c49a6c]/50 focus:outline-none sm:w-44"
                /> */}
                <SearchInput />
              </div>
              <select
                value={sortKey}
                onChange={(e) => {
                  setSortKey(e.target.value);
                  setPage(0);
                }}
                className="text-bg h-9 cursor-pointer rounded-lg border border-white/10 bg-[#16150f] px-3 text-xs focus:outline-none"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Amount — High</option>
                <option value="amount-asc">Amount — Low</option>
              </select>
            </div>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-3 px-4 py-4 text-[0.8rem] sm:grid-cols-3 sm:px-6">
            <StatCard
              label="Total Approved"
              value={processed.length}
              sub="applications"
            />
            <StatCard
              label="Total Amount"
              value={`₦${totalAmount.toLocaleString()}`}
              sub="disbursed"
            />
            <div className="hidden sm:block">
              <StatCard
                label="Latest Approval"
                value={
                  processed[0]?.created_at
                    ? new Date(processed[0].created_at).toLocaleDateString(
                        'en-GB',
                      )
                    : '—'
                }
                sub="date"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto px-4 pb-4 sm:px-6">
            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
              </div>
            ) : processed.length === 0 ? (
              <Empty />
            ) : (
              <>
                <div className="hidden overflow-hidden rounded-xl border border-white/10 sm:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-border border-b">
                        {COLS.map((h) => (
                          <th
                            key={h}
                            className="text-text px-4 py-3 text-left text-[10px] font-semibold tracking-widest whitespace-nowrap uppercase"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pageData.map((sub, i) => (
                        <VCTableRow
                          key={sub.id}
                          sub={sub}
                          index={page * VC_PAGE_SIZE + i}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-2 sm:hidden">
                  {pageData.map((sub, i) => (
                    <VCMobileCard
                      key={sub.id}
                      sub={sub}
                      index={page * VC_PAGE_SIZE + i}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <TablePagination
            page={page}
            pageCount={pageCount}
            total={processed.length}
            pageSize={VC_PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>
      </MainContainer>
    </DashboardContainer>
  );
}
