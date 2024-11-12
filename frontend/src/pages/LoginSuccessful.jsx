import React from "react";
import { Link } from "react-router-dom";

export default function LoginSuccessful() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen h-screen bg-[url('../../images/payBg.jpeg')] bg-cover bg-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-green-600">
            Login Successful!
          </h1>
          <p className="mt-4 text-gray-700">
            You have successfully logged in to your account.
          </p>
          <Link
            to="/dashboard"
            className="mt-6 inline-block px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
