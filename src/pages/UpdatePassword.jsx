import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

import Logo from '../ui/Logo';
import Form from '../ui/Form';
import Error from '../ui/Error';
import NavLinks from '../ui/NavLinks';
import FormWrapper from '../ui/FormWrapper';
import SpinnerFull from '../ui/SpinnerFull';
import BtnResetPassword from '../ui/BtnResetPassword';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePasswordSchema } from '../hook/resetSchema';
import { useUpdatePassword } from '../services/useUpdatePassword';

function UpdatePassword() {
  const [showPassword, setShowPassword] = useState();
  const [showPassword2, setShowPassword2] = useState();
  const { resetPassword, isPending } = useUpdatePassword();

  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  if (isPending) return <SpinnerFull />;

  function onSubmit({ password }) {
    if (!password) alert('Please enter a password to continue💥');
    resetPassword(password, {
      onSettled: () =>
        reset({
          password: '',
          confirmPassword: '',
        }),
    });
    navigate('/login');
  }

  return (
    <main className="mt-35 flex items-center justify-center">
      <div className="page-transition mx-auto w-sm space-y-4 rounded-sm bg-white p-3 px-4 shadow-md">
        <div className="mb-4 flex flex-col items-center justify-center gap-0.5">
          <Logo />

          <span className="flex items-center">
            <h1 className="text-[1.3rem] font-bold text-gray-700">
              Reset Password
            </h1>
          </span>
          <small className="text-center text-[1.1rem] text-gray-700 md:text-[1.3rem]">
            Create your new Password.
          </small>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  autoComplete="password"
                  className="focus:border-primary w-full rounded-full px-4 py-2 pr-10 transition-all duration-500"
                  required
                  {...register('password')}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <HiOutlineEye className="h-5 w-5" />
                  ) : (
                    <HiOutlineEyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {errors.password && <Error>{errors.password.message}</Error>}
          </FormWrapper>
          <FormWrapper>
            <div>
              <div className="relative">
                <input
                  type={showPassword2 ? 'text' : 'password'}
                  placeholder="confirm Password"
                  autoComplete="password"
                  className="focus:border-primary w-full rounded-full px-4 py-2 pr-10 transition-all duration-500"
                  required
                  {...register('confirmPassword')}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword2 ? (
                    <HiOutlineEye className="h-5 w-5" />
                  ) : (
                    <HiOutlineEyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {errors.confirmPassword && (
              <Error>{errors.confirmPassword.message}</Error>
            )}
          </FormWrapper>
          <div className="flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <BtnResetPassword
                type="submit"
                disabled={isSubmitting || isPending}
              >
                Reset password
              </BtnResetPassword>
            </div>
            <p className="self-center text-sm">
              Remember password? &nbsp;
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
    </main>
  );
}

export default UpdatePassword;
