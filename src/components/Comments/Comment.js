import React from "react";
import classes from "./Comment.module.css";
import Card from "../UI/Card";

const Comment = (props) => {
  return (
    <Card>
      <div className={classes.user}>
        <div
          className={classes.user_image}
          style={{
            backgroundImage: `url(${props.image})`,
          }}
        ></div>
        <h1>{props.title}</h1>
        <p>{props.timeStamp}</p>
      </div>

      <p>{props.content}</p>

      <div className={classes.vote_reply}>
        <div className={classes.vote}>
          <button className={classes.plus}></button>
          <h2>{props.votes}</h2>
          <button className={classes.minus}></button>
        </div>

        <button className={classes.reply}>Reply</button>
      </div>
    </Card>
  );
};

export default Comment;
