import React from "react";
import AllComments from "./components/Comments/AllComments";
import NewComment from "./components/Comments/NewComment";
import CommentProvider from "./store/CommentProvider";

function App() {
  return (
    <CommentProvider>
      <AllComments />
      <NewComment />
    </CommentProvider>
  );
}

export default App;
