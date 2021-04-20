import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import styles from "./Feed.module.css";
import { auth, db } from "../firebase";
import PostInput from "./PostInput";
import Post from "./Post";
import Header from "./Header/Header";
import Profile from "./Profile/Profile";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
      avatar: "",
      image: "",
      text: "",
      timestamp: null,
      username: "",
      likeCount: 0,
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
            likeCount: doc.data().likeCount,
          }))
        )
      );
  };

  return (
    <BrowserRouter>
      <div className={styles.feed}>
        <Header />
        <nav>
         
          <Link to="/Profile/Profile">プロフィール</Link>
        </nav>
        <Switch>
          <Route path="/" exact>
            <div className={styles.feedMain}>
              <PostInput />
              {posts[0]?.id && (
                <>
                  {posts.map((post) => (
                    <Post
                      key={post.id}
                      postId={post.id}
                      avatar={post.avatar}
                      image={post.image}
                      text={post.text}
                      timestamp={post.timestamp}
                      username={post.username}
                      likeCount={post.likeCount}
                    />
                  ))}
                </>
              )}
            </div>
          </Route>
          <Route path="/Profile/Profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Feed;
