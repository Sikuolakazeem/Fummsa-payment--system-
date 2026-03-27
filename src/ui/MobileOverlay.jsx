function MobileOverlay({ setOpen }) {
  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-40 bg-black/50 md:hidden"
    />
  );
}

export default MobileOverlay;
