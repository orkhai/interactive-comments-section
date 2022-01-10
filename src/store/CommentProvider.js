import React, { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import CommentContext from "./comment-context";
import data from "../data.json";

const CommentProvider = (props) => {
  const [commentsList, setCommentsList] = useState(data.comments);
  const [id, setId] = useState(5);
  const [replyId, setReplyId] = useState(50);

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

  const addReplyHandler = (uComment, id) => {
    const updatedReplies = commentsList.map((comment) => {
      if (comment.id === id) {
        return {
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          score: comment.score,
          user: {
            image: {
              webp: comment.user.image.webp,
            },
            username: comment.user.username,
          },
          replies: [
            ...comment.replies,
            {
              id: replyId,
              content: uComment,
              createdAt: <ReactTimeAgo date={new Date()} locale="en-US" />,
              score: 0,
              replyingTo: comment.user.username,
              user: {
                image: {
                  webp: data.currentUser.image.webp,
                },
                username: data.currentUser.username,
              },
            },
          ],
        };
      } else {
        return comment;
      }
    });
    setCommentsList(updatedReplies);
    setReplyId((prevState) => prevState + 1);
  };

  const deleteCommentHandler = (id) => {
    const filteredComments = commentsList.filter(
      (comment) => comment.id !== id
    );
    setCommentsList(filteredComments);
  };

  const deleteReplyHandler = (id) => {
    const updatedComments = commentsList.map((comment) => {
      return {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        score: comment.score,
        user: {
          image: {
            webp: comment.user.image.webp,
          },
          username: comment.user.username,
        },
        replies: comment.replies.filter((reply) => reply.id !== id),
      };
    });
    setCommentsList(updatedComments);
  };

  const editCommentHandler = (uComment, id) => {
    const updatedComments = commentsList.map((comment) => {
      if (comment.id === id) {
        return {
          id: comment.id,
          content: uComment,
          createdAt: comment.createdAt,
          score: comment.score,
          user: {
            image: {
              webp: comment.user.image.webp,
            },
            username: comment.user.username,
          },
          replies: comment.replies,
        };
      } else {
        return comment;
      }
    });
    setCommentsList(updatedComments);
  };

  const editReplyHandler = (uReply, id) => {
    const updatedComments = commentsList.map((comment) => {
      return {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        score: comment.score,
        user: {
          image: {
            webp: comment.user.image.webp,
          },
          username: comment.user.username,
        },
        replies: comment.replies.map((reply) => {
          if (reply.id === id) {
            return {
              ...reply,
              id: reply.id,
              content: uReply,
              createdAt: reply.createdAt,
              score: reply.score,
              replyingTo: reply.replyingTo,
              user: {
                image: {
                  webp: data.currentUser.image.webp,
                },
                username: data.currentUser.username,
              },
            };
          } else return reply;
        }),
      };
    });
    setCommentsList(updatedComments);
  };

  const commentContext = {
    comments: commentsList,
    addComment: addCommentHandler,
    addReply: addReplyHandler,
    deleteComment: deleteCommentHandler,
    deleteReply: deleteReplyHandler,
    editComment: editCommentHandler,
    editReply: editReplyHandler,
  };

  return (
    <CommentContext.Provider value={commentContext}>
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
