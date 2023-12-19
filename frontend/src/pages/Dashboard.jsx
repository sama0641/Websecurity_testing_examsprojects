import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  errorNotification,
  successNotification,
} from "../components/shared/notifications/Notification";
import ForumCard from "../components/forumcard/ForumCard";
import {
  getAllTopicsForAPerson,
  deleteTopic,
  viewTopic,
} from "../../utils/Urls";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import { FiEdit2 } from "react-icons/fi";

import EditForumTopic from "../components/editforumtopic/EditForumTopic";
import Overlay from "../components/shared/overlay/Overlay";
import Modal from "../components/shared/modal/Modal";

const Dashboard = () => {
  const userId = useSelector((store) => store?.user?.user?._id);
  const [usersArticles, setUsersArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTopic, setEditTopic] = useState(null);
  const [editModal, setEditModal] = useState(false);

  const closeEditModal = () => {
    setEditModal(false);
  };

  const updatedForumQuestion = (updateQuestion) => {
    setUsersArticles((prevArticles) => {
      const updatedArticles = [...prevArticles];
      const index = updatedArticles.findIndex(
        (article) => article._id === updateQuestion._id
      );
      if (index !== -1) {
        updatedArticles[index] = updateQuestion;
      }
      return updatedArticles;
    });
  };

  //Fetching headers for CSRF token mechanism
  const headers = useSelector((store) => store?.token?.headers);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response = await fetch(getAllTopicsForAPerson(userId), {
          headers,
          credentials: "include",
        });
        response = await response.json();

        if (response.success) {
          setUsersArticles(response.userTopics);
        } else {
          errorNotification(
            response.message || "Something went wrong in fetching"
          );
        }
      } catch (error) {
        errorNotification("Failed to fetch forum topics");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const topicDeletionHandler = async (topicId) => {
    try {
      let response = await fetch(deleteTopic(topicId), {
        method: "DELETE",
        headers,
        credentials: "include",
      });
      response = await response.json();

      if (response.success == true) {
        successNotification("Successfully deleted");

        // Remove the deleted topic from usersArticles
        setUsersArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== topicId)
        );
      } else {
        errorNotification(
          response.message || "Something went wrong in fetching"
        );
      }
    } catch (error) {
      errorNotification("Failed to fetch forum topics");
    } finally {
      setLoading(false);
    }
  };

  const topicEditHandler = async (topicId) => {
    try {
      let response = await fetch(viewTopic(topicId), {
        headers,
        credentials: "include",
      });
      response = await response.json();
      if (response.success === true) {
        setEditTopic(response.post);
        setEditModal(true);
      } else {
        errorNotification(
          response.message || "Something went wrong in fetching"
        );
      }
    } catch (error) {
      // Handle error, show notification, etc.
      errorNotification("Failed to fetch forum topics");
    }
  };

  const renderArticles = () => {
    if (loading) {
      return <p className="text-center">Loading...</p>;
    } else if (usersArticles && usersArticles.length > 0) {
      return (
        <>
          <div className="flex flex-col md:flex-row md:justify-between flex-wrap items-center p-2 lg:p-4">
            {usersArticles.map((article) => (
              <div
                key={article._id}
                className="block sm:w-[calc(50%-1rem)] md:w-[calc(33%-1rem)] mb-2 rounded-md shadow-md hover:shadow-xl cursor-pointer p-3 border border-black"
              >
                <ForumCard
                  id={article._id}
                  cardTitle={article.title}
                  cardDescription={article.description}
                  time={article.timeOfCreation}
                  privacy={article.privacy}
                />

                <div className="flex items-center justify-end gap-3 mt-2">
                  <MdOutlineDeleteOutline
                    onClick={() => {
                      topicDeletionHandler(article._id);
                    }}
                  />
                  <Link to={`/forum/${article._id}`}>
                    <LuSend />
                  </Link>
                  <FiEdit2
                    onClick={() => {
                      topicEditHandler(article._id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          {editModal && (
            <Overlay onClick={closeEditModal}>
              <Modal>
                <EditForumTopic
                  id={editTopic._id}
                  title={editTopic.title}
                  description={editTopic.description}
                  privacy={editTopic.privacy}
                  onClick={closeEditModal}
                  updatedQuestion={updatedForumQuestion}
                />
              </Modal>
            </Overlay>
          )}
        </>
      );
    } else {
      return (
        <p className="text-center">
          You haven't yet posted any question on forum.
        </p>
      );
    }
  };

  return (
    <section>
      <h2 className="text-center text-3xl my-3 font-play">
        Your Articles on Platform
      </h2>
      {renderArticles()}
    </section>
  );
};

export default Dashboard;
