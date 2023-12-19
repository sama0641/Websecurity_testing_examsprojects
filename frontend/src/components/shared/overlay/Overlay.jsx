// Overlay.js
import React from "react";

const Overlay = ({ children, onClick }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 h-screen w-screen flex items-center justify-center z-50"
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </div>
  );
};

export default Overlay;
