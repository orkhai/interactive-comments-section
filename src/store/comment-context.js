import React from "react";

const CommentContext = React.createContext({
  comments: [],
  addComment: () => {},
  addReply: () => {},
  deleteComment: () => {},
  deleteReply: () => {},
  editComment: () => {},
  editReply: () => {},
});

export default CommentContext;
