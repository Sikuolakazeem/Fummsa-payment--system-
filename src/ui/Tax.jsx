function Tax({ tax }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[1rem]">Tax:</p>
      <p className="text-[1rem]">₦{tax ? tax : 0}</p>
    </div>
  );
}

export default Tax;
