export function SubmitButton({ pending }: { pending?: boolean }) {
  return (
    <button
      type="submit"
      className="w-full bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
      aria-disabled={pending}
    >
      Save
    </button>
  );
}
