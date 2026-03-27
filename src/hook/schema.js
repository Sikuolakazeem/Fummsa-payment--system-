import { z } from 'zod';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^(?:\+234|234|0)[789][01]\d{8}$/;
const LETTERS_ONLY = /^[A-Za-z\s]+$/;
const DIGITS_ONLY = /^\d+$/;

const phoneField = z
  .string()
  .min(1, 'Phone number is required')
  .min(11, 'Phone number must be at least 11 digits')
  .transform((val) => val.replace(/[\s-]/g, ''))
  .pipe(
    z
      .string()
      .regex(
        PHONE_REGEX,
        'Invalid Nigerian phone number — use 080XXXXXXXX format',
      ),
  )
  .transform((val) => {
    if (val.startsWith('0')) return '+234' + val.slice(1);
    if (val.startsWith('234')) return '+' + val;
    return val;
  });

export const schema = z.object({
  beneficiary_name: z
    .string()
    .min(1, 'Beneficiary name is required')
    .min(5, 'Beneficiary name must be at least 5 characters')
    .regex(LETTERS_ONLY, 'Beneficiary name must contain letters only'),

  nature_of_exp: z
    .string()
    .min(1, 'Nature of expenditure is required')
    .min(5, 'Must be at least 5 characters')
    .regex(LETTERS_ONLY, 'Must contain letters only'),

  sponsor_unit: z

    .string()
    .min(1, 'Sponsor unit is required')
    .min(2, 'Must be at least 2 characters'),

  payee_bank_name: z
    .string()
    .min(1, 'Please select a payee bank')
    .min(3, 'Bank name must be at least 3 characters')
    .regex(LETTERS_ONLY, 'Bank name must contain letters only'),

  account_number: z
    .string()
    .min(1, 'Account number is required')
    .length(10, 'Account number must be exactly 10 digits')
    .regex(DIGITS_ONLY, 'Account number must contain digits only'),

  account_type: z.string().min(1, 'Please select an account type'),

  phone_number: phoneField,

  tin_no: z
    .string()
    .min(1, 'TIN number is required')
    .min(2, 'TIN number must be at least 2 characters')
    .regex(DIGITS_ONLY, 'TIN number must contain digits only'),

  ref_no: z
    .string()
    .length(5, 'Ref number must be exactly 5 digits')
    .regex(DIGITS_ONLY, 'Ref number must contain digits only'),

  date: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : new Date())),

  amount: z.coerce
    .number({ invalid_type_error: 'Amount must be a number' })
    .min(1, 'Please enter a valid amount')
    .max(999999999999999, 'Amount is too large'),

  vote_head: z
    .string()
    .min(1, 'Vote head is required')
    .min(3, 'Must be at least 3 characters')
    .regex(LETTERS_ONLY, 'Must contain letters only'),

  entered_by: z
    .string()
    .min(1, 'This field is required')
    .min(3, 'Must be at least 3 characters')
    .regex(LETTERS_ONLY, 'Must contain letters only'),

  coder_phone_number: phoneField,

  voucher_number: z
    .string()
    .min(1, 'Voucher number is required')
    .min(5, 'Must be at least 5 characters')
    .regex(DIGITS_ONLY, 'Must contain digits only'),

  bank_name: z
    .string()
    .min(1, 'Bank name is required')
    .min(3, 'Must be at least 3 characters')
    .regex(LETTERS_ONLY, 'Must contain letters only'),

  e_payment_check_number: z
    .string()
    .min(1, 'Check number is required')
    .min(3, 'Must be at least 3 characters')
    .regex(DIGITS_ONLY, 'Must contain digits only'),

  email: z
    .string()
    .min(1, 'Email is required')
    .trim()
    .toLowerCase()
    .regex(EMAIL_REGEX, 'Please enter a valid email address'),

  exp_code: z.coerce
    .number({ invalid_type_error: 'Exp code must be a number' })
    .min(1, 'Please enter a valid exp code')
    .max(1000000, 'Exp code is too large'),

  account_name: z
    .string()
    .min(1, 'Account name is required')
    .min(3, 'Must be at least 3 characters')
    .regex(LETTERS_ONLY, 'Must contain letters only'),

  description: z
    .string()
    .min(1, 'Description is required')
    .min(5, 'Description must be at least 5 characters')
    .max(200, 'Description must be under 200 characters'),

  taxIncluded: z.boolean(),

  cheque_no: z.string().optional(),
});

export const step1Schema = schema.pick({
  beneficiary_name: true,
  nature_of_exp: true,
  sponsor_unit: true,
  payee_bank_name: true,
  account_number: true,
  account_type: true,
  phone_number: true,
  tin_no: true,
});

export const step2Schema = schema.pick({
  ref_no: true,
  date: true,
  vote_head: true,
  entered_by: true,
  coder_phone_number: true,
  voucher_number: true,
  bank_name: true,
  e_payment_check_number: true,
});

export const step3Schema = schema.pick({
  email: true,
  exp_code: true,
  amount: true,
  account_name: true,
  description: true,
  taxIncluded: true,
});

const commonPasswords = ['Password123!', 'Admin123', 'Qwerty!@#', 'Welcome1'];

export const signupSchema = z
  .object({
    role: z.string().min(1, 'Role is required'),
    userName: z
      .string()
      .min(5, 'Name must be at least 5 characters')
      .trim()
      .toLowerCase()
      .regex(LETTERS_ONLY, 'Name must contain letters only'),
    email: z
      .string()
      .min(1, 'Email is required')
      .trim()
      .toLowerCase()
      .regex(EMAIL_REGEX, 'Please enter a valid email address'),
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

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(10, 'Please enter a valid password'),
});
