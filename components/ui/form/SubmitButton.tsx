export function SubmitButton({
  pending,
  children,
}: {
  pending?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className="w-full bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-md shadow-sm focus:ring-2 border-gray-800 hover:border-gray-700  active:bg-gray-900 active:border-gray-900"
      aria-disabled={pending}
    >
      {children}
    </button>
  );
}
