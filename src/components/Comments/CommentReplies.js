import React, { useState, useContext } from "react";
import classes from "./CommentReplies.module.css";
import Card from "../UI/Card";
import CommentContext from "../../store/comment-context";
import Backdrop from "../UI/Backdrop";

const CommentReplies = (props) => {
  const [voteScore, setVoteScore] = useState(props.votes);
  const commentCtx = useContext(CommentContext);

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
              <button onClick={commentCtx.openModal} className={classes.delete}>
                Delete
              </button>
              <button className={classes.edit}>Edit</button>
            </div>
          ) : (
            <button className={classes.reply}>Reply</button>
          )}
        </div>
      </Card>

      {commentCtx.modalOpen && (
        <>
          <Backdrop />
          <Card className={classes.modal}>
            <h1>Delete comment</h1>
            <p>
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone.
            </p>
            <div className={classes.buttons}>
              <button onClick={commentCtx.closeModal} className={classes.no}>
                No, Cancel
              </button>
              <button className={classes.yes}>Yes, Delete</button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default CommentReplies;
