import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import Constants from '../Constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    "&:hover": {
      color: "#fff",
      backgroundColor: Constants.GREEN,
    },
    "&:active": {
      color: "#fff",
      backgroundColor: Constants.GREEN,
    }
  },
  listItem: {
    "&:active": {
      backgroundColor: Constants.GREEN,
    }
  }
}));

export default function NestedList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.status);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={props.nameListItem} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          {props.nestedList.map((data, i) => {
            return (
              <ListItem key={i} button
                className={classes.nested}
                component={Link}
                to={data.itemUrl}
                onClick={props.onClickClose}
              >
                <ListItemText primary={data.itemName} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
