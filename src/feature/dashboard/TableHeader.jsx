import NotificationBell from '../notification/NotificationBell';
import { SearchInput } from './SearchInput';

export default function TableHeader({
  role,
  pending,
  search,
  status,
  sortKey,
  onSearch,
  onStatus,
  onSort,
}) {
  const selectCls =
    'h-9 rounded-lg border border-white/10 bg-text px-3 text-xs text-bg focus:outline-none cursor-pointer';

  return (
    <div className="border-border shrink-0 border-b px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex items-center justify-between gap-3">
        {/* Title */}
        <div className="min-w-0">
          <h1 className="text-text truncate text-sm font-semibold capitalize sm:text-[1.4rem]">
            {role} Dashboard
          </h1>
          <p className="text-text text-[14px] sm:text-xs">
            {pending} application{pending !== 1 ? 's' : ''} pending
          </p>
        </div>

        {/* Desktop filters + bell */}
        <div className="hidden items-center gap-2 sm:flex">
          <SearchInput value={search} onChange={onSearch} />
          <select
            value={status}
            onChange={(e) => onStatus(e.target.value)}
            className={selectCls}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={sortKey}
            onChange={(e) => onSort(e.target.value)}
            className={selectCls}
          >
            <option value="">Sort By</option>
            <option value="date-desc">Date — Newest</option>
            <option value="date-asc">Date — Oldest</option>
            <option value="amount-desc">Amount — High</option>
            <option value="amount-asc">Amount — Low</option>
          </select>
          <NotificationBell />
        </div>

        {/* Mobile — bell always visible */}
        <div className="flex items-center gap-2 sm:hidden">
          <NotificationBell />
        </div>
      </div>

      {/* Mobile filters */}
      <div className="mt-3 flex gap-2 sm:hidden">
        <SearchInput value={search} onChange={onSearch} mobile />
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value)}
          className="h-9 cursor-pointer rounded-lg border border-white/10 bg-[#16150f] px-2 text-xs text-[#c9c0b0] focus:outline-none"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={sortKey}
          onChange={(e) => onSort(e.target.value)}
          className="h-9 cursor-pointer rounded-lg border border-white/10 bg-[#16150f] px-2 text-xs text-[#c9c0b0] focus:outline-none"
        >
          <option value="">Sort</option>
          <option value="date-desc">Newest</option>
          <option value="date-asc">Oldest</option>
          <option value="amount-desc">High ₦</option>
          <option value="amount-asc">Low ₦</option>
        </select>
      </div>
    </div>
  );
}

// import { SearchInput } from './SearchInput';

// export default function TableHeader({
//   role,
//   pending,
//   search,
//   status,
//   sortKey,
//   onSearch,
//   onStatus,
//   onSort,
// }) {
//   const selectCls =
//     'h-9 rounded-lg border border-white/10 bg-text px-3 text-xs text-bg focus:outline-none cursor-pointer';

//   return (
//     <div className="border-border shrink-0 border-b px-4 py-3 sm:px-6 sm:py-4">
//       <div className="flex items-center justify-between gap-3">
//         {/* Title */}
//         <div className="min-w-0">
//           <h1 className="text-text truncate pl-8 text-sm font-semibold capitalize sm:text-lg">
//             {role} Dashboard
//           </h1>
//           <p className="text-text pl-8 text-[10px] sm:text-xs">
//             {pending} application{pending !== 1 ? 's' : ''} pending
//           </p>
//         </div>

//         {/* Desktop filters */}
//         <div className="hidden items-center gap-2 sm:flex">
//           <SearchInput value={search} onChange={onSearch} />
//           <select
//             value={status}
//             onChange={(e) => onStatus(e.target.value)}
//             className={selectCls}
//           >
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="approved">Approved</option>
//             <option value="rejected">Rejected</option>
//           </select>
//           <select
//             value={sortKey}
//             onChange={(e) => onSort(e.target.value)}
//             className={selectCls}
//           >
//             <option value="">Sort By</option>
//             <option value="date-desc">Date — Newest</option>
//             <option value="date-asc">Date — Oldest</option>
//             <option value="amount-desc">Amount — High</option>
//             <option value="amount-asc">Amount — Low</option>
//           </select>
//         </div>
//       </div>

//       {/* Mobile filters */}
//       <div className="mt-3 flex gap-2 sm:hidden">
//         <SearchInput value={search} onChange={onSearch} mobile />
//         <select
//           value={status}
//           onChange={(e) => onStatus(e.target.value)}
//           className="h-9 cursor-pointer rounded-lg border border-white/10 bg-[#16150f] px-2 text-xs text-[#c9c0b0] focus:outline-none"
//         >
//           <option value="all">All</option>
//           <option value="pending">Pending</option>
//           <option value="approved">Approved</option>
//           <option value="rejected">Rejected</option>
//         </select>

//         <select
//           value={sortKey}
//           onChange={(e) => onSort(e.target.value)}
//           className="h-9 cursor-pointer rounded-lg border border-white/10 bg-[#16150f] px-2 text-xs text-[#c9c0b0] focus:outline-none"
//         >
//           <option value="">Sort</option>
//           <option value="date-desc">Newest</option>
//           <option value="date-asc">Oldest</option>
//           <option value="amount-desc">High ₦</option>
//           <option value="amount-asc">Low ₦</option>
//         </select>
//       </div>
//     </div>
//   );
// }
