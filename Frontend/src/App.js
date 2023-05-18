import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import UserTable from "./Components/Main/UserTable/UserTable";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protectedroute from "./Components/ProtectedRoute/Protectedroute";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  const [count ,  setCount] = useState([])
 

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          <Route element={<Protectedroute />}>
            <Route element={<Navbar count={count} setCount={setCount} />}>
              <Route path="usertable" element={<UserTable setCount={setCount} />} />
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
