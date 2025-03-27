import { useState } from "react";
import lock from "./../../../../assets/images/lock.png";
import useAxios from "@/Hooks/useAxios";
import toast from "react-hot-toast";

const Settings = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  const handleChangePassword = async () => {
   
    setError("");

    
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/auth/change-password', {
        oldPassword,
        newPassword
      });

      if (response.data.success) {
        toast.success("Password changed successfully");
        onClose?.(); // Close modal if provided
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to change password");
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white max-w-lg w-full mx-4 p-6 rounded-2xl shadow-xl">
        <div className="max-w-[5.5rem] md:max-w-[7rem] mx-auto">
          <img src={lock} alt="lock" className="w-full" />
        </div>
        <div className="max-w-sm mx-auto text-center mt-3">
          <h2 className="text-2xl font-semibold">Change Password</h2>
          <p className="text-[15px] text-gray-600 mt-2">
            Your new password must be different from previous used passwords
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <input
            type="password"
            className="w-full py-2.5 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New password"
            className="w-full py-2.5 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full py-2.5 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="flex gap-3 mt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleChangePassword}
              disabled={loading}
              className="flex-1 py-2.5 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
