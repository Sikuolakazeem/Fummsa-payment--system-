export function PaginationBtn({ children, onClick, disabled, active }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-text h-7 min-w-7 rounded-md px-2 text-2xl transition-all ${
        active
          ? 'bg-purple-900 text-sm text-white'
          : disabled
            ? 'text-bg-card cursor-not-allowed'
            : 'text-dark-gray hover:text-shadow-primary hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );
}
