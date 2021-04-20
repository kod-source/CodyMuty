import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { IconButton } from "@material-ui/core";
import { ExitToApp, Search } from "@material-ui/icons";

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
        <div>
          <div className={classes.fullList}>
            <IconButton>
              <Search />
            </IconButton>
          </div>
        </div>
      </Drawer>
      <List>
        <ListItem button key="logout">
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={"ログアウト"} />
        </ListItem>
      </List>
    </nav>
  );
};

export default HeaderDrawer;
