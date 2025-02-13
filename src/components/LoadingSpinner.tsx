export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-accent opacity-30"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-accent border-t-transparent"></div>
      </div>
    </div>
  );
}