function MyStampDuty({ stampDuty }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[1rem]">Stamp-duty:</p>
      <p className="text-[1rem]">₦{stampDuty ? stampDuty : 0}</p>
    </div>
  );
}

export default MyStampDuty;
