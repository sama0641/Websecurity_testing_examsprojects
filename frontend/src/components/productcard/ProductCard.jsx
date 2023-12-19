import React, { useState } from "react";

//Displayed icons
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { LuSend } from "react-icons/lu";

//Navigating between pages
import { Link } from "react-router-dom";

//Showing notifications
import { ToastContainer } from "react-toastify";

//URLS to talk to server
import { deleteOneProduct, headers } from "../../../utils/Urls";

//Showing notifications to user
import {
  errorNotification,
  successNotification,
} from "../shared/notifications/Notification";

import Overlay from "../shared/overlay/Overlay";
import Modal from "../shared/modal/Modal";
import EditProduct from "../editproduct/EditProduct";

const ProductCard = ({
  id,
  name,
  description,
  image,
  price,
  quantity,
  role,
  sendBackDeletedProduct,
  sendBackEditedProduct,
  privacy,
}) => {
  const [editPopup, setEditPopup] = useState(false);
  const closePopup = () => {
    setEditPopup(false);
  };
  //Logic to show only part of description
  const truncatedDescription =
    description.length > 100 ? `${description.slice(0, 100)}...` : description;

  //Product deletion function
  const productDeletionHandler = async (productId) => {
    try {
      let response = await fetch(deleteOneProduct(productId), {
        method: "DELETE",
        headers,
        credentials: "include",
      });
      response = await response.json();
      console.log(response);
      if (response.success == true) {
        successNotification("Successfully deleted") &&
          sendBackDeletedProduct(productId);
      } else {
        errorNotification(
          response.message || "Something went wrong in fetching"
        );
      }
    } catch (error) {
      errorNotification("Failed to delete product");
    }
  };

  //Product editing function
  const updateProducts = (updatedProduct) => {
    sendBackEditedProduct(updatedProduct);
  };
  if (role == "admin") {
    return (
      <>
        <div className="sm:w-1/2 md:w-[calc(33.3%-1rem)] border rounded-md mb-2 overflow-hidden shadow-md hover:shadow-xl">
          <div className="relative overflow-hidden h-28">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain"
            />
            <span className="absolute px-2 py-1 bg-orange-300 border border-black rounded-full right-1 top-1 text-xs">
              {`${quantity} in stock`}
            </span>
          </div>
          <div className="py-2 px-6 text-center">
            <h3 className="capitalize font-nun font-medium text-md">{name}</h3>
            <p>{truncatedDescription}</p>
            <p>${price}</p>
          </div>

          <div className="controls flex items-center justify-end p-2 gap-3">
            <Link to={`/ecoshop/${id}`}>
              <LuSend />
            </Link>
            <MdModeEditOutline
              className="cursor-pointer"
              onClick={() => {
                setEditPopup(true);
              }}
            />
            <MdDelete
              className="cursor-pointer"
              onClick={() => {
                productDeletionHandler(id);
              }}
            />
          </div>
        </div>
        <ToastContainer />
        {editPopup && (
          <Overlay onClick={closePopup}>
            <Modal>
              <EditProduct
                onClick={closePopup}
                id={id}
                name={name}
                description={description}
                image={image}
                price={price}
                quantity={quantity}
                privacy={privacy}
                updatedProduct={updateProducts}
              />
            </Modal>
          </Overlay>
        )}
      </>
    );
  }
  return (
    <>
      <Link
        className="sm:w-1/2 md:w-[calc(33.3%-1rem)] border rounded-md mb-2 overflow-hidden shadow-md hover:shadow-xl"
        to={`/ecoshop/${id}`}
      >
        <div className="relative overflow-hidden h-28">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain"
          />
          <span className="absolute px-2 py-1 bg-orange-300 border border-black rounded-full right-1 top-1 text-xs">
            {`${quantity} in stock`}
          </span>
        </div>
        <div className="py-2 px-6 text-center">
          <h3 className="capitalize font-nun font-medium text-md">{name}</h3>
          <p>{truncatedDescription}</p>
          <p>${price}</p>
        </div>
      </Link>
      <ToastContainer />
      {editPopup && (
        <Overlay onClick={closePopup}>
          <Modal>
            <EditProduct
              onClick={closePopup}
              id={id}
              name={name}
              description={description}
              image={image}
              price={price}
              quantity={quantity}
              privacy={privacy}
              updatedProduct={updateProducts}
            />
          </Modal>
        </Overlay>
      )}
    </>
  );
};

export default ProductCard;
