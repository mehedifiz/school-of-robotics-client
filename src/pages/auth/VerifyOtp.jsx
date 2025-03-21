import { useState, useEffect } from "react";
import useAxios from "@/Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResendOTP = async () => {
    try {
      const phone = localStorage.getItem("phone");
      if (!phone) {
        toast.error("Phone number not found. Please register again.");
        return navigate("/register");
      }

      await axios.post("/auth/resend-otp", { phone });
      setTimer(300); // Reset timer
      toast.success("New OTP sent successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const phone = localStorage.getItem("phone");
      if (!phone) {
        toast.error("Phone number not found. Please register again.");
        return navigate("/register");
      }

      const response = await axios.post("/auth/verify-otp", { 
        phone,
        otp: otp.toString()
      });

      toast.success(response.data.message);
      localStorage.removeItem("phone");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-teal-100">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Verify Your Phone</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter the OTP sent to your phone
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="text"
            maxLength="6"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full px-4 py-3 border rounded-md focus:ring-teal-500 focus:border-teal-500"
            required
          />

          <div className="text-center text-sm">
            <p>Time remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={handleResendOTP}
            disabled={timer > 0}
            className="w-full text-teal-600 hover:text-teal-500 text-sm font-medium disabled:opacity-50"
          >
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;