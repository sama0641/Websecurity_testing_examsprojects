import React, { useState, useEffect } from "react";

import InputField from "../shared/inputfield/InputField";
import { LuSend } from "react-icons/lu";
import DOMPurify from "dompurify"; // Import DOMPurify for input sanitization

import { createAComment } from "../../../utils/Urls";
import {
  errorNotification,
  successNotification,
} from "../shared/notifications/Notification";
import { ToastContainer } from "react-toastify";

import { useSelector } from "react-redux";

const AddComment = ({ id, addComment }) => {
  const [comment, setComment] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  //Checking if user is logged in, if logged in then allow to comment, else no
  const isUserLoggedIn = useSelector((store) => store?.user?.isLoggedIn);
  //Fetching headers for CSRF token mechanism
  const headers = useSelector((store) => store?.token?.headers);

  useEffect(() => {
    setFormIsValid(comment.trim().length >= 2 && isUserLoggedIn);
  }, [comment, isUserLoggedIn]);

  const commentSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      errorNotification(
        "Comment should be atleast 2 character or please login"
      );
      return;
    }
    // Sanitize user inputs using DOMPurify
    const sanitizedcomment = DOMPurify.sanitize(comment);
    const dataObject = {
      message: sanitizedcomment,
    };
    let response = await fetch(createAComment(id), {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(dataObject),
    });

    //response handling
    response = await response.json();
    console.log(response);
    response.success == true &&
      successNotification("Successfully posted") &&
      addComment(response.comment);
    response.success == false &&
      errorNotification(response.message || "something went wrong in posting");
    //Form resetting
    setComment("");
  };
  return (
    <>
      <div className="mt-4 max-w-md mx-auto px-4 mb-2">
        <form onSubmit={commentSubmitHandler}>
          <div className="flex justify-between items-end">
            <div className="w-full">
              <InputField
                type="text"
                text="Your message"
                value={comment}
                placeholder="Your thoughts about this subject"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                className="w-full"
              />
            </div>
            <button type="submit" className="ml-1 mb-3" disabled={!formIsValid}>
              <LuSend className="text-xl" />
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddComment;
