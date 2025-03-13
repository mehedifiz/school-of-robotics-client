import React, { useState } from "react";

const Register = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-700">
          {isLogin ? "Login" : "Register"}
        </h2>
        <p className="text-gray-500 text-center mb-6">
          {isLogin
            ? "Welcome back! Please login to continue."
            : "Create an account to get started."}
        </p>
        <form className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-600">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                placeholder="Your name"
              />
            </div>
          )}
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
              placeholder="Password"
            />
          </div>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="text-indigo-600 hover:underline ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
