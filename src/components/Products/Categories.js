import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Constants from '../Constants'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    '&:hover': {
      backgroundColor: Constants.GREEN,
    }
  },
  isSelected: {
    color: "#fff",
    backgroundColor: Constants.GREEN,
    '&:hover': {
      backgroundColor: Constants.GREEN,
    }
  }
}));

export default function SimpleList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="categories">
        <ListItem button>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button className={classes.isSelected} >
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
    </div>
  );
}
