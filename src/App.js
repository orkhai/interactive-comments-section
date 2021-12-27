import React, { useState } from "react";
import AllComments from "./components/Comments/AllComments";
import NewComment from "./components/Comments/NewComment";
import data from "./data.json";

const commentsData = data.comments;

function App() {
  const [commentsList, setCommentsList] = useState(commentsData);
  const [id, setId] = useState(5);

  const addCommentHandler = (uComment) => {
    setId((prevState) => prevState + 1);
    setCommentsList((prevList) => {
      return [
        ...prevList,
        {
          id: id,
          content: uComment,
          createdAt: "Just now",
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

  return (
    <>
      <AllComments comments={commentsList} />
      <NewComment onAddComment={addCommentHandler} />
    </>
  );
}

export default App;
