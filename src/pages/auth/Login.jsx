import useAuth from "@/Hooks/useAuth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "phone" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(formData);
      navigate("/dashboard");
    } catch (error) {
      setError(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white rounded-xl shadow-lg p-8 border-t-8 border-teal-600">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-950"> LOGIN HERE</h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome to the new era of robotics education
          </p>
        </div>

        {error && (
          <div
            className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded"
            role="alert"
          >
            <p className="font-medium">Alert!</p>
            <p>{error}</p>
          </div>
        )}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Phone Input */}
            <div>
              <input
                id="phone"
                name="phone"
                type="number"
                required
                className="mt-1 block w-full px-3 py-3 bg-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-3 bg-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember Me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={authLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200"
            >
              {authLoading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div className="text-center">
            <Link to="/register">
              Don’t have an account?
              <span className="font-medium text-teal-600 hover:text-teal-700 hover:underline pl-2 hover:underline-offset-4 ">
                Register here
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

// import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

// const Login = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-200 to-teal-800">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-semibold text-teal-800">Welcome!</h2>
//           <p className="text-gray-500">Sign in to continue ...</p>
//         </div>

//         <form>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Your Email
//             </label>
//             <input
//               type="email"
//               placeholder="Enter email"
//               className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
//             />
//           </div>

//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center">
//               <input type="checkbox" className="mr-2" />
//               <label className="text-sm text-gray-600">Remember me</label>
//             </div>
//             <a href="#" className="text-sm text-teal-600 hover:underline">
//               Forgot password?
//             </a>
//           </div>

//           <button className="w-full bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 transition">
//             Log in
//           </button>
//         </form>

//         <div className="flex items-center my-6">
//           <div className="flex-grow border-t border-gray-300"></div>
//           <span className="px-3 text-gray-500">or sign up with</span>
//           <div className="flex-grow border-t border-gray-300"></div>
//         </div>

//         <div className="flex justify-center gap-4">
//           <a
//             href="#"
//             className="bg-gray-200 p-3 rounded-full hover:bg-gray-300"
//           >
//             <FaFacebookF className="text-teal-700" />
//           </a>
//           <a
//             href="#"
//             className="bg-gray-200 p-3 rounded-full hover:bg-gray-300"
//           >
//             <FaTwitter className="text-teal-700" />
//           </a>
//           <a
//             href="#"
//             className="bg-gray-200 p-3 rounded-full hover:bg-gray-300"
//           >
//             <FaLinkedinIn className="text-teal-700" />
//           </a>
//         </div>

//         <p className="text-center text-gray-600 mt-6">
//           Don't have an account?{" "}
//           <a href="#" className="text-teal-600 font-semibold hover:underline">
//             Register
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
