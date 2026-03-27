function LeftHambugger({ setSidebar }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {/* Hamburger */}
      <button
        onClick={() => setSidebar(true)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[#7a7060] transition-colors hover:bg-white/10 md:hidden"
      >
        ☰
      </button>
      <div className="min-w-0">
        <h1 className="truncate text-sm font-semibold text-[#e8e3d9] capitalize sm:text-lg">
          {user?.role} Dashboard
        </h1>
        <p className="text-[10px] text-[#7a7060] sm:text-xs">
          {pending} application{pending !== 1 ? 's' : ''} pending
        </p>
      </div>
    </div>
  );
}

export default LeftHambugger;
