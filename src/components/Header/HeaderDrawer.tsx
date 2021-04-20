import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

interface PROPS {
  open: boolean;
  onClose: any;
}

const useStyles = makeStyles({
  list: {
    width: 256,
  },
  fullList: {
    width: 200,
    paddingTop: 20,
  },
  link: {
    color: "black",
    textDecoration: "none",
    fontSize: 16,
    display: "flex",
  },
  backColor: {
    backgroundColor: "#e1e1e1",
  },
});

const HeaderDrawer: React.FC<PROPS> = (props) => {
  const classes = useStyles();

  return (
    <nav className={classes.list}>
      <Drawer
        anchor="left"
        variant="temporary"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        ModalProps={{ keepMounted: true }}
      >
        <List className={classes.fullList}>
          <ListItem button key="home" onClick={(e) => props.onClose(e)}>
            <Link to="/" className={classes.link}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"ホーム"} />
            </Link>
          </ListItem>
          <ListItem button key="profile" onClick={(e) => props.onClose(e)}>
            <Link to="/Profile/Profile" className={classes.link}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="プロフィール" />
            </Link>
          </ListItem>
          <ListItem
            button
            key="logout"
            onClick={async () => await auth.signOut()}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"ログアウト"} />
          </ListItem>
        </List>
      </Drawer>
    </nav>
  );
};

export default HeaderDrawer;
