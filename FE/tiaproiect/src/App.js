import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/LoginSignup";
import About from "./pages/About";
import Lakes from "./pages/Lakes";
import LakeDetails from "./pages/LakeDetails";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/lakes" exact element={<Lakes />} />
          <Route path="/lake/:id" element={<LakeDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
