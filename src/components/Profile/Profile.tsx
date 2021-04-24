import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";

interface Date {
  text: string;
  avatar: string;
  id: string;
  username: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 30,
    marginBottom: 30,
  },
  small: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    marginTop: 60,
    margin: "auto",
  },
  multilineColor: {
    color: "white",
  },
  label: {
    color: "white",
  },
  focusedLabel: {},
  underline: {
    borderBottom: `1px solid white`,
  },
  "&:after": {
    borderBottom: `4px solid blue`,
  },
}));

const Profile: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [selfIntroduction, setSelfIntroduction] = useState("");

  const profileCollection = db.collection("profile");

  const id = user.uid;

  useEffect(() => {
    profileCollection
      .doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const date: any = snapshot.data();
          setSelfIntroduction(date.text);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [id]);

  const addProfileDate = async () => {
    const date: Date = {
      text: selfIntroduction,
      username: user.displayName,
      avatar: user.photoUrl,
      id: id,
    };
    profileCollection
      .doc(id)
      .set(date, { merge: true })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <section className={styles.profile}>
      <div className={styles.profile_container}>
        <h2 className={styles.profile_title}>マイページ</h2>
        <hr className={styles.profile_underbar} />
        <Avatar src={user.photoUrl} className={classes.small} />
        {/* <p className={styles.profile_font}>プロフィール写真の変更</p> */}
        <hr className={styles.profile_underbar} />
      </div>
      <div className={styles.profile_section}>
        <TextField
          InputLabelProps={{
            classes: {
              root: classes.label,
              focused: classes.focusedLabel,
            },
          }}
          InputProps={{
            classes: {
              root: classes.underline,
            },
            className: classes.multilineColor,
          }}
          className={classes.container}
          fullWidth={true}
          label={"ユーザー名"}
          multiline={false}
          required={true}
          value={user.displayName}
          type={"text"}
        />
        <TextField
          InputLabelProps={{
            classes: {
              root: classes.label,
              focused: classes.focusedLabel,
            },
          }}
          InputProps={{
            classes: {
              root: classes.underline,
            },
            className: classes.multilineColor,
          }}
          fullWidth={true}
          label={"自己紹介"}
          multiline={true}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSelfIntroduction(e.target.value);
          }}
          rows={8}
          value={selfIntroduction}
          type={"text"}
        />
      </div>
      <div className="module-spacer--medium" />
      <div>
        <Button onClick={addProfileDate}>編集する</Button>
      </div>
    </section>
  );
};

export default Profile;
