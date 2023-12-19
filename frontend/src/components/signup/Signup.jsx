import React, { useState, useEffect } from "react";

import InputField from "../shared/inputfield/InputField";
import { ImCross } from "react-icons/im";
import Button from "../shared/button/Button";

import { registerUrl } from "../../../utils/Urls";
import {
  successNotification,
  errorNotification,
} from "../shared/notifications/Notification";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import DOMPurify from "dompurify"; // Import DOMPurify for input sanitization

const roleOptions = [
  { value: "farmer", label: "Farmer" },
  { value: "admin", label: "Admin" },
];

const Signup = ({ onClick }) => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("Farmer");
  const [password, setPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(
      fullname.length > 3 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2,})/.test(password) &&
        password.length > 6
    );
  }, [fullname, email, password]);

  //Fetching headers for CSRF token mechanism
  const headers = useSelector((store) => store?.token?.headers);

  //Form submission Handler
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      errorNotification("Incomplete or incorrect data!");
      return;
    }
    const dataObject = {
      fullname: DOMPurify.sanitize(fullname),
      email: DOMPurify.sanitize(email),
      role: selectedOption.toLowerCase(),
      password,
    };
    console.log(dataObject);
    let response = await fetch(registerUrl, {
      method: "POST",
      body: JSON.stringify(dataObject),
      headers,
    });
    response = await response.json();
    console.log(response);
    response.success == true && successNotification("Signup successful");
    response.success == false &&
      errorNotification(response.message || "something went wrong in signup");
    //Form resetting
    setFullName("");
    setEmail("");
    setPassword("");
    setSelectedOption("farmer");
    onClick();
  };

  return (
    <>
      <div className="relative p-3">
        <h2 className="text-center font-play text-3xl font-semibold my-3 ">
          Signup
        </h2>
        <ImCross
          className="absolute right-0 top-0 cursor-pointer"
          onClick={() => {
            onClick();
          }}
        />
        <form onSubmit={handleSignup}>
          <InputField
            type="text"
            text="Full Name"
            placeholder="Name should have atleast 4 characters"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            value={fullname}
          />

          <InputField
            type="email"
            text="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="your@example.com"
            value={email}
          />

          <InputField
            type="dropdown"
            text="Signup As"
            data={roleOptions}
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
            value={selectedOption}
          />

          <InputField
            type="password"
            text="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Min 7 charcters, one uppercase, one lowercase, 3 numbers"
            value={password}
          />
          <div className="text-center mt-4">
            <Button
              text="Signup"
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

export default Signup;
