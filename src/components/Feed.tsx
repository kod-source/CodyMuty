import React, { useEffect, useState } from "react";
import styles from "./Feed.module.css";
import { auth, db } from "../firebase";
import PostInput from "./PostInput";
import Post from "./Post";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
      avatar: "",
      image: "",
      text: "",
      timestamp: null,
      username: "",
    },
  ]);

  useEffect(() => {
    getDate();
  }, []);

  const getDate = () => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
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

  return (
    <div className={styles.feed}>
      <button
        className={styles.feed_btn}
        onClick={async () => await auth.signOut()}
      >
        ログアウト
      </button>
      <PostInput />
      {posts.map((post) => (
        <h1>{post.text}</h1>
      ))}
    </div>
  );
};

export default Feed;
