import { resetPasswordEmailSchema } from '../hook/resetSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Logo from '../ui/Logo';
import { useResetEmail } from '../feature/authentication/useResetEmail';
import SpinnerFull from '../ui/SpinnerFull';
import ResetPage from '../ui/ResetPage';
import { useState } from 'react';
import SuccessMessage from '../ui/SuccessMessage';

function Resetpage() {
  const { sendResetLink, isPending } = useResetEmail();
  const [emailSent, setEmailSent] = useState(false);
  const [sentTo, setSentTo] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  if (isPending) return <SpinnerFull />;

  function onSubmit({ email }) {
    if (!email) return;
    sendResetLink(email, {
      onSuccess: () => {
        setSentTo(email);
        setEmailSent(true);
      },
      onSettled: () => reset({ email: '' }),
    });
  }

  return (
    <main className="mt-35 flex items-center justify-center">
      <div className="page-transition mx-auto w-sm space-y-4 rounded-sm bg-white p-3 px-4 shadow-md">
        <div className="mb-4 flex flex-col items-center justify-center gap-0.5">
          <Logo />

          {emailSent ? (
            <SuccessMessage
              sentTo={sentTo}
              onResend={() => setEmailSent(false)}
            />
          ) : (
            <ResetPage
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              isSubmitting={isSubmitting}
              isPending={isPending}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default Resetpage;
