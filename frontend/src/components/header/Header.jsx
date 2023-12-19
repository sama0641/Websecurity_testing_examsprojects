import React, { useState, useEffect } from "react";
import Link from "../shared/link/Link";

import Logo from "../../assets/eco-logo.png";
import { Link as DefaultLink } from "react-router-dom";
import Button from "../shared/button/Button";
import Overlay from "../shared/overlay/Overlay";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Modal from "../shared/modal/Modal";
import { motion } from "framer-motion";
import { CgMenuLeft } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Logout as LogoutAction } from "../../store/userSlice";
import Cookies from "js-cookie";

const Header = () => {
  const [activateSignup, setActivateSignup] = useState(false);
  const [activateLogin, setActivateLogin] = useState(false);
  const [menu, setMenu] = useState(false);

  const isLoggedIn = useSelector((store) => store?.user?.isLoggedIn);

  const closeSignUpModal = () => {
    setActivateSignup(false);
  };
  const closeLoginUpModal = () => {
    setActivateLogin(false);
  };
  const dispatch = useDispatch();
  // logoutHandler
  const logoutHandler = () => {
    // Remove the cookie with the same options
    Cookies.remove("access_token", { path: "/" });

    dispatch(LogoutAction());
  };

  return (
    <>
      <motion.header
        className={`bg-darkGreen text-white p-4 md:p-0`}
        initial={{
          top: "-100vh",
          opacity: 0,
        }}
        animate={{
          top: 0,
          opacity: 1,
          transition: {
            duration: 0.7,
          },
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold w-1/4">
            <DefaultLink to="/" className="flex items-center ">
              <img src={Logo} alt="EcoGrow-logo" className="w-10 h-10" />
              <span>EcoGrow</span>
            </DefaultLink>
          </div>

          {/* Navigation Links */}
          <nav
            className={`flex flex-col absolute ${
              menu ? "top-19 -left-0" : "top-[-100%] left-0"
            } top-14 h-[90vh] transition-all duration-100 md:h-auto bg-darkGreen text-black md:text-white md:flex-row md:bg-transparent md:static space-y-8 md:space-x-4 md:space-y-0 justify-center  items-center z-50 w-full md:w-3/4 md:py-4`}
          >
            <div className="w-2/3 flex flex-col md:flex-row justify-center items-center gap-8">
              <Link text="Forum" link="/forum" />
              <Link text="EcoShop" link="/ecoshop" />
              {isLoggedIn && <Link text="Dashboard" link="/dashboard/forum" />}
            </div>

            <div className="w-1/3 flex flex-col md:flex-row justify-end items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center">
                  <Button
                    text="Logout"
                    style="brownFilled"
                    onClick={() => {
                      logoutHandler();
                      setMenu(false);
                    }}
                  />
                </div>
              ) : (
                <div className="flex gap-3 flex-col justify-center md:flex-row">
                  <Button
                    text="Login"
                    style="filled"
                    onClick={() => {
                      setActivateLogin(true);
                      setMenu(false); // Close the menu
                    }}
                  />
                  <Button
                    text="Signup"
                    style="normal"
                    onClick={() => {
                      setActivateSignup(true);
                      setMenu(false); // Close the menu
                    }}
                  />
                </div>
              )}
            </div>
          </nav>
          {menu ? (
            <RxCross1
              className="block md:hidden text-xl cursor-pointer transition-all ease-in-out"
              onClick={() => {
                setMenu((prev) => !prev);
              }}
            />
          ) : (
            <CgMenuLeft
              className="block md:hidden text-3xl cursor-pointer transition-all ease-in-out"
              onClick={() => {
                setMenu((prev) => !prev);
              }}
            />
          )}
        </div>
      </motion.header>
      {activateLogin && (
        <Overlay onClick={closeLoginUpModal}>
          <Modal>
            <Login onClick={closeLoginUpModal} />
          </Modal>
        </Overlay>
      )}
      {activateSignup && (
        <Overlay onClick={closeSignUpModal}>
          <Modal>
            <Signup onClick={closeSignUpModal} />
          </Modal>
        </Overlay>
      )}
    </>
  );
};

export default Header;
