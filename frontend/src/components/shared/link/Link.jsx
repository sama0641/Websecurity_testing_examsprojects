import React from "react";
import { NavLink as ReactRouterLink } from "react-router-dom";

const Link = ({ text, link, type, end }) => {
  if (type == "bars") {
    return (
      <ReactRouterLink
        to={link}
        end={end ? end : null}
        className={({ isActive }) =>
          isActive
            ? "text-white font-pop text-center font-medium block bg-darkSoil rounded-md p-2 w-full mt-2"
            : "text-white font-pop text-center font-normal block bg-lightSoil rounded-md  p-2  w-full mt-2"
        }
      >
        {text}
      </ReactRouterLink>
    );
  }
  return (
    <ReactRouterLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? "text-lightSoil font-pop font-medium"
          : "text-white font-pop font-normal"
      }
    >
      {text}
    </ReactRouterLink>
  );
};

export default Link;
