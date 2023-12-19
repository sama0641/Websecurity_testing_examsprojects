import React from "react";

import { Link } from "react-router-dom";
import { format } from "timeago.js";

const truncateDescription = (description) => {
  const maxLength = 100;
  return description.length > maxLength
    ? `${description.slice(0, maxLength)}...`
    : description;
};

const ForumCard = ({ id, cardTitle, cardDescription, time, type, privacy }) => {
  const truncatedDescription = truncateDescription(cardDescription);

  if (type === "normal") {
    return (
      <Link
        to={`/forum/${id}`}
        className="block sm:w-[calc(50%-1rem)] md:w-[calc(33%-1rem)] mb-1 rounded-md shadow-md hover:shadow-xl cursor-pointer p-3 border border-black"
      >
        <h3 className="text-2xl text-center">{cardTitle}</h3>
        <p>{truncatedDescription}</p>
        <p>
          <span className="font-medium">Created: </span> {format(time)}
        </p>
      </Link>
    );
  } else if (type == "adminView") {
    return (
      <Link
        to={`/forum/${id}`}
        className="block sm:w-[calc(48%-1rem)] md:w-[calc(32%-1rem)] mb-1 rounded-md shadow-md hover:shadow-xl cursor-pointer p-3 border border-black relative"
      >
        <h3 className="text-2xl text-center">{cardTitle}</h3>
        <p>{truncatedDescription}</p>
        <p>
          <span className="font-medium">Created: </span> {format(time)}
        </p>
        {privacy === "private" && (
          <span className="px-2 py-1 bg-sky-300 rounded-full absolute -right-0 -top-4">
            Private
          </span>
        )}
      </Link>
    );
  }
  return (
    <div className="relative">
      <h3 className="text-2xl text-center">{cardTitle}</h3>
      <p>{truncatedDescription}</p>
      <p>
        <span className="font-medium">Created: </span> {format(time)}
      </p>
      {privacy === "private" && (
        <span className="px-2 py-1 bg-sky-300 rounded-full absolute -right-2 -top-7">
          Private
        </span>
      )}
    </div>
  );
};

export default ForumCard;
