import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";

import { errorNotification } from "../components/shared/notifications/Notification";
import { viewTopic, headers } from "../../utils/Urls";
import { ToastContainer } from "react-toastify";

import AddComment from "../components/addcomment/AddComment";
import { MdOutlinePersonOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const ForumDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const addAComment = (newComment) => {
    if (post && post.comments) {
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newComment],
      }));
    }
  };

  const { id } = useParams();

  //Fetching headers for CSRF token mechanism
  const headers = useSelector((store) => store?.token?.headers);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        let response = await fetch(viewTopic(id), {
          headers,
          credentials: "include",
        });
        response = await response.json();

        if (response.success === true) {
          setPost(response.post);
        } else {
          let errorMessage;
          if (response.message.includes("not authorized")) {
            errorMessage = "Please sigin to read more";
          }
          errorNotification(errorMessage || "Something went wrong in fetching");
        }
        setLoading(false);
      } catch (error) {
        errorNotification("Failed to fetch forum topics");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <section>
      <div className="max-w-6xl mx-auto mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : post ? (
          <div className="max-w-lg mx-auto px-4">
            <h1 className="text-center text-3xl md:text-5xl my-2">
              {post.title}
            </h1>
            <p className="text-center">{post.description}</p>
            <p className="text-center py-3">
              <span className="font-medium">Posted: </span>
              {format(post.timeOfCreation)}
            </p>

            {post.comments && post.comments.length > 0 && (
              <div className="max-w-lg mx-auto mt-2">
                <h2 className="text-xl font-bold my-2 text-center">
                  Comments:
                </h2>
                <ul>
                  {post.comments.map((comment) => (
                    <li
                      key={comment._id}
                      className="flex flex-col sm:flex-row items-center mb-2 border py-2 sm:py-0 rounded-sm sm:border-0"
                    >
                      <div className="w-7 h-7 bg-gray-500 rounded-full mr-2 border border-black grid place-items-center">
                        <MdOutlinePersonOutline className="text-white" />
                      </div>
                      <p>{comment.message}</p>
                      <p className="sm:ml-auto">{format(comment.createdAt)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <AddComment id={post._id} addComment={addAComment} />
          </div>
        ) : (
          <div className="h-[70vh] grid place-items-center">
            <p className="text-center">No data available</p>
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default ForumDetailPage;
