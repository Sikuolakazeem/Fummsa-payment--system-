import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../../hook/schema';
import { useSubmitApplication } from './useSubmitApplication';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import SuccessScreen from './SuccessScreen';
// import StepIndicator from './StepIndicator';

const today = new Date().toISOString().split('T')[0];

const STEP_FIELDS = {
  1: [
    'beneficiary_name',
    'nature_of_exp',
    'sponsor_unit',
    'payee_bank_name',
    'account_number',
    'account_type',
    'phone_number',
    'tin_no',
  ],
  2: [
    'ref_no',
    'date',
    'vote_head',
    'entered_by',
    'coder_phone_number',
    'voucher_number',
    'bank_name',
    'e_payment_check_number',
  ],
  3: [
    'email',
    'exp_code',
    'account_name',
    'description',
    'taxIncluded',
    'amount',
  ],
};

export default function BeneficiaryForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const { submitApplication, isCreating } = useSubmitApplication();

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: {
      beneficiary_name: '',
      nature_of_exp: '',
      sponsor_unit: '',
      payee_bank_name: '',
      account_number: '',
      account_type: '',
      phone_number: '',
      tin_no: '',
      ref_no: '',
      vote_head: '',
      entered_by: '',
      coder_phone_number: '',
      voucher_number: '',
      bank_name: '',
      e_payment_check_number: '',
      email: '',
      exp_code: '',
      amount: '',
      account_name: '',
      description: '',
      cheque_no: '',
      date: today,
      taxIncluded: false,
    },
  });

  const handleNext = async () => {
    const valid = await methods.trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => s + 1);
  };

  const handlePrev = () => setStep((s) => s - 1);

  const handleNewSubmission = () => {
    methods.reset();
    setStep(1);
    setSubmitted(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    submitApplication(data, {
      onSuccess: () => {
        setSubmitted(true);
        setStep(1);
      },
    });
  };

  if (submitted) {
    return <SuccessScreen onNew={handleNewSubmission} />;
  }

  return (
    <div className="page-transition bg-bg mx-auto flex items-center justify-center">
      {/* <StepIndicator current={step} total={3} /> */}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-90">
          {step === 1 && <Step1 next={handleNext} />}
          {step === 2 && <Step2 next={handleNext} prev={handlePrev} />}
          {step === 3 && <Step3 prev={handlePrev} isLoading={isCreating} />}
        </form>
      </FormProvider>
    </div>
  );
}
