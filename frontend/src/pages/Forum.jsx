import React, { useState, useEffect } from "react";

import ForumSearchBar from "../components/forumsearchbar/ForumSearchBar";
import ForumCard from "../components/forumcard/ForumCard";
import Button from "../components/shared/button/Button";
import Modal from "../components/shared/modal/Modal";
import Overlay from "../components/shared/overlay/Overlay";
import CreateForumTopic from "../components/createforumtopic/CreateForumTopic";
import {
  errorNotification,
  successNotification,
} from "../components/shared/notifications/Notification";
import { getAllTopics } from "../../utils/Urls";

import { useDispatch, useSelector } from "react-redux";
import { StartLoading, Fetched, CloseLoading } from "../store/allarticles";

const Forum = () => {
  const [topicModalStatus, setTopicModalStatus] = useState(false);
  const [data, setData] = useState([]);

  const loading = useSelector((store) => store?.allArticles?.loading);
  const isLoggedIn = useSelector((store) => store?.user?.isLoggedIn);
  //Fetching headers for CSRF token mechanism
  const headers = useSelector((store) => store?.token?.headers);

  const closeModal = () => {
    setTopicModalStatus(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        dispatch(StartLoading());
        let response = await fetch(getAllTopics, {
          headers,
          credentials: "include",
        });
        response = await response.json();
        response.success == true && setData(response.topics);
        response.success == false &&
          errorNotification(
            response.message || "something went wrong in fetching"
          );
        dispatch(CloseLoading());
      } catch (error) {
        // Handle error, show notification, etc.
        errorNotification("Failed to fetch forum topics");
        dispatch(CloseLoading());
      }
    };

    fetchPosts();
  }, [dispatch]);

  return (
    <section>
      <section className="max-w-6xl mx-auto px-1 relative">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="w-full sm:flex-1">
            <ForumSearchBar />
          </div>
          {isLoggedIn && (
            <div>
              <Button
                style="blackFilled"
                text="Post Question"
                onClick={() => {
                  setTopicModalStatus(true);
                }}
              />
            </div>
          )}
        </div>

        <div className="py-4 flex flex-col sm:flex-row justify-between sm:items-center flex-wrap">
          {loading ? (
            <p>Loading...</p>
          ) : data.length === 0 ? (
            <p>No forum topics available</p>
          ) : (
            data.map((item) => (
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
      {topicModalStatus && (
        <Overlay onClick={closeModal}>
          <Modal>
            <CreateForumTopic onClick={closeModal} />
          </Modal>
        </Overlay>
      )}
    </section>
  );
};

export default Forum;
