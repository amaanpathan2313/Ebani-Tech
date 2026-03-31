
 import React, { useState } from 'react'
import "./login.css";

export const Login = () => {

  const [userInfo, setUserInfo] = useState({
    email : "",
    password : ""
  });

  function handelChange(e){
    const {value, name} = e.target;
    setUserInfo((previous) => ({...previous, [name] : value}));
  };

  function handelSubmit(e){
    e.preventDefault();

    if(!userInfo.email || !userInfo.password){
      alert("Plz fill all Details !");
      return;
    }


    console.log(userInfo);

    setUserInfo({
      email : "",
      password : ""
    });
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handelSubmit}>
        <h2>Login</h2>
        <input type="email" placeholder='Enter Your Email' name='email' value={userInfo.email} onChange={handelChange} />
        <input type="password" placeholder='Enter Your Password' name='password' value={userInfo.password} onChange={handelChange} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
