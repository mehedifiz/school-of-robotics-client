import { useState } from "react";
import lock from "./../../../../assets/images/lock.png";

const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    setError("");
    alert("Password changed successfully!");
  };
  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg  rounded-2xl">
      <div className="max-w-[5.5rem] md:max-w-[7rem] mx-auto ">
        <img src={lock} alt="lock" className="" />
      </div>
      <div className="max-w-sm mx-auto text-center mt-3">
        <h2 className="text-2xl font-semibold ">
        Change Password
        </h2>
        <p className="text-[15px] text-[#878688]">
          Your new password must be different from previous used passwords
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <input
          type="password"
          className="outline-none py-2 px-3 rounded-sm shadow bg-transparent"
          placeholder="Old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New password"
          className="outline-none py-2 px-3 rounded-sm shadow"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="outline-none py-2 px-3 rounded-sm shadow"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button onClick={handleChangePassword} className="w-full outline-none font-bold duration-300 py-2 bg-[#00776d]/80 hover:bg-[#00776d] text-white px-3 rounded-sm shadow">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Settings;
