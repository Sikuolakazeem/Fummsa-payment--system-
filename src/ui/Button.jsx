function Button({ children, disabled, type, onClick }) {
  return (
    <button
      className="bg-primary hover:bg-primary/90 inline-block rounded-full py-2 text-white transition-all duration-300"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
