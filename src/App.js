import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Contactus from "./pages/Contactus";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <div>
          <nav>
            <ul className="nav-bar">
            <h1 id="logo">DemoApp</h1>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
              <input type="text" placeholder="Please Search Here" className="searchtext"/>
              <button id="serachbtn">Search</button>
              <Link to="/login" id="signin">LOGIN</Link>
              <button id="singupbtn"><Link to="/signup" id="signup">SIGN UP</Link></button>
            </ul>    
          </nav>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/about" element={<Aboutus></Aboutus>}></Route>
            <Route path="/contact" element={<Contactus></Contactus>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
