import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie"; // Import the Cookies library

import Home from "./pages/Home";
import Header from "./components/header/Header";
import Dashboard from "./pages/Dashboard";
import Forum from "./pages/Forum";
import UserShop from "./pages/UserShop";
import DashboardWrapper from "./Wrappers/DashboardWrapper";
import EcoShop from "./pages/EcoShop";
import ForumDetailPage from "./pages/ForumDetailPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ForumQueryPage from "./pages/ForumQueryPage";
import PrivateProducts from "./pages/PrivateProducts";

import Protected from "./pages/Protected";
import { Login as loginAction } from "./store/userSlice";
import { csrfTokenURL, fetchUserData } from "../utils/Urls";
import { useDispatch } from "react-redux";
import { setToken } from "./store/csrfToken";

const App = () => {
  const [localToken, setLocalToken] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch CSRF token from the server
    fetch(csrfTokenURL, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // Store the CSRF token
        dispatch(setToken(data.csrfToken));
        setLocalToken(data.csrfToken);
      })
      .catch((error) => {
        console.error("Error fetching CSRF token:", error);
      });
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    // Run this effect only if localToken exists
    if (localToken) {
      const cookie = Cookies.get("access_token");

      const pullUserData = () => {
        fetch(fetchUserData, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "CSRF-Token": localToken,
          },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((user) => {
            user.success == true && dispatch(loginAction(user.user));
          });
      };

      cookie && pullUserData();
    }
  }, [localToken]); // Run this effect whenever localToken changes

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ecoshop" element={<EcoShop />} />
        <Route path="/ecoshop/:id" element={<ProductDetailPage />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <DashboardWrapper />
            </Protected>
          }
        >
          <Route path="forum" index element={<Dashboard />} />
          <Route path="alluserdata" element={<UserShop />} />
          <Route path="privateproducts" element={<PrivateProducts />} />
        </Route>
        <Route path="/forum/query/:query" element={<ForumQueryPage />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:id" element={<ForumDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
