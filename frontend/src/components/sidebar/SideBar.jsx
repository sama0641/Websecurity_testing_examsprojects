import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import Overlay from "../shared/overlay/Overlay";
import Modal from "../shared/modal/Modal";
import Button from "../shared/button/Button";
import Link from "../shared/link/Link";
import { MdOutlinePersonOutline } from "react-icons/md";
import { updateProfilePicture } from "../../../utils/Urls";
import {
  successNotification,
  errorNotification,
} from "../shared/notifications/Notification";

import { ToastContainer } from "react-toastify";

import { imageUrlReturner } from "../shared/FetchProfilePicture";
import { useSelector, useDispatch } from "react-redux";
import { UpdateUser } from "../../store/userSlice";

const UploadPicture = ({ onClick, token }) => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      if (selectedImage.size <= 1024 * 1024) {
        setImage(selectedImage);
        const reader = new FileReader();
        reader.onload = (e) => {};
        reader.readAsDataURL(selectedImage);
      } else {
        errorNotification("Please choose an image less than 1MB in size.");
        setImage(null);
      }
    }
  };

  const handleUpdateClick = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      try {
        const response = await fetch(updateProfilePicture, {
          method: "POST",
          credentials: "include",
          headers: {
            "CSRF-Token": token,
          },
          body: formData,
        });

        const data = await response.json();

        data.success
          ? successNotification("Profile Picture uploaded successfully") &&
            dispatch(UpdateUser(data.user))
          : errorNotification("Error Uploading profile picture");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        onClick();
      }
    } else {
      errorNotification("Please choose to upload.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center relative">
        <h3 className="text-3xl text-center font-play my-4">
          Update your profile picture
        </h3>
        <ImCross
          className="absolute right-0 top-0 cursor-pointer"
          onClick={() => {
            onClick();
          }}
        />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              marginBottom: "10px",
            }}
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          capture="user"
        />
        <div className="mt-4">
          <Button
            onClick={handleUpdateClick}
            style="brownFilled"
            use="submit"
            text="Update"
            disabled={!image}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const SideBar = () => {
  const [pictureModal, setPictureModal] = useState(false);
  const picture = useSelector((store) => store?.user?.user?.profilePicture);
  const userName = useSelector((store) => store?.user?.user?.fullname);
  const userRole = useSelector((store) => store?.user?.user?.role);
  const token = useSelector((store) => store?.token?.token);

  const closeModal = () => {
    setPictureModal(false);
  };

  const normalStyles =
    "text-center bg-white w-12 h-12 rounded-full mx-auto  cursor-pointer";
  const imageStyles = `${normalStyles} grid place-items-center`;

  return (
    <>
      <div className="flex flex-col px-2 justify-between min-h-[88vh] h-full py-10">
        <div>
          <div className={picture ? normalStyles : imageStyles}>
            {picture ? (
              <img
                src={`https://localhost:8080/${imageUrlReturner()}`}
                className="w-12 h-12 rounded-full object-cover"
                onClick={() => {
                  setPictureModal(true);
                }}
              />
            ) : (
              <MdOutlinePersonOutline
                className="text-3xl"
                onClick={() => {
                  setPictureModal(true);
                }}
              />
            )}
          </div>
          <div>
            <p className="text-center font-play text-xs mt-2 font-normal">
              Welcome
            </p>
            <p className="text-center font-nun">{userName}</p>
          </div>
        </div>
        <div className="">
          <Link text="Forum" link="/dashboard/forum" type="bars" />
          {userRole == "admin" && (
            <>
              <Link
                text="Users Data"
                link="/dashboard/alluserdata"
                type="bars"
              />
              <Link
                text="Private Products"
                link="/dashboard/privateproducts"
                type="bars"
              />
            </>
          )}
        </div>
        <div className="text-center">settings</div>
      </div>
      {pictureModal && (
        <Overlay onClick={closeModal}>
          <Modal>
            <UploadPicture onClick={closeModal} token={token} />
          </Modal>
        </Overlay>
      )}
      <ToastContainer />
    </>
  );
};

export default SideBar;
