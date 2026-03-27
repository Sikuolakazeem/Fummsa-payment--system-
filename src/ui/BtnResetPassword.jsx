function BtnResetPassword({ children, disabled, type, onClick }) {
  return (
    <button
      className="bg-primary hover:bg-primary-90 w-full rounded-full py-2 text-white transition"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default BtnResetPassword;
