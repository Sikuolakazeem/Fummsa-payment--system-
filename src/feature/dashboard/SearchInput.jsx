import { useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';

export function SearchInput({ value, onChange, mobile }) {
  const inputEl = useRef(null);
  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === 'Enter') {
        inputEl.current?.focus();
        // setSearchQuery('');
      }
    }

    document.addEventListener('keydown', callback);
    return document.addEventListener('keydown', callback);
  }, []);

  return (
    <div className={`relative ${mobile ? 'flex-1' : ''}`}>
      <span className="text-text-faint absolute top-1/2 left-3 -translate-y-1/2 text-xs">
        <FiSearch className="absolute top-1/2 -translate-y-1/2 text-gray-700" />
      </span>
      <input
        type="text"
        placeholder={mobile ? 'Search...' : 'Search by name...'}
        value={value}
        ref={inputEl}
        onChange={(e) => onChange(e.target.value)}
        className={`placeholder-text-faint text-text-faint focus:border-border-focus h-9 rounded-lg border pr-3 pl-8 transition-colors focus:outline-none ${mobile ? 'w-full' : 'w-44'}`}
      />
    </div>
  );
}
