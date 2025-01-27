const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-blue-500/20"></div>
        <div
          className="w-12 h-12 rounded-full border-2 border-blue-500 border-t-transparent animate-spin 
                      absolute top-0 left-0"
        ></div>
        <div className="w-12 h-12 rounded-full border-2 border-purple-500/20 rotate-45"></div>
        <div
          className="w-12 h-12 rounded-full border-2 border-purple-500 border-t-transparent animate-spin 
                      absolute top-0 left-0 rotate-45"
          style={{ animationDuration: "2s" }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
