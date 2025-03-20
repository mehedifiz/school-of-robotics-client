import useAxios from "@/Hooks/useAxios";
import { isValidBangladeshiPhone } from "@/utils/validation";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "phone" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Phone validation
    if (!isValidBangladeshiPhone(formData.phone)) {
      setError("দয়া করে সঠিক বাংলাদেশী মোবাইল নম্বর দিন (01 দিয়ে শুরু করে ১১ ডিজিট)");
      setLoading(false);
      return;
    }

    // Password length validation
    if (formData.password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      setLoading(false);
      return;
    }

    // Password confirmation validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      setLoading(false);
      return;
    }
    
    // Remove confirmPassword before sending to API
    const submissionData = {
      name: formData.name,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      const response = await axios.post("/auth/register", submissionData);

      if (response.data) {
        console.log("Registration successful:", response.data);
        navigate("/login");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };
    const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 11) { // Limit to 11 digits
      setFormData(prev => ({
        ...prev,
        phone: value
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-teal-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full  space-y-6 bg-white rounded-xl shadow-lg p-8 border-t-8 border-teal-600">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Create a New Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join Bangladesh's Robotics Education Community
          </p>
        </div>

        {error && (
          <div
            className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded"
            role="alert"
          >
            <p className="font-medium">Warning!</p>
            <p>{error}</p>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full px-3 py-3 bg-gray-50 border rounded-md shadow-2xl focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              id="phone"
              name="phone"
              type="number"
              required
              className="block w-full px-3 py-3 sm:text-sm bg-gray-50 shadow-2xl border rounded-md"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full px-3 py-3 bg-gray-50 shadow-2xl sm:text-sm border rounded-md"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="block w-full px-3 py-3 sm:text-sm bg-gray-50 shadow-2xl border rounded-md"
              placeholder="Re-Enter Your Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 bg-gray-50 shadow-2xl border rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I have read and agree to the{" "}
              <a href="#" className="text-teal-600 hover:text-teal-500">
                terms and conditions
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          <div className="text-center">
            <Link to="/login">
              Already have an account?
              <span className="font-medium text-teal-600 hover:underline pl-2 hover:underline-offset-4">
                Login
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
