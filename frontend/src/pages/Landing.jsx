import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
        {/* Navbar */}
        <header className="w-full py-4 bg-white shadow">
          <nav className="container mx-auto flex items-center justify-between px-4">
            <h1 className="text-2xl font-bold text-purple-600">e-payWallet</h1>
            <ul className="flex space-x-6">
              <li>
                <Link to="#contact" className="hover:text-purple-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-500"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto flex flex-col items-center py-16 px-4 text-center md:flex-col md:text-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Fast & Secure Online Payments
            </h2>
            <p className="text-gray-600 mb-8">
              Simplify your transactions and handle your money easily with
              e-payWallet. Fast, secure, and designed with you in mind.
            </p>
            <Link
              to="/signup"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
            >
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 py-3">
            <img
              src="../../images/payIllustration.jpg"
              alt="Online Payment Illustration"
              className="w-full max-w-md h-auto mx-auto"
            />
          </div>
        </section>

        {/* Call to Action Section */}
        <section
          id="signup"
          className="py-16 bg-purple-600 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to Experience Seamless Payments?
          </h3>
          <p className="mb-8">
            Sign up today and take control of your payments like never before.
          </p>
          <Link
            to="/signup"
            className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100"
          >
            Get Started
          </Link>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-400 py-6">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 e-payWallet. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
