import React, { useCallback, useState } from "react";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { Avatar, makeStyles, styled, TextField } from "@material-ui/core";
import { selectUser } from "../../features/userSlice";

// const useStyles = makeStyles((theme) => ({
//     container: {
//         marginTop: 30,
//         marginBottom: 60,
//     },
//   small: {
//     width: theme.spacing(25),
//     height: theme.spacing(25),
//     marginTop: 60,
//     margin: "auto",
//   },
//   multilineColor: {
//     color: "white",
//   },
//   label: {
//     color: "white",
//   },
//   focusedLabel: {},
//   underline: {
//       borderBottom: `1px solid white`,
//   },
//   "&:after": {
//       borderBottom: `4px solid blue`,
//     },
// }));

const Profile = () => {
//   const classes = useStyles();
//   const user = useSelector(selectUser);
//   const [username, setUsername] = useState("");
//   const [selfIntroduction, setSelfIntroduction] = useState("");

  return (
    // <section className={styles.profile}>
    //   <div className={styles.profile_container}>
    //     <h2 className={styles.profile_title}>マイページ</h2>
    //     <hr className={styles.profile_underbar} />
    //     <Avatar src={user.photoUrl} className={classes.small} />
    //     {/* <p className={styles.profile_font}>プロフィール写真の変更</p> */}
    //     <hr className={styles.profile_underbar} />
    //   </div>
    //   <div className={styles.profile_section}>
    //     <TextField
    //       InputLabelProps={{
    //         classes: {
    //           root: classes.label,
    //           focused: classes.focusedLabel,
    //         },
    //       }}
    //       InputProps={{
    //         classes: {
    //           root: classes.underline,
    //         },
    //         className: classes.multilineColor,
    //       }}
    //       className={classes.container}
    //       fullWidth={true}
    //       label={"ユーザー名"}
    //       multiline={false}
    //       required={true}
    //       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    //         setUsername(e.target.value);
    //       }}
    //       rows={1}
    //       value={username}
    //       type={"text"}
    //     />
    //     <TextField
    //       InputLabelProps={{
    //         classes: {
    //           root: classes.label,
    //           focused: classes.focusedLabel,
    //         },
    //       }}
    //       InputProps={{
    //         classes: {
    //           root: classes.underline,
    //         },
    //         className: classes.multilineColor,
    //       }}
    //       fullWidth={true}
    //       label={"自己紹介"}
    //       multiline={true}
    //       required={true}
    //       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    //         setSelfIntroduction(e.target.value);
    //       }}
    //       rows={5}
    //       value={selfIntroduction}
    //       type={"text"}
    //     />
    //   </div>
    // </section>
    <div>
        <h1 className={styles.profile_title}>このページは現在作成中です。</h1>
    </div>
  );
};

export default Profile;
