import React, { useState } from "react";
import classes from "./CommentReplies.module.css";
import Card from "../UI/Card";

const CommentReplies = (props) => {
  const [voteScore, setVoteScore] = useState(props.votes);

  const upVoteComment = () => {
    setVoteScore((prevState) => prevState + 1);
  };

  const downVoteComment = () => {
    if (voteScore <= 0) {
      return;
    }
    setVoteScore((prevState) => prevState - 1);
  };

  return (
    <div className={classes.line_card}>
      <div className={classes.line}></div>

      <Card className={classes.reply_card}>
        <div className={classes.user}>
          <div
            className={classes.user_image}
            style={{
              backgroundImage: `url(${props.image})`,
            }}
          ></div>
          <h1>
            {props.user}{" "}
            {props.user === "juliusomo" && (
              <span className={classes.you}>you</span>
            )}
          </h1>
          <p>{props.timeStamp}</p>
        </div>

        <p>
          <span>{`@${props.replying}`}</span> {props.content}
        </p>

        <div className={classes.vote_reply}>
          <div className={classes.vote}>
            <button onClick={upVoteComment} className={classes.plus}></button>
            <h2>{voteScore}</h2>
            <button
              onClick={downVoteComment}
              className={classes.minus}
            ></button>
          </div>

          {props.user === "juliusomo" ? (
            <div className={classes.delete_edit}>
              <button className={classes.delete}>Delete</button>
              <button className={classes.edit}>Edit</button>
            </div>
          ) : (
            <button className={classes.reply}>Reply</button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CommentReplies;
