import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify"; // Import DOMPurify for input sanitization
import { ToastContainer } from "react-toastify";

import { useDispatch } from "react-redux";
import { Login as loginAction } from "../../store/userSlice";

import InputField from "../shared/inputfield/InputField";
import Button from "../shared/button/Button";
import { ImCross } from "react-icons/im";
import {
  errorNotification,
  successNotification,
} from "../shared/notifications/Notification";
import { headers, loginUrl } from "../../../utils/Urls";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const Login = ({ onClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Fetching headers for CSRF token mechanism
  const headers = useSelector((store) => store?.token?.headers);

  useEffect(() => {
    setFormIsValid(
      // Basic email validation
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
        // Password conditions
        password.trim().length > 0
    );
  }, [email, password]);

  const closeLoginModalWithDelay = () => {
    // Close the login modal after half a second (500 milliseconds)
    setTimeout(() => {
      onClick();
      navigate("/forum");
    }, 1500);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      errorNotification("Incomplete or incorrect data!");
      return;
    }

    // Sanitize user inputs using DOMPurify
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    // If both email and password are valid, proceed with the login
    const dataObject = { email: sanitizedEmail, password: sanitizedPassword };
    //Modified headers
    let response = await fetch(loginUrl, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(dataObject),
    });
    //Form resetting
    setEmail("");
    setPassword("");
    setFormIsValid(false);
    //response handling
    response = await response.json();
    response.success == true &&
      successNotification("Login successful") &&
      dispatch(loginAction(response.user)) &&
      closeLoginModalWithDelay();
    response.success == false &&
      errorNotification(response.message || "something went wrong in login");
    onClick();
  };

  return (
    <>
      <div className="relative p-3">
        <h2 className="text-center font-play text-3xl font-semibold my-3 ">
          Login
        </h2>

        <ImCross
          className="absolute right-0 top-0 cursor-pointer"
          onClick={() => {
            onClick();
          }}
        />

        <form onSubmit={handleLogin}>
          <InputField
            text="Email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="your@example.com"
            value={email}
          />

          <InputField
            text="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="somethingStrong2900"
            value={password}
          />

          <div className="text-center">
            <Button
              text="Login"
              use="submit"
              style="brownFilled"
              disabled={!formIsValid}
            />
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
