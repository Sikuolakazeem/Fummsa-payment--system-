import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

import Logo from './Logo';
import Form from './Form';
import Error from './Error';
import NavLinks from './NavLinks';
import BtnLogin from './BtnLogin';
import SpinnerFull from './SpinnerFull';
import FormWrapper from './FormWrapper';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../hook/schema';
import useLogin from '../feature/authentication/useLogin';

function SignIn() {
  const { loginUser, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  if (isLoading) return <SpinnerFull />;

  const onSubmit = ({ email, password }) => {
    if (!email || !password) return;

    loginUser(
      { email, password },
      {
        onSettled: () => {
          reset();
        },
      },
    );
  };

  return (
    <div className="page-transition mx-auto w-sm rounded-sm bg-white p-3 px-4 shadow-md">
      <div className="mb-4 flex flex-col items-center justify-center gap-0.5">
        <Logo />

        <span className="flex items-center">
          <h1 className="text-[1.3rem] font-bold text-gray-700">
            Welcome Back
          </h1>
        </span>
        <small className="text-center text-[1.1rem] text-gray-700">
          Enter your email and password to continue.
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

        <div className="flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <NavLinks
              className="text-primary text-sm hover:underline"
              to="/resetpassword"
            >
              Forgotten Password?
            </NavLinks>
            <BtnLogin type="submit" disabled={isSubmitting || isLoading}>
              Login
            </BtnLogin>
          </div>
          <p className="self-center text-sm">
            Don't have an account? &nbsp;
            <NavLinks
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              <span className="text-base">Signup</span>
            </NavLinks>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default SignIn;
