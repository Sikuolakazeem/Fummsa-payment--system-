function ButtonLogout({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex h-13 w-13 items-center justify-center rounded-full transition-all hover:bg-white/5"
    >
      {children}
    </button>
  );
}

export default ButtonLogout;
