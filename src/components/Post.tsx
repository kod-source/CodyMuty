import { Avatar, makeStyles, Modal, styled } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import styles from "./Post.module.css";
import MessageIcon from "@material-ui/icons/Message";
import SendIcon from "@material-ui/icons/Send";
import { db } from "../firebase";
import firebase from "firebase/app";

interface POSTS {
  postId: string;
  avatar: string;
  image: string;
  text: string;
  timestamp: any;
  username: string;
}

interface COMMENTS {
  id: string;
  avatar: string;
  text: string;
  timestamp: any;
  username: string;
}

interface MODAL {
  top: string;
  left: string;
  transform: string;
}

const getModalStyle = (x: number, y: number): MODAL => {
  const top = x;
  const left = y;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `traslate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  modal: {
    outline: "none",
    position: "absolute",
    width: 400,
    borderRadius: 10,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(7),
  },
}));

const Post: React.FC<POSTS> = (props) => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [opendSend, setOpenSend] = useState(false);
  const [openEdit, setOpenEdit] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<COMMENTS[]>([]);
  const date = new Date();

  useEffect(() => {
    getDate();
  }, []);

  const getDate = () => {
    db.collection("posts")
      .doc(props.postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            image: doc.data().image,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
          }))
        )
      );
  };

  const newComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("posts")
      .doc(props.postId)
      .collection("comments")
      .add({
        avatar: user.photoUrl,
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => {
        alert(error.message);
      });
    setComment("");
  };

  const postDelete = () => {
      alert("issyo");
  };

  const postEdit = () => {
    alert("編集")
  }

  return (
    <div className={styles.post}>
      <div className={styles.post_avatar}>
        <Avatar src={props.avatar} />
      </div>
      <div className={styles.post_body}>
        <div>
          <h3 className={styles.post_header}>
            <span className={styles.post_headerUser}>@{props.username}</span>
            <span className={styles.post_headerTime}>
              {new Date(props.timestamp?.toDate()).toLocaleString()}
            </span>
            {props.username == user.displayName && (
              <span
                className={styles.post_span}
                onClick={() => setOpenEdit(!openEdit)}
              >
                ︙
              </span>
            )}
            <div
              className={
                openEdit ? styles.post_modal : styles.post_modalDisabled
              }
            >
              <p className={styles.post_edit} onClick={postEdit} >編集</p>
              <p onClick={postDelete}>削除</p>
            </div>
          </h3>
          <p className={styles.post_tweet}>{props.text}</p>
        </div>
        <div className={styles.post_image}>
          <img src={props.image} />
        </div>
        <MessageIcon
          className={styles.post_commentIcon}
          onClick={() => setOpenSend(!opendSend)}
        />
        {opendSend && (
          <>
            {comments.map((comment) => (
              <div className={styles.post_comment}>
                <Avatar src={comment.avatar} className={classes.small} />
                <span className={styles.post_commentUser}>
                  @{comment.username}
                </span>
                <span className={styles.post_commentText}>{comment.text}</span>
                <span className={styles.post_headerTime}>
                  {new Date(comment.timestamp.toDate()).toLocaleString()}
                </span>
              </div>
            ))}
            <form onSubmit={newComment}>
              <div className={styles.post_form}>
                <input
                  className={styles.post_input}
                  type="text"
                  placeholder="コメントを追加"
                  value={comment}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setComment(e.target.value)
                  }
                />
                <button
                  disabled={!comment}
                  type="submit"
                  className={
                    comment ? styles.post_button : styles.post_buttonDisable
                  }
                >
                  <SendIcon />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
