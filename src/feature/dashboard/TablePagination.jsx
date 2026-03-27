import { PaginationBtn } from './PaginationBtn';

export default function TablePagination({
  page,
  pageCount,
  total,
  pageSize,
  onPageChange,
}) {
  if (total === 0) return null;

  const start = page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, total);

  return (
    <div className="text-text flex shrink-0 items-center justify-between px-4 py-3 sm:px-6">
      <p>
        <span className="hidden sm:inline">Showing </span>
        <span>
          {start}-{end}
        </span>
        <span className="hidden sm:inline"> of </span>
        <span className="text-dark-gray sm:hidden"> / </span>
        <span>{total}</span>
      </p>

      <div className="flex items-center gap-1">
        <PaginationBtn onClick={() => onPageChange(0)} disabled={page === 0}>
          «
        </PaginationBtn>
        <PaginationBtn
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
        >
          ‹
        </PaginationBtn>
        {Array.from({ length: pageCount }, (_, i) => (
          <PaginationBtn
            key={i}
            onClick={() => onPageChange(i)}
            active={page === i}
          >
            {i + 1}
          </PaginationBtn>
        ))}
        <PaginationBtn
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount - 1}
        >
          ›
        </PaginationBtn>
        <PaginationBtn
          onClick={() => onPageChange(pageCount - 1)}
          disabled={page >= pageCount - 1}
        >
          »
        </PaginationBtn>
      </div>
    </div>
  );
}
