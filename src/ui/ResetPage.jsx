import Form from './Form';
import FormWrapper from './FormWrapper';
import Error from './Error';
import BtnResetPassword from './BtnResetPassword';
import NavLinks from './NavLinks';

function ResetPage({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isSubmitting,
  isPending,
}) {
  return (
    <div className="page-transition">
      <div className="mb-4 flex flex-col items-center justify-center gap-0.5">
        <span className="flex items-center justify-center">
          <h1 className="text-base font-bold text-gray-700 md:text-[1.5rem]">
            Reset Password
          </h1>
        </span>
        <small className="text-center text-base text-gray-700">
          Enter the email associated to your account, we will send you a reset
          link.
        </small>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="focus:border-primary w-full rounded-full border px-4 py-2 transition-all duration-500"
              required
              {...register('email')}
            />
          </div>
          {errors.email && <Error>{errors.email.message}</Error>}
        </FormWrapper>

        <div className="flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <BtnResetPassword
              type="submit"
              disabled={isSubmitting || isPending}
            >
              Send reset link
            </BtnResetPassword>
          </div>
          <p className="self-center text-sm font-semibold">
            &larr;&nbsp;Back to &nbsp;
            <NavLinks
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              <span className="text-base">login</span>
            </NavLinks>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default ResetPage;
