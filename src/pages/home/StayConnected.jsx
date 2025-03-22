const StayConnected = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-fixed h-96 flex items-center justify-center text-white"
      style={{
        backgroundImage: `url('https://timelinecovers.pro/facebook-cover/download/internet-fiber-optics-facebook-cover.jpg')`, // Replace with your image URL
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-65"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h2 className="text-4xl font-bold mb-4">Stay Connected</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Now that we've aligned the details, it's time to get things mapped out
          and organized. Now that we've aligned the details.
        </p>
        <button className="bg-[#00635A] hover:bg-[#004d40] text-white px-6 py-2 rounded-lg  transition-colors duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default StayConnected;
