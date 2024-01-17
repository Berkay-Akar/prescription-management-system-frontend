import React, { useEffect } from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../App";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const siteUrl = process.env.SITE_URL;
  const loginEndpoint = `https://prescription-backend-tfos.onrender.com/auth/login`;
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  const { setUser } = useContext(userContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const res = await axios.post(loginEndpoint, data);
      if (res.data.token) {
        console.log("DATA:", data);
        console.log("RES:", res.data);
        console.log("RES DATA:", res.data);
        const token = res.data.token;
        const user = res.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        console.log("USER:", user);
        navigate("/");
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (error) {
      console.log(error.response?.data?.error || "Error logging in user");
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          id="username"
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <Link
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            to="#"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don't have an account?{" "}
          <Link
            className="text-red-600 hover:underline hover:underline-offset-4 cursor-pointer"
            type="submit"
            to="/auth/register"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
