import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { Avatar, Button, makeStyles, TextField } from "@material-ui/core";
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
    "&$disabled": {
      color: "white",
    },
  },
  label: {
    color: "skyblue",
    "&$disabled": {
      color: "white",
    },
  },
  underline: {
    borderBottom: `4px solid skyblue`,
    "&$disabled": {
      borderBottom: `1px solid white`,
    },
    "&:after": {
      borderBottom: `2px solid skyblue`,
    },
  },
  focusedLabel: {},
  disabled: {},
}));

const Profile: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [selfIntroduction, setSelfIntroduction] = useState("");
  const [openProfileEdit, setOpenProfileEdit] = useState(false);

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
    setOpenProfileEdit(false);
  };

  return (
    <section className={styles.profile}>
      <div className={styles.profile_container}>
        <h2 className={styles.profile_title}>マイページ</h2>
        <hr className={styles.profile_underbar} />
        <Avatar src={user.photoUrl} className={classes.small} />
        <hr className={styles.profile_underbar} />
      </div>
      <div className={styles.profile_section}>
        <TextField
          InputLabelProps={{
            classes: {
              root: classes.label,
              disabled: classes.disabled,
              focused: classes.focusedLabel,
            },
          }}
          InputProps={{
            classes: {
              root: classes.underline,
              disabled: classes.disabled,
              focused: classes.focusedLabel,
            },
            className: classes.multilineColor,
          }}
          className={classes.container}
          disabled
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
              disabled: classes.disabled,
              focused: classes.focusedLabel,
            },
          }}
          InputProps={{
            classes: {
              root: classes.underline,
              disabled: classes.disabled,
              focused: classes.focusedLabel,
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
          autoFocus={false}
          rows={8}
          disabled={openProfileEdit === false}
          value={selfIntroduction}
          type={"text"}
        />
      </div>
      <div className="module-spacer--medium" />
      <div className={styles.profile_btn}>
        <button
            className={
              openProfileEdit ? styles.profile_btnSave : styles.profile_btnEdit
            }
          onClick={() => {
            openProfileEdit ? addProfileDate() : setOpenProfileEdit(true);
          }}
          disabled={user.displayName === "guest" && openProfileEdit === true}
        >
          {openProfileEdit ? "保存" : "プロフィールを編集"}
        </button>
      </div>
    </section>
  );
};

export default Profile;
