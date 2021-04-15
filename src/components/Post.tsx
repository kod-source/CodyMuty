import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import styles from "./Post.module.css";

const Post: React.FC = () => {
  const user = useSelector(selectUser);
  return (
    <div>
      <div className={styles.post_avatar}>
        <Avatar src={user.photoUrl} />
      </div>
    </div>
  );
};

export default Post;
