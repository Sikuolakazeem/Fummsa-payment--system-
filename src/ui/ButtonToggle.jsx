function ButtonToggle({ setOpen }) {
  return (
    <button
      onClick={() => setOpen(true)}
      className="text-text fixed top-4 left-4 z-101 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-white/5 text-base transition-all hover:bg-white/10 md:hidden"
    >
      ☰
    </button>
  );
}

export default ButtonToggle;
