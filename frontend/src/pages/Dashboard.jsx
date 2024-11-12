import React from "react";
import TopBar from "../components/TopBar";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import Home from "../components/Home"
import History from "../components/History";


export default function Dashboard() {
  const firstname = localStorage.getItem("firstname");



  return (
    <>
      <TopBar user={firstname}></TopBar>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="history" element={<History />} />
      </Routes>
      
    </>
  );
}
