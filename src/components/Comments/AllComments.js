import React, { useContext } from "react";
import Comment from "./Comment";
import CommentContext from "../../store/comment-context";

const AllComments = () => {
  const commentCtx = useContext(CommentContext);

  return (
    <>
      {commentCtx.comments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          image={comment.user.image.png}
          title={comment.user.username}
          timeStamp={comment.createdAt}
          content={comment.content}
          votes={comment.score}
          replies={comment.replies}
        />
      ))}
    </>
  );
};

export default AllComments;
