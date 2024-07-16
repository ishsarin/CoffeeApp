import React from "react";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlaceMenuContext } from "../context/PlaceClickedContextProvider";
const UserSignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const { user, setUser } = useContext(PlaceMenuContext);

  const naviagte = useNavigate();

  const signInFormHandle = async (e) => {
    e.preventDefault();
    // console.log(userName, password);

    try {
      const res = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const user = await res.json();
      console.log("User signed in:", user);
      setUser(userName);
      // window.location.href = "/";
      naviagte("/");
    } catch (error) {
      setShow(false);
      console.log("User not found");
    }
  };

  return (
    <>
      {!show ? (
        <Alert
          className="error-alert"
          variant="danger"
          onClose={() => {
            setShow(true);
          }}
          dismissible
        >
          <Alert.Heading>Invalid UserName or Password</Alert.Heading>
          <p>Please Try Again!</p>
        </Alert>
      ) : (
        ""
      )}
      <form className="user-signin-form" onSubmit={(e) => signInFormHandle(e)}>
        <div class="form">
          <div class="title">Welcome</div>
          <div class="subtitle">Please Sign In your Account!</div>
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

          <button type="text" class="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default UserSignIn;
