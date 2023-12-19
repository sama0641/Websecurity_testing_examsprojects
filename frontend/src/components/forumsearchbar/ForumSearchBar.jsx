import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

const ForumSearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    if (query.trimEnd().length == 0) {
      return;
    }
    // Sanitized and kept only alphanumeric characters
    const sanitizedQuery = DOMPurify.sanitize(query).replace(
      /[^a-zA-Z0-9 ]/g,
      ""
    );

    navigate(`/forum/query/${sanitizedQuery}`);
  };

  return (
    <div className="max-w-md mx-auto my-2">
      <form
        className="flex items-center w-full"
        onSubmit={formSubmissionHandler}
      >
        <label htmlFor="forumSearch" className="sr-only">
          Search topic on forum
        </label>
        <input
          type="search"
          id="forumSearch"
          value={query}
          placeholder="Search topic on forum"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="border border-black pl-4 rounded-l-full p-2 w-full focus:outline-none"
        />
        <div className="border border-black rounded-r-full ">
          <button
            type="submit"
            className="p-[12px] focus:outline-none"
            aria-label="Search"
          >
            <IoSearchSharp />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForumSearchBar;
