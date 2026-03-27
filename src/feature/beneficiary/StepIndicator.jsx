const STEPS = ['Beneficiary Info', 'Payment Details', 'Final Review'];

export default function StepIndicator({ current, total }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {STEPS.map((label, i) => {
          const step = i + 1;
          const isDone = step < current;
          const isActive = step === current;

          return (
            <div key={step} className="flex flex-1 items-center">
              {/* Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all ${
                    isDone
                      ? 'text-text bg-bg border-border'
                      : isActive
                        ? 'border-border text-bg bg-transparent'
                        : 'text-text border-white/20 bg-transparent'
                  }`}
                >
                  {isDone ? '✓' : step}
                </div>
                <span
                  className={`mt-1 hidden text-[10px] whitespace-nowrap sm:block ${
                    isActive
                      ? 'text-text font-medium'
                      : isDone
                        ? 'text-text/70'
                        : 'text-text'
                  }`}
                >
                  {label}
                </span>
              </div>

              {step < total && (
                <div
                  className={`mx-2 h-px flex-1 transition-all ${
                    isDone ? 'bg-bg' : 'bg-text'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
