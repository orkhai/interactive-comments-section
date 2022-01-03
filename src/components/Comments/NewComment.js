import React, { useRef, useContext } from "react";
import CommentContext from "../../store/comment-context";
import classes from "./NewComment.module.css";
import Card from "../UI/Card";

const NewComment = () => {
  const commentCtx = useContext(CommentContext);
  const commentRef = useRef();

  const addComment = (e) => {
    e.preventDefault();
    const enteredComment = commentRef.current.value;

    commentCtx.addComment(enteredComment);
    commentRef.current.value = "";
  };

  return (
    <Card className={classes.add_comment}>
      <form onSubmit={addComment}>
        <label htmlFor="comment" />
        <input
          id="comment"
          type="text"
          placeholder="Add a comment..."
          ref={commentRef}
        />
        <div className={classes.profile_button}>
          <div className={classes.user_profile}></div>
          <button type="submit" className={classes.send}>
            Send
          </button>
        </div>
      </form>
    </Card>
  );
};

export default NewComment;
