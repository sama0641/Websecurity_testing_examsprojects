import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getSomeTopics } from "../../utils/Urls";
import { useSelector } from "react-redux";

import { errorNotification } from "../components/shared/notifications/Notification";
import ForumCard from "../components/forumcard/ForumCard";

const ForumQueryPage = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const headers = useSelector((store) => store?.token?.headers);
  const { query } = useParams();
  useEffect(() => {
    const getPosts = async () => {
      try {
        let response = await fetch(getSomeTopics(query), {
          headers,
          credentials: "include",
        });
        response = await response.json();
        response.success == true && setTopics(response.matchingTopics);
        response.success == false &&
          errorNotification(
            response.message || "something went wrong in fetching"
          );
      } catch (error) {
        // Handle error, show notification, etc.
        errorNotification("Failed to fetch forum topics");
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [query]);
  return (
    <section className="max-w-6xl mx-auto px-1 relative">
      <div className="py-4 flex flex-col sm:flex-row justify-between sm:items-center flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : topics.length === 0 ? (
          <div className="h-60vh grid place-items-center">
            <p className="text-center">No forum topics available</p>
          </div>
        ) : (
          topics.map((item) => (
            <ForumCard
              type="normal"
              key={item._id}
              id={item._id}
              cardTitle={item.title}
              cardDescription={item.description}
              time={item.timeOfCreation}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default ForumQueryPage;
