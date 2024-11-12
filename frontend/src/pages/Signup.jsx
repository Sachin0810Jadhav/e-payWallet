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

export default function Signup() {
  const [signupObj, setSignupObj] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
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
            Create an Account
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => {
                  setSignupObj({ ...signupObj, firstname: e.target.value });
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Carter"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => {
                  setSignupObj({ ...signupObj, lastname: e.target.value });
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => {
                  setSignupObj({ ...signupObj, username: e.target.value });
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => {
                  setSignupObj({ ...signupObj, password: e.target.value });
                }}
              />
            </div>

            <button
              onClick={async (event) => {
                event.preventDefault();
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  signupObj
                );

                if (response.data.msg == "user created successfully") {
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("firstname", response.data.firstname);
                  toast.success("Signup Succesful")
                  navigate("/dashboard");
                } else {
                  toast.error(response.data.msg);
                }
              }}
              className="w-full px-4 py-2 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="submit"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
