import TopBar from "./components/TopBar";
import Balance from "./components/Balance";
import Users from "./components/Users";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import LoginSuccessful from "./pages/LoginSuccessful";
import Landing from "./pages/Landing";

import Transfer from "./pages/Transfer";
import TranferSuccessful from "./pages/TranferSuccessful";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/transferSuccessful" element={<TranferSuccessful />} />
          
          <Route path="/transfer" element={<Transfer />} />

          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
