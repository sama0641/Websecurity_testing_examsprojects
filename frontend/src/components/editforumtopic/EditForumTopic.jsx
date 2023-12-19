import React, { useState, useEffect } from "react";

import InputField from "../shared/inputfield/InputField";
import { ImCross } from "react-icons/im";
import Button from "../shared/button/Button";
import DOMPurify from "dompurify"; // Import DOMPurify for input sanitization

import {
  errorNotification,
  successNotification,
} from "../shared/notifications/Notification";

import { editTopic } from "../../../utils/Urls";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const privacyValues = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
];

const EditForumTopic = ({
  onClick,
  id,
  title: initialTitle,
  description: initialDescription,
  privacy: initialPrivacy,
  updatedQuestion,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [privacy, setPrivacy] = useState(initialPrivacy);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(title.trim().length > 4 && description.trim().length > 10);
  }, [title, description]);

  //Fetching headers for CSRF token mechanism
  const headers = useSelector((store) => store?.token?.headers);

  const postCreationHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      errorNotification("Incomplete or incorrect data!");
      return;
    }

    // Sanitize user inputs using DOMPurify
    const sanitizedTitle = DOMPurify.sanitize(title);
    const sanitizedDescription = DOMPurify.sanitize(description);

    // If both title and description are valid, proceed with the edit
    const dataObject = {
      id,
      title: sanitizedTitle,
      description: sanitizedDescription,
      privacy: privacy.toLowerCase(),
    };

    let response = await fetch(editTopic(id), {
      method: "PATCH",
      headers,
      credentials: "include",
      body: JSON.stringify(dataObject),
    });

    // Response handling
    response = await response.json();
    console.log(response);

    if (response.success == true) {
      successNotification("Successfully edited");
      updatedQuestion(response.updatedTopic);
    } else {
      errorNotification(response.message || "Something went wrong in editing");
    }

    // Form resetting
    setTitle("");
    setDescription("");
    setFormIsValid(false);

    // Close the modal or do any other necessary action
    onClick();
  };

  return (
    <>
      <div className="relative p-3">
        <h2 className="text-center font-play text-3xl font-semibold my-3 ">
          Edit Topic
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
            value={privacy}
            onChange={(e) => {
              setPrivacy(e.target.value);
            }}
          />
          <div className="text-center">
            <Button style="brownFilled" use="submit" text="Save Changes" />
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditForumTopic;
