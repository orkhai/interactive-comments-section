import React from "react";
import Comment from "./Comment";

const AllComments = (props) => {
  return (
    <div>
      {props.comments.map((comment) => (
        <Comment
          key={comment.id}
          image={comment.user.image.png}
          title={comment.user.username}
          timeStamp={comment.createdAt}
          content={comment.content}
          votes={comment.score}
        />
      ))}
    </div>
  );
};

export default AllComments;
