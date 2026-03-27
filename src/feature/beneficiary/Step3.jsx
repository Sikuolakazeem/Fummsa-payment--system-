import { useFormContext } from 'react-hook-form';
import { FormField } from './FormField';
import { useFeeCalculator } from '../../hook/useFeeCalculator';
import { FeeRow } from './FeeRow';
import { inputCls } from '../../hook/selector';
import Spinner from '../../ui/SpinnerMIni';

const formFields = [
  {
    name: 'exp_code',
    label: 'Exp Code',
    type: 'text',
    placeholder: 'Expenditure code',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'beneficiary@example.com',
  },
  {
    name: 'account_name',
    label: 'Account Name',
    type: 'text',
    placeholder: 'Account holder name',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    placeholder: 'Brief description',
  },
  {
    name: 'amount',
    label: 'Amount (₦)',
    type: 'number',
    placeholder: 'Enter amount',
  },
];

export default function Step3({ prev, isLoading }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const amount = Number(watch('amount')) || 0;
  const taxIncluded = watch('taxIncluded') || false;
  const { tax, stampDuty, balance } = useFeeCalculator(amount, taxIncluded);

  return (
    <div className="space-y-4 rounded-2xl bg-white p-4">
      <div className="space-y-4">
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
              {...register(field.name, {
                valueAsNumber: field.type === 'number',
              })}
            />
          </FormField>
        ))}

        <div className="space-y-3 rounded-xl border p-4">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4"
              {...register('taxIncluded')}
            />
            <span className="text-sm">
              Tax (7.5%) and stamp duty (2%) already included
            </span>
          </label>

          {amount > 0 && (
            <div className="space-y-2 border-t pt-3">
              {!taxIncluded ? (
                <>
                  <FeeRow label="VAT (7.5%)" value={`₦${tax.toFixed(2)}`} />
                  <FeeRow
                    label="Stamp Duty (2%)"
                    value={`₦${stampDuty.toFixed(2)}`}
                  />
                  <FeeRow
                    label="Net Amount"
                    value={`₦${balance.toFixed(2)}`}
                    highlight
                  />
                </>
              ) : (
                <FeeRow
                  label="Total Amount"
                  value={`₦${amount.toFixed(2)}`}
                  highlight
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={prev}
          className="border-border text-text rounded-lg border px-6 py-2.5 text-sm font-medium transition-all hover:bg-white/5"
        >
          ← Prev
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-text text-bg flex min-w-35 items-center justify-center gap-2 rounded-sm px-6 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? <Spinner /> : 'Submit Application'}
        </button>
      </div>
    </div>
  );
}
