import React, { useEffect, useState } from "react";

import ForumCard from "../components/forumcard/ForumCard";
import { getAllForumTopics, headers } from "../../utils/Urls";
import { errorNotification } from "../components/shared/notifications/Notification";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const UserShop = () => {
  const [topics, setTopics] = useState([]);

  //Fetching headers for CSRF token mechanism
  const headers = useSelector((store) => store?.token?.headers);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response = await fetch(getAllForumTopics, {
          headers,
          credentials: "include",
        });
        response = await response.json();

        if (response.success == true) {
          setTopics(response.forumTopics);
        } else {
          errorNotification(
            response.message || "Something went wrong in fetching"
          );
        }
      } catch (error) {
        errorNotification("Failed to fetch forum topics");
      }
    };

    fetchPosts();
  }, []);
  return (
    <>
      <section className="p-4 my-3">
        <div className="flex justify-between items-center flex-wrap">
          {topics.map((topic) => {
            return (
              <ForumCard
                type="adminView"
                key={topic._id}
                id={topic._id}
                cardTitle={topic.title}
                cardDescription={topic.description}
                time={topic.timeOfCreation}
                privacy={topic.privacy}
              />
            );
          })}
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default UserShop;
