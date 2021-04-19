import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Auth.module.css";
import { auth, provider, storage } from "../firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SendIcon from "@material-ui/icons/Send";
import CameraIcon from "@material-ui/icons/Camera";
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from "@material-ui/icons/Email";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { updateUserProfile } from "../features/userSlice";
import { IconButton, Modal } from "@material-ui/core";

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
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid",
    borderColor: "gray",
    padding: "30px 40px",
    backgroundColor: "white",
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
    margin: theme.spacing(1, 0, 2),
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

const Auth: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const guestEmail = "guest@example.com";
  const guestPassword = "password4521"

  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
  };

  const changeAvatarImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
  };

  const guestSignIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(guestEmail, guestPassword);
    } catch (error) {
      alert(error.message);
    }
  }

  const signInEmail = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert("メールアドレスまたはパスワードが正しくありません");
    }
  };

  const signUpEmail = async () => {
    try {
      const authUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      let url = "";
      if (avatarImage) {
        const S =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const randomChar = Array.from(
          crypto.getRandomValues(new Uint32Array(N))
        )
          .map((n) => [n % S.length])
          .join("");
        const fileName = randomChar + "_" + avatarImage.name;

        await storage.ref(`avatarts/${fileName}`).put(avatarImage);
        url = await storage.ref("avatarts").child(fileName).getDownloadURL();
      }
      await authUser.user?.updateProfile({
        displayName: username,
        photoURL: url,
      });
      dispatch(
        updateUserProfile({
          displayName: username,
          photoUrl: url,
        })
      );
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
      <div>
        <div className={classes.paper}>
          <h1 className={styles.login_title}>CodyMuty</h1>
          <p className={styles.login_p}>
            登録して大学生同士で有益な情報を共有しよう！
            <span
              className={styles.login_question}
              onClick={() => setShowModal(true)}
            >
              ?
            </span>
          </p>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? "ログイン" : "新規アカウント登録"}
          </Typography>
          <form className={classes.form} noValidate>
            {!isLogin && (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="ユーザーネーム"
                  name="username"
                  autoComplete="usename"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                  }}
                />
                <Box textAlign="center">
                  <IconButton>
                    <label>
                      <AccountCircleIcon
                        fontSize="large"
                        className={
                          avatarImage
                            ? styles.login_addIconLoaded
                            : styles.login_addIcon
                        }
                      />
                      <input
                        className={styles.login_hiddenIcon}
                        type="file"
                        onChange={changeAvatarImage}
                      />
                    </label>
                  </IconButton>
                </Box>
              </>
            )}

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
            {!isLogin && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="checkpassword"
                label="確認のためもう一度、入力してください"
                type="password"
                id="ckeckpassword"
                autoComplete="current-password"
                value={checkPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setCheckPassword(e.target.value);
                }}
              />
            )}
            <Button
              disabled={
                isLogin
                  ? !email || password.length < 6
                  : !username ||
                    !email ||
                    password.length < 6 ||
                    !avatarImage ||
                    password !== checkPassword
              }
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
            {isLogin && (
              <>
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
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  startIcon={<PersonIcon />}
                  onClick={guestSignIn}
                >
                  ゲストでログイン
                </Button>
                <Grid className={styles.login_reset}>
                  <span onClick={() => setOpenModal(true)}>
                    パスワードを忘れた場合
                  </span>
                </Grid>
              </>
            )}
          </form>
        </div>
        <Grid>
          <div className={styles.login_container}>
            <p className={styles.login_toggle}>
              アカウントはお持ちでないですか？
              <span
                className={styles.login_toggleMode}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "登録する" : "ログインする"}
              </span>
            </p>
          </div>
        </Grid>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div style={getModalStyle(9, 36)} className={classes.modal}>
            <p className={styles.login_text}>
              CodyMutyとは、
              将来エンジニアを目指している現役大学生向けのコミュニティです。最新のITニュースの情報を共有をしたり、わからないことはお互いに助け合う場としてみんなで成長できる環境にしたいと考えています。特に地方に住んでいる方でなかなかインターンシップに受からない人（私もこの1人です笑）のために情報交換などでき、お互いに成長できる場所になれたらいいかなと思います。
            </p>
            <p className={styles.login_text}>
              もちろん現役エンジニアの方やインターン生で現場で働いている方も登録しても大丈夫です。（登録して欲しいです笑）普段の日常や学校でこんなことがあったなどどんな内容でも投稿して大丈夫です。登録しているみんなが友達みたいな関係になりたいと考えております。
            </p>
          </div>
        </Modal>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div style={getModalStyle(60, 36)} className={classes.modal}>
            <div className={styles.login_modal}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                type="email"
                name="email"
                label="パスワードリセット"
                value={resetEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setResetEmail(e.target.value);
                }}
              />
              <IconButton onClick={sendResetEmail}>
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </Modal>
      </div>
    </Container>
  );
};

export default Auth;
