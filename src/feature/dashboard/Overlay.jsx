function Overlay({ open, onClose }) {
  return (
    <div>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}
    </div>
  );
}

export default Overlay;
