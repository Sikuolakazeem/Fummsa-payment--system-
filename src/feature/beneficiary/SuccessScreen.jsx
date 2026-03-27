import { Link } from 'react-router-dom';

export default function SuccessScreen({ onNew }) {
  return (
    <div className="bg-bg flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        {/* Icon */}
        <div className="mb-6 flex items-center justify-center">
          <div className="border-border flex h-20 w-20 items-center justify-center rounded-full border-2">
            <span className="text-4xl">✓</span>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-text mb-2 text-xl font-semibold">
          Application Submitted
        </h2>
        <p className="text-text mb-8 text-sm leading-relaxed">
          Your application has been submitted successfully and is now waiting
          for checker review.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onNew}
            className="bg-text text-bg w-full rounded-lg py-3 text-sm font-semibold transition-all duration-300"
          >
            Submit Another Application
          </button>
          <Link
            to="/user"
            className="text-text block w-full rounded-lg border border-white/10 py-3 text-sm font-medium transition-all duration-300"
          >
            View My Applications
          </Link>
        </div>
      </div>
    </div>
  );
}
