import React from "react";

const Button = ({ text, use, onClick, style, disabled }) => {
  if (style == "filled") {
    return (
      <button
        className="px-5 py-1 bg-white text-darkSoil rounded-md"
        onClick={
          onClick
            ? () => {
                onClick();
              }
            : null
        }
        type={use ? use : "button"}
      >
        {text}
      </button>
    );
  } else if (style == "brownFilled") {
    return (
      <button
        className={
          disabled
            ? "px-5 py-1 bg-lightSoil cursor-not-allowed text-white rounded-md"
            : "px-5 py-1 bg-darkSoil text-white rounded-md"
        }
        onClick={
          onClick
            ? () => {
                onClick();
              }
            : null
        }
        disabled={disabled ? disabled : null}
        type={use ? use : "button"}
      >
        {text}
      </button>
    );
  } else if (style == "blackFilled") {
    return (
      <button
        className={
          disabled
            ? "px-5 py-1 bg-lightSoil cursor-not-allowed text-white rounded-md"
            : "px-5 py-1 bg-black text-white rounded-md"
        }
        onClick={
          onClick
            ? () => {
                onClick();
              }
            : null
        }
        disabled={disabled ? disabled : null}
        type={use ? use : "button"}
      >
        {text}
      </button>
    );
  }
  return (
    <button
      className="px-5 py-1 text-white border border-lightSoil rounded-md"
      onClick={
        onClick
          ? () => {
              onClick();
            }
          : null
      }
      type={use ? use : "button"}
    >
      {text}
    </button>
  );
};

export default Button;
