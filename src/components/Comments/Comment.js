import React, { useState, useContext } from "react";
import classes from "./Comment.module.css";
import Card from "../UI/Card";
import CommentReplies from "./CommentReplies";
import CommentContext from "../../store/comment-context";
import Backdrop from "../UI/Backdrop";

const Comment = (props) => {
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

  const openModal = () => {
    commentCtx.openModal();
  };

  const removeComment = () => {
    commentCtx.deleteComment(props.id);
  };

  return (
    <>
      <Card>
        <div className={classes.user}>
          <div
            className={classes.user_image}
            style={{
              backgroundImage: `url(${props.image})`,
            }}
          ></div>
          <h1>
            {props.title}{" "}
            {props.title === "juliusomo" && (
              <span className={classes.you}>you</span>
            )}
          </h1>
          <p>{props.timeStamp}</p>
        </div>

        <p>{props.content}</p>

        <div className={classes.vote_reply}>
          <div className={classes.vote}>
            <button onClick={upVoteComment} className={classes.plus}></button>
            <h2>{voteScore}</h2>
            <button
              onClick={downVoteComment}
              className={classes.minus}
            ></button>
          </div>

          {props.title === "juliusomo" ? (
            <div className={classes.delete_edit}>
              <button onClick={openModal} className={classes.delete}>
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
              <button onClick={removeComment} className={classes.yes}>
                Yes, Delete
              </button>
            </div>
          </Card>
        </>
      )}

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
    </>
  );
};

export default Comment;
