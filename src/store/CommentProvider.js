import React, { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import CommentContext from "./comment-context";
import data from "../data.json";

const CommentProvider = (props) => {
  const [commentsList, setCommentsList] = useState(data.comments);
  const [id, setId] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const addCommentHandler = (uComment) => {
    setId((prevState) => prevState + 1);
    setCommentsList((prevList) => {
      return [
        ...prevList,
        {
          id: id,
          content: uComment,
          createdAt: <ReactTimeAgo date={new Date()} locale="en-US" />,
          score: 0,
          user: {
            image: {
              png: data.currentUser.image.png,
            },
            username: data.currentUser.username,
          },
          replies: [],
        },
      ];
    });
  };

  const deleteCommentHandler = (id) => {
    setModalOpen(false);
    const filteredComments = commentsList.filter(
      (comment) => comment.id !== id
    );
    setCommentsList(filteredComments);
  };

  const commentContext = {
    modalOpen: modalOpen,
    comments: commentsList,
    openModal: openModal,
    closeModal: closeModal,
    addComment: addCommentHandler,
    deleteComment: deleteCommentHandler,
  };

  return (
    <CommentContext.Provider value={commentContext}>
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
