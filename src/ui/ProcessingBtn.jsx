import Spinner from './SpinnerMini';

function ProcessingBtn({ isLoading }) {
  return (
    <button
      type="submit"
      className="flex items-center justify-between gap-4 rounded border px-6 py-2"
      disabled={isLoading}
    >
      <Spinner />
      <p>Proceed to Processing</p>
    </button>
  );
}

export default ProcessingBtn;
