import NavLinks from './NavLinks';

function SuccessMessage({ sentTo, onResend }) {
  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <h1 className="text-[1.3rem] font-bold text-gray-700">
        Check your email
      </h1>
      <p className="text-center text-sm text-gray-500 md:text-base">
        We sent a reset link to&nbsp;
        <span className="font-semibold text-gray-700">{sentTo}</span>&nbsp;Link
        expires in 1 hour.
      </p>
      <button
        onClick={onResend}
        className="text-primary text-base font-semibold hover:underline"
      >
        Didn't receive it? Resend
      </button>
      <p className="text-base text-gray-500">
        &larr;&nbsp;Back to&nbsp;
        <NavLinks
          to="/login"
          className="text-primary text-base font-semibold hover:underline"
        >
          <span>login</span>
        </NavLinks>
      </p>
    </div>
  );
}

export default SuccessMessage;
