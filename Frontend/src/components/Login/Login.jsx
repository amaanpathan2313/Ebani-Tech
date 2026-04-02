 
 import React, { useEffect, useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slice/Login/login.slice";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { isAuthenticated, isLoading, isError, error, data } =
    useSelector((store) => store.loginUser);

  useEffect(() => {
    if (isError) {
      alert(error || "Login failed!");
    }
  }, [isError, error]);

  useEffect(() => {
    if (isAuthenticated) {
      alert(data?.msg || "Login successful!");

      // navigate after success
      localStorage.setItem("token", data.token);

      let token = localStorage.getItem("token");
      if(token){

        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, data, navigate]);

  /* 🟡 Handle Input Change */
  function handelChange(e) {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  /* 🔵 Handle Submit */
  async function handelSubmit(e) {
    e.preventDefault();

    if (!userInfo.email || !userInfo.password) {
      alert("Please fill all details!");
      return;
    }

    dispatch(loginUser(userInfo));

    setUserInfo({
      email: "",
      password: "",
    });
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handelSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={userInfo.email}
          onChange={handelChange}
        />

        <input
          type="password"
          placeholder="Enter Your Password"
          name="password"
          value={userInfo.password}
          onChange={handelChange}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <span>
          Don’t have an account?{" "}
          <Link to="/sign-up">Signup</Link>
        </span>
      </form>
    </div>
  );
};
