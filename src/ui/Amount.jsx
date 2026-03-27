function Amount({ amount }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[1rem]">Payable Balance:</p>
      <span className="text-[1rem]">₦{amount ? amount : 0.0}</span>
    </div>
  );
}

export default Amount;
