import React, { useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Popper, Typography, Button, Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Badge } from "@material-ui/core";

import NumberFormat from 'react-number-format';

import axios from 'axios';

//My components
import Constants from '../Constants';
import { CartState } from "../../context/CartContext";
import useAuth from '../../context/AuthContext.js';

const useStyles = makeStyles((theme) => ({
  popover: {
    zIndex: 1,
  },
  paper: {
    // border: `5px solid ${Constants.GREEN}`,
  },
  listItem: {
    maxWidth: 600,
    [theme.breakpoints.down("xs")]: {
      maxWidth: 288,
    }
  },
  image: {
    width: 50,
    height: 50,
  },
  circleBtn: {
    '&:hover': {
      color: Constants.GREEN,
    },
  },
  list: {
    maxHeight: "50vh",
    overflow: 'auto',
  },
  viewCart: {
    ...Constants.BUTTON_CONTAINED,
    margin: 8,
  }
}));

export default function MouseOverPopover() {
  const classes = useStyles();
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [placement, setPlacement] = React.useState();
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPlacement("bottom-end");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'cart-popover' : undefined;

  useEffect(() => {
    setAnchorEl(null);
  }, [location.pathname]);

  useEffect(() => {
    const updateCart = async () => {
      await axios.put(process.env.REACT_APP_REMOTE_URL + '/cart/update', {
        userId: auth.user._id,
        currentCart: cart,
      });
    }

    if (auth.user) {
      updateCart();
    }
    // eslint-disable-next-line
  }, [auth.user]);

  useEffect(() => {
    if (!auth.user) {
      dispatch({
        type: "DELETE_CART",
      });
    }
    // eslint-disable-next-line
  }, [auth.user]);

  return (<>
    <IconButton color="inherit"
      className={classes.circleBtn}
      onMouseEnter={handleClick}

    >
      <Badge badgeContent={cart.length} max={9} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      onMouseLeave={handleClose}
      placement={placement}
      className={classes.popover}
    >
      <Paper className={classes.paper}>
        <List component="nav" aria-label="shopping-cart" className={classes.list}>
          {cart.length === 0 ? (<>
            <ListItem
              key={0}
              className={classes.listItem}
            >
              <Typography variant="h6" color="secondary">Giỏ hàng trống!</Typography>
            </ListItem>
          </>
          ) : (cart.map(product => (
            <ListItem
              key={product._id}
              className={classes.listItem}
            >
              <img src={product.primaryImg}
                className={classes.image}
                alt={product.name}
              />
              <Typography noWrap >&nbsp;{product.name}&nbsp;&nbsp;</Typography>
              <Typography variant="h6" color="secondary">
                <NumberFormat
                  value={product.price}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={'₫'}
                  renderText={(value, props) => <div {...props}>{value}</div>}
                />
              </Typography>
            </ListItem>
          )))}
        </List>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button className={classes.viewCart}
              component={Link}
              to="/cart"
            >Xem giỏ hàng</Button>
          </Grid>
        </Grid>

      </Paper>
    </Popper>
  </>);
}
