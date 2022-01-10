import React, { useState, useRef, useContext } from "react";
import classes from "./CommentReplies.module.css";
import Card from "../UI/Card";
import Backdrop from "../UI/Backdrop";
import CommentContext from "../../store/comment-context";

const CommentReplies = (props) => {
  const [voteScore, setVoteScore] = useState(props.votes);
  const [modalOpen, setModalOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const commentCtx = useContext(CommentContext);
  const replyRef = useRef();

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
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const removeReply = () => {
    commentCtx.deleteReply(props.id);
    setModalOpen(false);
  };

  const replyCommentToggler = () => {
    setReplyModalOpen(true);
  };

  const editReply = (e) => {
    e.preventDefault();

    const reply = replyRef.current.value;
    commentCtx.editReply(reply, props.id);
    setReplyModalOpen(false);
  };

  return (
    <>
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

          <p className={classes.content}>
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
                <button onClick={openModal} className={classes.delete}>
                  Delete
                </button>
                <button onClick={replyCommentToggler} className={classes.edit}>
                  Edit
                </button>
              </div>
            ) : (
              <button className={classes.reply}>Reply</button>
            )}
          </div>
        </Card>

        {modalOpen && (
          <>
            <Backdrop />
            <Card className={classes.modal}>
              <h1>Delete comment</h1>
              <p>
                Are you sure you want to delete this comment? This will remove
                the comment and can't be undone.
              </p>
              <div className={classes.buttons}>
                <button onClick={closeModal} className={classes.no}>
                  No, Cancel
                </button>
                <button onClick={removeReply} className={classes.yes}>
                  Yes, Delete
                </button>
              </div>
            </Card>
          </>
        )}
      </div>

      {replyModalOpen && (
        <Card className={classes.edit_reply}>
          <form onSubmit={editReply}>
            <label htmlFor="commentreply" />
            <input
              id="commentreply"
              type="text"
              defaultValue={props.content}
              ref={replyRef}
            />
            <div className={classes.button}>
              <button type="submit" className={classes.send}>
                Update
              </button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};

export default CommentReplies;
