import React, { Fragment } from "react";
import classes from "./Comment.module.css";
import Card from "../UI/Card";
import CommentReplies from "./CommentReplies";

const Comment = (props) => {
  return (
    <Fragment>
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

      {props.replies.map((reply) => (
        <CommentReplies
          key={reply.id}
          image={reply.user.image.png}
          user={reply.user.username}
          timeStamp={reply.createdAt}
          content={reply.content}
          votes={reply.score}
          replying={reply.replyingTo}
        />
      ))}
    </Fragment>
  );
};

export default Comment;
