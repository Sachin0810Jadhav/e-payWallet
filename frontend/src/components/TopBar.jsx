import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export default function TopBar({ user }) {
  return (
    <div>
      <nav className="flex justify-between bg-purple-600 text-white px-8 p-3 text-xl ">
        <div className="flex justify-between space-x-3">
          <div className=" font-medium">
            e-payWallet
          </div>
          <Link to="">Home</Link>
          <Link to="history">History</Link>
        </div>
        <div className="flex space-x-3">
          <div>Hii, {user} </div>
          
          <Link to="/signin" onClick={()=>{localStorage.removeItem("token")}}>Signout</Link>
        </div>
      </nav>
    </div>
  );
}
