import React from "react";

const CommentContext = React.createContext({
  comments: [],
  addComment: () => {},
  deleteComment: () => {},
  editComment: () => {},
});

export default CommentContext;
