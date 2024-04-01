import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import { login } from "../axiosApi/handleAPI";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      const response = await login(email, password);

      if (response) {
        const refreshToken = response?.data?.refreshToken;
        const userId = response?.data?.id;
        const userType = String(response?.data?.role);

        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userType", userType);

        if (userType === "ADMIN") {
          navigate(location.state?.from?.pathname || "/adminpanel", {
            replace: true,
          });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        alert("Wrong info");
        navigate("/login");
      }
    } else {
      console.log("No email or Password");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />

        <button type="submit">Login</button>
        <p>
          Not registered yet? <Link to="/register">Register here</Link>
        </p>
      </form>
    </>
  );
};

export default LoginPage;
