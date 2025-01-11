import React, { useState } from "react";
import "../styles/LoginSignup.css";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [action, setAction] = useState("Log In");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  const toggleForm = () => {
    setAction(action === "Log In" ? "Sign Up" : "Log In");
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setRole("USER");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwtToken", data.jwt);
        alert("Welcome!");
        navigate("/lakes");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("Login error: " + error.message);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          phone: phone,
          role: role,
          password: password,
        }),
      });

      if (response.ok) {
        alert("Registered successfully!");
        toggleForm();
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      alert("Registration error: " + error.message);
    }
  };

  return (
    <div className="ls-container">
      <div className="ls-header">
        <div className="ls-text">{action}</div>
        <div className="ls-underline"></div>
      </div>
      <div className="ls-inputs">
        <div className="ls-input-login">
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {action === "Sign Up" && (
          <>
            <div className="ls-input-login">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="ls-input-login">
              <input
                type="text"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="ls-input-login">
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </>
        )}

        <div className="ls-input-login">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="ls-submit-container">
        <div
          className="ls-submit"
          onClick={() => {
            action === "Log In" ? handleLogin() : handleRegister();
          }}
        >
          {action}
        </div>
      </div>
      <div className="ls-toggle-action">
        {action === "Log In" ? (
          <p>
            Don't have an account? <span onClick={toggleForm}>Sign Up</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={toggleForm}>Sign In</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
