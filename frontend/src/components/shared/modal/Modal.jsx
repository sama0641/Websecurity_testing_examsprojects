import React from "react";

const Modal = ({ children }) => {
  return (
    <div
      className="bg-white w-[98%] mx-auto rounded-lg sm:w-[400px] md:w-[500px] p-3"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};

export default Modal;
