import React, { useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signin() {
  const [signinObj, setSignInObj] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.msg == "user is already logined") {
          navigate("/dashboard");
        }
      });
  });

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-[url('../../images/payBg.jpeg')] bg-cover bg-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Sign In to Your Account
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                onChange={(e) => {
                  setSignInObj({ ...signinObj, username: e.target.value });
                }}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                onChange={(e) => {
                  setSignInObj({ ...signinObj, password: e.target.value });
                }}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 mt-5 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={async (event) => {
                event.preventDefault();
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  signinObj
                );

                console.log(response.data.msg);
                if (response.data.msg == "user signined successfully") {
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("firstname", response.data.firstname);
                  toast.success("Login successful")
                  navigate("/dashboard");
                } else {
                  toast.error(response.data.msg);
                }
              }}
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?
            <Link to="/signup" className="text-blue-500 hover:underline ml-2">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
