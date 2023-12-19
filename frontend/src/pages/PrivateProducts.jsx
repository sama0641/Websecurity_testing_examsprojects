import React, { useEffect, useState } from "react";

import ProductCard from "../components/productcard/ProductCard";
import { getPrivateProducts } from "../../utils/Urls";
import { errorNotification } from "../components/shared/notifications/Notification";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const PrivateProducts = () => {
  const [products, setProducts] = useState([]);
  const [openCreateProductModal, setOpenCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  //Fetching headers for CSRF token mechanism
  const headers = useSelector((store) => store?.token?.headers);
  const role = useSelector((store) => store?.user?.user?.role);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await fetch(getPrivateProducts, {
          headers,
          credentials: "include",
        });
        response = await response.json();
        if (response.success == true) {
          setProducts(response.privateProducts);
        } else {
          errorNotification(
            response.message || "Something went wrong in fetching"
          );
        }
      } catch (error) {
        errorNotification("Failed to fetch forum topics");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <section className="p-4 my-3">
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
      <ToastContainer />
    </>
  );
};

export default PrivateProducts;
