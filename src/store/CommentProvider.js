import React, { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import CommentContext from "./comment-context";
import data from "../data.json";

const CommentProvider = (props) => {
  const [commentsList, setCommentsList] = useState(data.comments);
  const [id, setId] = useState(5);

  // const replacerFunc = () => {
  //   const visited = new WeakSet();
  //   return (key, value) => {
  //     if (typeof value === "object" && value !== null) {
  //       if (visited.has(value)) {
  //         return;
  //       }
  //       visited.add(value);
  //     }
  //     return value;
  //   };
  // };

  // useEffect(() => {
  //   const json = localStorage.getItem("comments");
  //   const savedComments = JSON.parse(json);
  //   if (savedComments) {
  //     setCommentsList(savedComments);
  //   }
  //   console.log(savedComments);
  // }, []);

  // useEffect(() => {
  //   const json = JSON.stringify(commentsList);
  //   localStorage.setItem("comments", json);
  //   console.log(json);
  // }, [commentsList]);

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
              webp: data.currentUser.image.webp,
            },
            username: data.currentUser.username,
          },
          replies: [],
        },
      ];
    });
  };

  const deleteCommentHandler = (id) => {
    const filteredComments = commentsList.filter(
      (comment) => comment.id !== id
    );
    setCommentsList(filteredComments);
  };

  const editCommentHandler = (uComment, id) => {
    const updatedComments = commentsList.map((comment) => {
      if (comment.id === id) {
        return {
          id: comment.id,
          content: uComment,
          createdAt: <ReactTimeAgo date={new Date()} locale="en-US" />,
          score: 0,
          user: {
            image: {
              webp: data.currentUser.image.webp,
            },
            username: data.currentUser.username,
          },
          replies: [],
        };
      } else {
        return comment;
      }
    });
    setCommentsList(updatedComments);
  };

  const commentContext = {
    comments: commentsList,
    addComment: addCommentHandler,
    deleteComment: deleteCommentHandler,
    editComment: editCommentHandler,
  };

  return (
    <CommentContext.Provider value={commentContext}>
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
