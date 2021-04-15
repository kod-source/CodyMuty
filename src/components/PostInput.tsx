import { Avatar, Button, IconButton, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth, db, storage } from "../firebase";
import styles from "./PostInput.module.css";
import firebase from "firebase/app";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const PostInput: React.FC = (props) => {
  const user = useSelector(selectUser);
  const [postImage, setPostImage] = useState<File | null>(null);
  const [postMessage, setPostMessage] = useState("");
  const [date, setDate] = useState(new Date());

  const changeAvatarImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setPostImage(e.target.files![0]);
      e.target.value = "";
    }
  };

  const sendPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + postImage.name;
      const uploadPostImg = storage.ref(`images/${fileName}`).put(postImage);
      uploadPostImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,

        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          await storage
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection("posts").add({
                avatar: user.photoUrl,
                image: url,
                text: postMessage,
                username: user.displayName,
                timestamp: date,
              });
            });
        }
      );
    } else {
      db.collection("posts")
        .add({
          avatar: user.photoUrl,
          image: "",
          text: postMessage,
          username: user.displayName,
          timestamp: date,
        })
        .catch((error) => {
          alert(error.message);
        });
    }
    setPostMessage("");
    setPostImage(null);
  };

  return (
    <>
      <form onSubmit={sendPost}>
        <div className={styles.post_form}>
          <Avatar
            className={styles.post_avatar}
            src={user.photoUrl}
            onClick={async () => {
              await auth.signOut();
            }}
          />
          <input
            className={styles.post_input}
            type="text"
            placeholder="今日は何がありましたか？"
            autoFocus
            value={postMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPostMessage(e.target.value);
            }}
          />
          <IconButton>
            <label>
              <AddAPhotoIcon
                className={
                  postImage ? styles.post_addIconLoaded : styles.post_addIcon
                }
              />
              <input
                className={styles.post_hiddenIcon}
                type="file"
                onChange={changeAvatarImage}
              />
            </label>
          </IconButton>
        </div>
        <Button
          type="submit"
          disabled={!postMessage}
          className={
            postMessage ? styles.post_sendBtn : styles.post_sendDisableBtn
          }
        >
          投稿
        </Button>
      </form>
    </>
  );
};

export default PostInput;
