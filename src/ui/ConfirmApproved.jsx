function ConfirmApproved({ cancel }) {
  return (
    <div className="mx-auto mb-5 flex w-sm flex-col gap-4 bg-green-50 px-4">
      <p>
        Are you sure you want to proceed to processing, once done this action
        cannot be undone!
      </p>
      <div className="mb-4 flex justify-end gap-3">
        <button className="rounded bg-red-200 px-3 py-2" onClick={cancel}>
          cancel
        </button>
        <button className="rounded bg-red-200 px-3 py-2">approve</button>
      </div>
    </div>
  );
}
export default ConfirmApproved;
