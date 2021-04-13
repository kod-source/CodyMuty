import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Auth.module.css";
import { auth, provider, storage } from "../firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SendIcon from "@material-ui/icons/Send";
import CameraIcon from "@material-ui/icons/Camera";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { error } from "node:console";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const signInEmail = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert("メールアドレスまたはパスワードが正しくありません");
    }
  };

  const signUpEmail = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1 className={styles.login_title}>CodyMuty</h1>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? "ログイン" : "新規アカウント登録"}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={<EmailIcon />}
            onClick={(e) => {
              e.preventDefault();
              isLogin ? signInEmail() : signUpEmail();
            }}
          >
            {isLogin ? "ログイン" : "新規アカウント登録"}
          </Button>
          <Grid className={styles.login_bar}>または</Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={<CameraIcon />}
            onClick={signInGoogle}
          >
            Googleアカウントでログイン
          </Button>
          <Grid>
            {isLogin ? (
              <p className={styles.login_toggle}>
                アカウントはお持ちでないですか？
                <span
                  className={styles.login_toggleMode}
                  onClick={() => setIsLogin(false)}
                >
                  登録する
                </span>
              </p>
            ) : (
              <p
                className={styles.login_right}
                onClick={() => setIsLogin(true)}
              >
                ログインに戻る
              </p>
            )}
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Auth;
