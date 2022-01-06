import React, { useState, useContext, useRef } from "react";
import classes from "./Comment.module.css";
import Card from "../UI/Card";
import CommentReplies from "./CommentReplies";
import CommentContext from "../../store/comment-context";
import Backdrop from "../UI/Backdrop";

const Comment = (props) => {
  const [voteScore, setVoteScore] = useState(props.votes);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCommentModalOpen, setEditingCommentModalOpen] = useState(false);
  const commentCtx = useContext(CommentContext);
  const editRef = useRef();

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

  const removeComment = () => {
    commentCtx.deleteComment(props.id);
    setModalOpen(false);
  };

  const editCommentToggleHandler = () => {
    setEditingCommentModalOpen(true);
  };

  const editComment = (e) => {
    e.preventDefault();

    const editedComment = editRef.current.value;
    commentCtx.editComment(editedComment, props.id);
    setEditingCommentModalOpen(false);
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
              <button
                onClick={editCommentToggleHandler}
                className={classes.edit}
              >
                Edit
              </button>
            </div>
          ) : (
            <button className={classes.reply}>Reply</button>
          )}
        </div>

        {editingCommentModalOpen && (
          <div className={classes.edit_comment}>
            <form onSubmit={editComment}>
              <label htmlFor="commentedit" />
              <input
                id="commentedit"
                type="text"
                defaultValue={props.content}
                ref={editRef}
              />
              <div className={classes.button}>
                <button type="submit" className={classes.send}>
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </Card>

      {modalOpen && (
        <>
          <Backdrop />
          <Card className={classes.modal}>
            <h1>Delete comment</h1>
            <p>
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone.
            </p>
            <div className={classes.buttons}>
              <button onClick={closeModal} className={classes.no}>
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
