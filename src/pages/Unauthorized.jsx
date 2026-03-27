function Unauthorized() {
  return (
    <div className="mx-auto mt-50 flex flex-col items-center gap-4 text-center">
      <div className="flex items-center justify-center rounded-full border p-6 text-[2rem] font-bold">
        {/* ⚡ */}❌
      </div>
      <p className="md:text-[1.5rem]">
        You are not authorized to use this application, Please contact the
        school management.
      </p>
    </div>
  );
}

export default Unauthorized;
