import React, { useEffect, useState } from "react";

import ProductCard from "../components/productcard/ProductCard";
import Button from "../components/shared/button/Button";
import Modal from "../components/shared/modal/Modal";
import Overlay from "../components/shared/overlay/Overlay";
import CreateProduct from "../components/createproduct/CreateProduct";

import { getAllProducts } from "../../utils/Urls";
import {
  errorNotification,
  successNotification,
} from "../components/shared/notifications/Notification";

import { useSelector } from "react-redux";

const EcoShop = () => {
  const [openCreateProductModal, setOpenCreateModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //If  a new product gets added we add it right here
  const addNewProduct = (newProduct) => {
    setProducts((prevProducts) => {
      return [newProduct, ...prevProducts];
    });
  };
  //If  a  product gets removed
  const deleteAProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };
  //If a product gets edited
  const editProducts = (editedVersion) => {
    setProducts((prevProducts) => {
      const updatedArticles = [...prevProducts];
      const index = updatedArticles.findIndex(
        (article) => article._id === editedVersion._id
      );
      if (index !== -1) {
        updatedArticles[index] = editedVersion;
      }
      return updatedArticles;
    });
  };

  //checking for the role of logged in person, if he is admin then we'll show add product button otherwise hide
  const role = useSelector((store) => store?.user?.user?.role);
  //Fetching headers for CSRF token mechanism
  const headers = useSelector((store) => store?.token?.headers);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await fetch(getAllProducts, {
          headers,
          credentials: "include",
        });
        response = await response.json();

        if (response.success) {
          setProducts(response.products);
        } else {
          errorNotification(
            response.message || "Something went wrong in fetching"
          );
        }
      } catch (error) {
        errorNotification("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section>
      <section className="p-4">
        {role == "admin" && (
          <div className="text-right mb-2 md:pr-3">
            <Button
              text="Add Product"
              style="blackFilled"
              onClick={() => {
                setOpenCreateModal(true);
              }}
            />
          </div>
        )}

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center">No products to show</p>
        ) : (
          <div className="flex justify-between items-center flex-wrap">
            {products.map((product) => (
              <ProductCard
                id={product._id}
                key={product._id}
                name={product.name}
                description={product.description}
                image={product.image}
                price={product.price}
                quantity={product.quantity}
                privacy={product.privacy}
                role={role}
                sendBackDeletedProduct={deleteAProduct}
                sendBackEditedProduct={editProducts}
              />
            ))}
          </div>
        )}
      </section>

      {openCreateProductModal && (
        <Overlay
          onClick={() => {
            setOpenCreateModal(false);
          }}
        >
          <Modal>
            <CreateProduct
              onClick={() => {
                setOpenCreateModal(false);
              }}
              sendBackNewProduct={addNewProduct}
            />
          </Modal>
        </Overlay>
      )}
    </section>
  );
};

export default EcoShop;
