import { APPROVAL_ORDER } from '../../hook/approval_order';

export function ApprovalTrail({ logs = [], currentStage }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {APPROVAL_ORDER.map((stage, i) => {
        const log = logs?.find((l) => l.role === stage);
        const isDone = log?.status === 'approved';
        const isRejected = log?.status === 'rejected';
        const isActive = currentStage === stage;
        return (
          <div key={stage} className="flex items-center gap-1">
            <div
              className={`flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${
                isDone
                  ? 'border-green-600/50 bg-green-900/50 text-green-300'
                  : isRejected
                    ? 'border-red-600/50 bg-red-900/50 text-red-300'
                    : isActive
                      ? 'border-amber-600/50 bg-amber-900/50 text-amber-300'
                      : 'border-white/10 bg-white/5 text-[#7a7060]'
              }`}
            >
              <span>
                {isDone ? '✓' : isRejected ? '✗' : isActive ? '◉' : '○'}
              </span>
              <span className="hidden capitalize sm:inline">{stage}</span>
            </div>
            {i < APPROVAL_ORDER.length - 1 && (
              <span
                className={`text-xs ${isDone ? 'text-green-600' : 'text-[#3a3830]'}`}
              >
                →
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
