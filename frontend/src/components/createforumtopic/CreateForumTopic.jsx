import React, { useState, useEffect } from "react";

import InputField from "../shared/inputfield/InputField";
import { ImCross } from "react-icons/im";
import Button from "../shared/button/Button";
import DOMPurify from "dompurify"; // Import DOMPurify for input sanitization

import {
  errorNotification,
  successNotification,
} from "../shared/notifications/Notification";

import { createTopic } from "../../../utils/Urls";
import { ToastContainer } from "react-toastify";

import { AddArticle } from "../../store/allarticles";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

const privacyValues = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
];

const CreateForumTopic = ({ onClick, mode }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(title.trim().length > 4 && description.trim().length > 10);
  }, [title, description]);

  //Fetching headers for CSRF token mechanism
  const headers = useSelector((store) => store?.token?.headers);
  const dispatch = useDispatch();

  const postCreationHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      errorNotification("Incomplete or incorrect data!");
      return;
    }

    // Sanitize user inputs using DOMPurify
    const sanitizedtitle = DOMPurify.sanitize(title);
    const sanitizedDescription = DOMPurify.sanitize(description);

    // If both title and description are valid, proceed with the login
    const dataObject = {
      title: sanitizedtitle,
      description: sanitizedDescription,
      privacy: privacy.toLowerCase(),
    };
    let response = await fetch(createTopic, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(dataObject),
    });

    //response handling
    response = await response.json();

    response.success == true &&
      successNotification("Successfully posted") &&
      dispatch(AddArticle(response.newTopic));
    response.success == false &&
      errorNotification(response.message || "something went wrong in posting");
    //Form resetting
    setTitle("");
    setDescription("");
    setFormIsValid(false);
  };

  return (
    <>
      <div className="relative p-3">
        <h2 className="text-center font-play text-3xl font-semibold my-3 ">
          Post a Question
        </h2>
        <ImCross
          className="absolute right-0 top-0 cursor-pointer"
          onClick={() => {
            onClick();
          }}
        />
        <form action="" onSubmit={postCreationHandler}>
          <InputField
            type="text"
            text="Topic"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <InputField
            type="textarea"
            text="Describe your problem a bit"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <InputField
            type="dropdown"
            text="Privacy"
            data={privacyValues}
            onChange={(e) => {
              setPrivacy(e.target.value);
            }}
          />
          <div className="text-center">
            <Button style="brownFilled" use="submit" text="Post" />
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateForumTopic;
