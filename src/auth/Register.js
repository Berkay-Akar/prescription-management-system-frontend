import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { userContext } from "../App";

export default function Register(props) {
  const siteUrl = "prescription-management-system-backend.vercel.app";
  const registerEndpoint = `https://prescription-backend-tfos.onrender.com//auth/signup`;
  console.log(registerEndpoint);
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pharmacyName: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      alert("Password and confirm password must be the same");
      return;
    }
    try {
      const res = await axios.post(
        "prescription-management-system-backend.vercel.app/auth/signup",
        formData
      );
      if (res.data.token) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        alert("Registration Successful");
        navigate("/auth/login");
      } else {
        throw new Error(res.data.error || "Registration failed");
      }
    } catch (error) {
      console.log(error.response?.data?.error || "Error registering user");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <Link to="/">
            <h3 className="text-4xl font-bold text-purple-600">Logo</h3>
          </Link>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form>
            <div>
              <label
                htmlFor="pharmacyName"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Pharmacy Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  id="pharmacyName"
                  type="text"
                  name="pharmacyName"
                  value={formData.pharmacyName}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Username
              </label>
              <div className="flex flex-col items-start">
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {formData.password !== formData.password_confirmation && (
                  <span className="inline-flex text-sm text-red-700">
                    Password and confirm password must be same
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <Link
                className="text-sm text-gray-600 underline hover:text-gray-900"
                to="/auth/login"
              >
                Already registered?
              </Link>
              <button
                type="submit"
                onClick={handleRegister}
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
