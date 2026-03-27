import { z } from 'zod';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const commonPasswords = ['Password123!', 'Admin123', 'Qwerty!@#', 'Welcome1'];

export const resetPasswordEmailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .trim()
    .toLowerCase()
    .regex(EMAIL_REGEX, 'Please enter a valid email address'),
});

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Password is required')
      .transform((val) => val.trim())
      .pipe(
        z
          .string()
          .min(10, 'Password length too short')
          .max(40, 'Password is too long')
          .refine(
            (val) => /[A-Z]/.test(val),
            'Must include an uppercase letter',
          )
          .refine((val) => /[a-z]/.test(val), 'Must include a lowercase letter')
          .refine((val) => /[0-9]/.test(val), 'Must include a number')
          .refine(
            (val) => /[^A-Za-z0-9]/.test(val),
            'Must include a special character',
          )
          .refine(
            (val) => !commonPasswords.includes(val),
            'Password is too common',
          ),
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
