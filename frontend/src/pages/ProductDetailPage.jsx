import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {
  errorNotification,
  successNotification,
} from "../components/shared/notifications/Notification";

import { headers, getOneProduct } from "../../utils/Urls";
import { useSelector } from "react-redux";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  //Fetching headers for CSRF token mechanism
  const headers = useSelector((store) => store?.token?.headers);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        let response = await fetch(getOneProduct(id), {
          headers,
          credentials: "include",
        });
        response = await response.json();
        if (response.success === true) {
          setProduct(response.product);
        } else {
          errorNotification(
            response.message || "Something went wrong in fetching"
          );
        }
        setLoading(false);
      } catch (error) {
        errorNotification("Failed to fetch forum topics");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <section>
      <div className="max-w-6xl mx-auto mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : product ? (
          <div className="max-w-lg mx-auto">
            <h1 className="text-center text-3xl md:text-5xl my-3 font-play">
              {product.name}
            </h1>
            <div className="grid place-items-center overflow-hidden my-4">
              <img
                src={product?.image}
                alt={product.name}
                className="max-w-full"
              />
            </div>
            <div className="flex items-center justify-center gap-10">
              <p>
                <span className="font-bold font-nun">Price: </span>$
                {product.price}
              </p>
              <p>
                <span className="font-bold font-nun">In Stock:</span>{" "}
                {product.quantity}
              </p>
            </div>
            <p className="text-center mt-3">{product.description}</p>
          </div>
        ) : (
          <p>No product found</p>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default ProductDetailPage;
