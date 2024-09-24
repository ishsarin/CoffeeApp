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

  const signupClick = async (e) => {
    signUpFormHandle(e);
    setUser(userName);
    localStorage.setItem("user", JSON.stringify(user));
    signinHandle();
  };

  const signUpFormHandle = async (e) => {
    // e.preventDefault();
    // console.log(email, userName, password);
    const res = await fetch(
      "https://coffeeapp-a1t9.onrender.com/api/user/signup",
      // "/api/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password, email }),
      }
    );
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
      <div className="user-signin-form">
        <div class="form">
          <form
            // action="/user/sign-in"
            className="form-wrapper"
          >
            <div>
              <div class="title">Welcome</div>
              <div class="subtitle">Let's create your account!</div>
              <div class="input-container ic1 w-100">
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
              <div class="input-container ic2 w-100">
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
              <div class="input-container ic2 w-100">
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
            </div>
          </form>
          <div className="w-100">
            <button
              type="text"
              class="btn submit mt-0"
              // onClick={(e) => signUpFormHandle(e)}
              onClick={(e) => signupClick(e)}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="user-signin" onClick={signinHandle}>
          Already have an account? SignIn
        </div>
        <div className="user-signin" onClick={guestClick}>
          Continue as Guest
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
