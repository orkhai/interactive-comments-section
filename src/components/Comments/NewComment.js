import React from "react";
import classes from "./NewComment.module.css";
import Card from "../UI/Card";

const NewComment = () => {
  return (
    <Card className={classes.add_comment}>
      <input type="text" placeholder="Add a comment..." />
      <div className={classes.profile_button}>
        <div className={classes.user_profile}></div>
        <button className={classes.send}>Send</button>
      </div>
    </Card>
  );
};

export default NewComment;
