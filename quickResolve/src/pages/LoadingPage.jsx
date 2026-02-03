function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-6">

        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold">
            QR
          </div>
          <span className="text-xl font-semibold text-gray-800">
            QuickResolve
          </span>
        </div>

        {/* Loader */}
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>
          <div className="absolute inset-0 rounded-full border-4 border-gray-900 border-t-transparent animate-spin"></div>
        </div>

        {/* Text */}
        <p className="text-sm text-gray-500">
          Preparing your workspace...
        </p>

      </div>
    </div>
  );
}

export default LoadingPage;
