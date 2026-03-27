import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signupSchema } from '../hook/schema';

import NavLinks from './NavLinks';
import Form from './Form';
import FormWrapper from './FormWrapper';
import Role from './Role';
import Error from './Error';
import { zodResolver } from '@hookform/resolvers/zod';
import useSignup from '../feature/authentication/useSignup';
import Logo from './Logo';
import Button from './Button';

function SignUp() {
  const navigate = useNavigate();

  const { signupUser, isLoading } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    isSubmitting,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
    },
  });

  function onsubmit({ userName, email, role, password }) {
    if (!userName || !email || !password || !role) return;
    signupUser(
      {
        userName,
        email,
        password,
        role,
      },

      {
        onSuccess: () => {
          localStorage.setItem('role', role);
          navigate(`/${role}`);
        },
        onSettled: () => {
          reset();
        },
      },
    );
  }

  return (
    <div className="page-transition mx-auto w-sm space-y-6 rounded-sm bg-white p-3 shadow-md">
      <div className="mb-5 flex flex-col items-center justify-center gap-1">
        <Logo />
        <p>Enter your details to continue using the app</p>
      </div>
      <div className="flex items-center justify-between">
        <span>👉🏿</span>
        <Role register={register} error={errors.role} />
      </div>
      <Form onSubmit={handleSubmit(onsubmit, (error) => console.log(error))}>
        <FormWrapper>
          <div>
            <input
              type="name"
              placeholder="user Name"
              className="focus:border-primary w-full rounded-full px-4 py-2 transition-all duration-500"
              required
              {...register('userName')}
              disabled={isSubmitting}
            />
          </div>
          {errors.userName && <Error>{errors.userName?.message}</Error>}
        </FormWrapper>

        <FormWrapper>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="focus:border-primary w-full rounded-full border px-4 py-2 transition-all duration-500"
              required
              {...register('email')}
              disabled={isSubmitting}
            />
          </div>
          {errors.email && <Error>{errors.email?.message}</Error>}
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
                disabled={isSubmitting}
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
          {errors.password && <Error>{errors.password?.message}</Error>}
        </FormWrapper>
        <FormWrapper>
          <div>
            <div className="relative">
              <input
                type={showPassword2 ? 'text' : 'password'}
                placeholder="confirm Password"
                className="focus:border-primary w-full rounded-full px-4 py-2 pr-10 transition-all duration-500"
                {...register('confirmPassword')}
                disabled={isSubmitting}
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
            <Error>{errors.confirmPassword?.message}</Error>
          )}
        </FormWrapper>
        <div className="flex flex-col gap-3">
          <Button disabled={isLoading} type="submit">
            Sign up
          </Button>
          <p className="self-center text-sm">
            Already have an account? &nbsp;
            <NavLinks
              to="/login"
              className="text-primary text-sm font-semibold hover:underline"
            >
              <span className="text-base">login</span>
            </NavLinks>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
