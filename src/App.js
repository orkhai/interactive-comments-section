import React, { Fragment } from "react";
import AllComments from "./components/Comments/AllComments";
import NewComment from "./components/Comments/NewComment";
import data from "./data.json";

const commentsData = data.comments;

function App() {
  return (
    <Fragment>
      <AllComments comments={commentsData} />
      <NewComment />
    </Fragment>
  );
}

export default App;
