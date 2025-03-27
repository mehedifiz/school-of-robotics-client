import { motion } from "framer-motion";
import { LockIcon, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PremiumFeatureOverlay = ({ message = "Upgrade to Premium to unlock advanced statistics" }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 backdrop-blur-sm bg-white/50 z-50 flex flex-col items-center justify-center text-center p-6"
    >
      <div className="bg-white/80 p-5 rounded-xl shadow-lg max-w-md backdrop-blur-sm border border-gray-100">
        <div className="mb-3 flex justify-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <LockIcon className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Premium Feature</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        <button
          onClick={() => navigate("/pricing")}
          className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg font-medium inline-flex items-center transition-colors"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Upgrade Now
        </button>
      </div>
    </motion.div>
  );
};

export default PremiumFeatureOverlay;
