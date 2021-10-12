import React from 'react';
import PropTypes from 'prop-types';

import {
  Link,
} from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { Grid, Paper, Button, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarIcon from '@material-ui/icons/Star';

import NumberFormat from 'react-number-format';

//My component
import Constants from '../Constants.js';
import { CartState } from "../../context/CartContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  addToCartBtn: Constants.BUTTON_CONTAINED,
  img: {
    width: '100%',
    height: 220,
    [theme.breakpoints.down("md")]: {
      height: 160,
    },
    position: "relative",
    top: -44,
  },
  productName: {
    minHeight: 65,
    [theme.breakpoints.down(505)]: {
      height: 80,
    },
    position: "relative",
    top: -44,
  },
  productPrice: {
    position: "relative",
    top: -44,
    height: 0,
  },
  view: {
    position: "relative",
    left: 0,
    zIndex: 1,
    height: 36,
    borderRadius: 0,
    opacity: 0.7,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  button: {
    "& .Mui-disabled": {
      backgroundColor: "#8CE0CE",
    },
  },
}));

export default function Product({name, price, primaryImg, link, quantity, rating, view, }) {
  const classes = useStyles();
  const {
    dispatch,
  } = CartState();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickAddToCartBtn = async () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        name: name, 
        price: price, 
        primaryImg: primaryImg, 
        link: link, 
        quantity: quantity, 
        rating: rating, 
        view: view,
      },
    });

    enqueueSnackbar('Đã thêm vào giỏ hàng!', {
      variant: 'success'
    });
  };

  return (
    <Grid item sm={4} xs={6} className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={1} justifyContent="space-evenly">
          <Grid item xs={12}>
            <Paper
              className={classes.view} style={{
                visibility: "show",
              }}
            >
              <span >
                <IconButton style={{ padding: 6, color: "#FFCC00" }} disabled>
                  <StarIcon />
                </IconButton>
                <IconButton style={{ padding: 6, color: "#000" }} disabled>
                  <Typography variant="h6">{rating}</Typography>
                </IconButton>
              </span>
              <span >
                <IconButton style={{ padding: 6, color: "#000" }} disabled>
                  <VisibilityIcon />
                </IconButton>
                <IconButton style={{ padding: 6, color: "#000" }} disabled>
                  <Typography variant="h6">{view}</Typography>
                </IconButton>
              </span>
            </Paper>
          </Grid>

          <Grid item xs={12} >
            <img src={primaryImg}
              alt={name}
              className={classes.img}
            />
          </Grid>
          <Grid item xs={12} className={classes.productName}>
            <b>{name}</b>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="secondary" className={classes.productPrice}>
              <NumberFormat
                value={price}
                displayType={'text'}
                thousandSeparator={true}
                suffix={'₫'}
                renderText={(value, props) => <div {...props}>{value}</div>}
              />
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Button
              variant="contained"
              fullWidth
              className={classes.viewBtn}
              startIcon={<VisibilityIcon />}
              component={Link}
              to={`${link}`}
            >
              Xem
            </Button>
          </Grid>
          <Grid item sm={6} xs={12} className={classes.button}>
            {quantity === 0 ?
              <Button
                variant="contained"
                fullWidth
                className={classes.addToCartBtn}
                startIcon={<AddShoppingCartIcon />}
                style={{ width: '100%' }}
                disabled
              >
                Hết
              </Button>
              : <Button
                variant="contained"
                fullWidth
                className={classes.addToCartBtn}
                startIcon={<AddShoppingCartIcon />}
                style={{ width: '100%' }}
                onClick={handleClickAddToCartBtn}
              >
                Thêm
              </Button>}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

Product.propTypes = {
  primaryImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  view: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
}