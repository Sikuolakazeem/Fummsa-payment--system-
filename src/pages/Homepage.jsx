import { Link } from 'react-router-dom';

// use this for dynamic routing...
// const role = [
//   { role: 'student', to: `/` },
//   { role: 'admin', to: `/` },
//   { role: 'auditor', to: `/` },
//   { role: 'financial-approval', to: `/` },
//   { role: 'paidBy', to: `/` },
//   { role: 'CheckedBy  (Checker)', to: `/` },
// ];

function Homepage() {
  return (
    <main className="relative flex flex-col">
      <div className="absolute inset-0 top-0 right-8 left-8">
        <img
          src="./fummsa-image.png"
          alt="background-image"
          className="mx-auto w-full bg-no-repeat opacity-5 md:w-2/4"
        />
      </div>

      <div className="relative top-30 z-40 mx-auto flex flex-col items-center gap-10">
        <h1 className="text-[2rem] font-semibold">Sign Up </h1>

        <div className="flex flex-col items-center gap-2">
          <span className="text-[1.3rem]">Please select your role.</span>
          <select className="border-green-600 p-8 font-semibold outline-green-600 transition-all duration-300 md:text-[1.2rem]">
            <option value="auditor">Student</option>
            <option value="auditor">Admin</option>
            <option value="auditor">Auditor</option>
            <option value="auditor">Financial Approval</option>
            <option value="auditor">PaidBy (Payer)</option>
            <option value="auditor">CheckedBy (Checker)</option>
          </select>
        </div>
        <div className="mt-38 md:mt-46">
          <Link
            to="/login"
            className="rounded-full bg-amber-600 px-12 py-2 text-[1.2rem] font-semibold"
          >
            login
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Homepage;

{
  /*  */
}
