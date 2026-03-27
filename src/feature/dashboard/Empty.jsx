import { HiOutlineDatabase } from 'react-icons/hi';

export function Empty() {
  return (
    <div className="text-text flex flex-1 flex-col items-center justify-center gap-2">
      <span className="text-4xl">
        <HiOutlineDatabase />
      </span>
      <p className="text-text text-sm">No applications found</p>
    </div>
  );
}
