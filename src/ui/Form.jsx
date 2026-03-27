function Form({ children, onSubmit }) {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
