function Balance({ balance }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[1rem]">Payable Balance:</p>
      <p className="text-[1rem]">₦{balance ? balance : 0}</p>
    </div>
  );
}

export default Balance;
