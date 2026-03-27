import { useFormContext } from 'react-hook-form';
import { FormField } from './FormField';
import { inputCls, selectCls } from '../../hook/selector';

const BANKS = [
  'Zenith Bank',
  'First City(FCMB)',
  'First Bank',
  'GTB',
  'Sterling Bank',
  'Jaiz Bank',
  'Wema Bank',
  'UBA',
  'Access Bank',
];

const formFields = [
  {
    name: 'beneficiary_name',
    label: 'Beneficiary Name',
    type: 'text',
    placeholder: 'e.g. John Doe',
  },
  {
    name: 'nature_of_exp',
    label: 'Nature of Expense',
    type: 'text',
    placeholder: 'e.g. IT Management',
  },
  {
    name: 'sponsor_unit',
    label: 'Sponsor Unit',
    type: 'text',
    placeholder: 'e.g. Finance Department',
  },
  {
    name: 'payee_bank_name',
    label: 'Payee Bank Name',
    type: 'select',
    options: BANKS,
  },
  {
    name: 'account_number',
    label: 'Account Number',
    type: 'text',
    placeholder: '10-digit account number',
    maxLength: 10,
  },
  {
    name: 'account_type',
    label: 'Account Type',
    type: 'select',
    options: ['Savings', 'Current'],
  },
  {
    name: 'phone_number',
    label: 'Phone Number',
    type: 'text',
    placeholder: 'e.g. 08012345678',
  },
  {
    name: 'tin_no',
    label: 'TIN Number',
    type: 'text',
    placeholder: 'Tax identification number',
  },
];

export default function Step1({ next }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2 rounded-2xl p-4 shadow-md">
      <div className="mt-5 space-y-2">
        {formFields.map((field) => (
          <FormField
            key={field.name}
            label={field.label}
            error={errors[field.name]?.message}
          >
            {field.type === 'select' ? (
              <select className={selectCls} {...register(field.name)}>
                <option value="">Select {field.label}...</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                className={inputCls}
                {...register(field.name)}
              />
            )}
          </FormField>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={next}
          className="bg-text text-bg hover:bg-text/70 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
