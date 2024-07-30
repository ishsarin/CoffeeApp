import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import UserSignIn from "./UserSignIn";
import { useNavigate } from "react-router-dom";
import { PlaceMenuContext } from "../context/PlaceClickedContextProvider";

const UserSignUp = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(PlaceMenuContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signUpFormHandle = async () => {
    console.log(email, userName, password);
    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password, email }),
    });
    setUser(userName);
    localStorage.setItem("user", JSON.stringify(user));
    signinHandle();
  };

  const signinHandle = () => {
    const path = "/user/sign-in";
    navigate(path);
  };
  const guestClick = () => {
    setUser("");
    navigate("/");
    // window.location.href = "/";
  };
  return (
    <>
      <form
        action="/user/sign-in"
        className="user-signin-form"
        onSubmit={signUpFormHandle}
      >
        <div class="form">
          <div class="title">Welcome</div>
          <div class="subtitle">Let's create your account!</div>
          <div class="input-container ic1">
            <input
              id="name"
              class="input"
              type="text"
              placeholder="User Name"
              required={true}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <div class="cut"></div>
          </div>
          <div class="input-container ic2">
            <input
              id="email"
              class="input"
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required={true}
            />
            <div class="cut cut-short"></div>
          </div>
          <div class="input-container ic2">
            <input
              id="password"
              class="input"
              type="password"
              placeholder="Password"
              required={true}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div class="cut"></div>
          </div>

          <button type="text" class="btn submit">
            Submit
          </button>
        </div>
        <div className="user-signin" onClick={signinHandle}>
          Already have an account? SignIn
        </div>
        <div className="user-signin" onClick={guestClick}>
          Continue as Guest
        </div>
      </form>
    </>
  );
};

export default UserSignUp;
