import React, { use, useEffect, useState } from "react";
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../slice/Signup/signup.slice";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phon: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { data, isLoading, isError } = useSelector((store) => store.signupUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.msg) {
      alert(data?.msg);
    }
  }, [data?.msg]);

  useEffect(() => {
    if (isError) {
      alert(data);
    }
  }, [isError]);

  function handelChange(e) {
    const { value, name } = e.target;
    setUserInfo((previous) => ({ ...previous, [name]: value }));
  }

  function handelSubmit(e) {
    e.preventDefault();

    if (
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.phon ||
      !userInfo.password
    ) {
      alert("Plz fill all Details !");
      return;
    }

    if (userInfo.phon.length != 10) {
      alert("Enter 10 digit phon number !");
      return;
    }

    console.log(userInfo);

    dispatch(signupUser(userInfo));

    setUserInfo({
      name: "",
      email: "",
      phon: "",
      password: "",
    });
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handelSubmit}>
        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Enter Your Name"
          name="name"
          value={userInfo.name}
          onChange={handelChange}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={userInfo.email}
          onChange={handelChange}
        />
        <input
          type="text"
          placeholder="Enter Your Phone Number"
          name="phon"
          value={userInfo.phon}
          onChange={handelChange}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          name="password"
          value={userInfo.password}
          onChange={handelChange}
        />

        <button type="submit">{isLoading ? "Signing up..." : "Signup"}</button>
        <span>I am  already register <Link to={'/login'}>Login</Link> </span>
      </form>
    </div>
  );
};
