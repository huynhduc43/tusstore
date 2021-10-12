import React from 'react';

import { Link, useLocation, useHistory } from 'react-router-dom';

import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useSnackbar } from 'notistack';

//My components
import Constants from '../Constants';
import useAuth from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  popover: {

  },
  paper: {

  },
  accountBtn: {
    margin: theme.spacing(1),
    maxWidth: 200,
    color: "#fff",
    '&:hover': {
      backgroundColor: "#ABB2B9",
    }
  },
  listItem: {
    "&:hover": {
      color: "#fff",
      backgroundColor: Constants.GREEN,
    },
    "&:active": {
      color: "#fff",
      backgroundColor: Constants.GREEN,
    }
  }
}));

export default function MouseOverPopover({ email }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();
  let location = useLocation();
  let history = useHistory();
  const auth = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'account-popover' : undefined;

  return (
    <div>
      <Button
        className={classes.accountBtn}
        onClick={handleClick}
      >
        <Typography noWrap>{email + email}</Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className={classes.popover}
      >
        <Paper className={classes.paper}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem
              key={1}
              button
              component={Link} to="/account/profile"
              onClick={handleClose}
              className={classes.listItem}
            >
              <ListItemText primary="Thông tin tài khoản" />
            </ListItem>
            <ListItem
              key={2}
              button
              component={Link} to="/account/manage-orders"
              onClick={handleClose}
              className={classes.listItem}
            >
              <ListItemText primary="Đơn hàng" />
            </ListItem>
            <ListItem
              key={3}
              button
              onClick={() => handleSignOut(handleClose, location.pathname.split("/"), history, auth, enqueueSnackbar)}
              className={classes.listItem}
            >
              <ListItemText primary="Đăng xuất" />
            </ListItem>
          </List>
        </Paper>
      </Popover>
    </div>
  );
}

const handleSignOut = (handleClose, path, history, auth, enqueueSnackbar) => {
  handleClose();

  if (path.length >= 2) {
    if (path[1] === "account") history.replace("");
    if (path[1] === "checkout") history.replace("/cart");
  }

  auth.signout();

  enqueueSnackbar('Đã đăng xuất tài khoản!', {
    variant: 'error'
  });
}
