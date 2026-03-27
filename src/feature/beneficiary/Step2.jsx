import { useFormContext } from 'react-hook-form';
import { FormField } from './FormField';
import { inputCls } from '../../hook/selector';

const formFields = [
  {
    name: 'ref_no',
    label: 'Ref No',
    type: 'text',
    placeholder: '5-digit reference number',
  },
  { name: 'date', label: 'Date', type: 'date', placeholder: '' },
  // {
  //   name: 'amount',
  //   label: 'Amount (₦)',
  //   type: 'text',
  //   placeholder: 'e.g. 50000',
  // },
  {
    name: 'vote_head',
    label: 'Vote Head',
    type: 'text',
    placeholder: 'e.g. Staff Welfare',
  },
  {
    name: 'entered_by',
    label: 'Entered By',
    type: 'text',
    placeholder: 'Name of data entry officer',
  },
  {
    name: 'coder_phone_number',
    label: "Coder's Phone Number",
    type: 'text',
    placeholder: 'e.g. 08012345678',
  },
  {
    name: 'voucher_number',
    label: 'Payment Voucher No',
    type: 'text',
    placeholder: 'Voucher number',
  },
  {
    name: 'bank_name',
    label: 'Bank Name',
    type: 'text',
    placeholder: 'e.g. GTB',
  },
  {
    name: 'e_payment_check_number',
    label: 'E-Payment / Cheque No',
    type: 'text',
    placeholder: 'Check number',
  },
];

export default function Step2({ next, prev }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2 rounded-2xl bg-white p-4">
      <div className="mt-5 space-y-4">
        {formFields.map((field) => (
          <FormField
            key={field.name}
            label={field.label}
            error={errors[field.name]?.message}
          >
            <input
              type={field.type}
              placeholder={field.placeholder}
              className={inputCls}
              {...register(field.name)}
            />
          </FormField>
        ))}
      </div>

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={prev}
          className="border-border text-text rounded-lg border px-6 py-2.5 text-sm font-medium transition-all"
        >
          ← Prev
        </button>
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
