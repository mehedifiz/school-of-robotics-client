const Loader = ({ size = "default", text = "Loading...", showText = true }) => {
  // Size configurations
  const sizeClasses = {
    small: "h-6 w-6 border-t-2 border-b-2",
    medium: "h-8 w-8 border-t-2 border-b-2",
    default: "h-12 w-12 border-t-2 border-b-2",
    large: "h-16 w-16 border-t-3 border-b-3",
  };

  // Container configurations based on size
  const containerClasses = {
    small: "min-h-0 py-2",
    medium: "min-h-0 py-4",
    default: "min-h-screen",
    large: "min-h-screen",
  };

  return (
    <div className={`flex items-center justify-center flex-col ${containerClasses[size]}`}>
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-primary`}></div>
      
      {showText && (
        <p className={`mt-3 text-gray-600 ${size === "small" ? "text-sm" : "text-base"}`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;