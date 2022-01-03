import React from "react";

const CommentContext = React.createContext({
  modalOpen: false,
  comments: [],
  openModal: () => {},
  closeModal: () => {},
  addComment: () => {},
  deleteComment: () => {},
});

export default CommentContext;
