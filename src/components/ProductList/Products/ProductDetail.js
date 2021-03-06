import React, { useEffect, useState } from "react";

import { Divider, Grid, InputBase, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { IconButton } from "@material-ui/core";
import { useSnackbar } from 'notistack';

import {
  useLocation,
} from "react-router-dom";

import axios from 'axios';
import NumberFormat from 'react-number-format';

//My components
import Constants from "../../Constants";
import BreadcrumbsCustom from '../../BreadcrumbsCustom'
import { Button } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Comment from '../../Comment/Comment';
import HotProductCarousel from "../../Homepage/HotProduct/HotProductCarousel";
import { CartState } from "../../../context/CartContext";
import ProductDetailSkeleton from './ProductDetailSkeleton';

const useStyles = makeStyles((theme) => ({
  sticky: {
    position: "sticky",
    top: 24,
  },
  image: {
    width: '100%',
    borderRadius: 4,
  },
  button: {
    width: "100%"
  },
  addToCartBtn: {
    ...Constants.BUTTON_CONTAINED,
    [theme.breakpoints.up(700)]: {
      minWidth: 150,
    }
  },
  addToWishlist: {
    ...Constants.BUTTON_OUTLINED,
    [theme.breakpoints.up(700)]: {
      minWidth: 150,
    }
  },
  removeWishlist: {
    [theme.breakpoints.up(700)]: {
      minWidth: 150,
    },
    color: "#E74C3C",
    '&:hover': {
      backgroundColor: "#E74C3C",
      color: "#fff",
    },
    '&:active': {
      backgroundColor: "#C0392B",
    }
  },
  paper: {
    padding: theme.spacing(2),
  },
  rcmProductTitle: {
    color: Constants.GREEN,
  },
  quantity: {
    width: 30,
    '& .MuiInputBase-input': {
      textAlign: "center",
    }
  },
  sold: {
    position: 'absolute',
    width: "60%",
    height: '80%',
    top: "10%",
    left: "20%",
  },
  opacity: {
    opacity: 0.5,
    width: '100%',
    borderRadius: 4,
  }
}));

export default function ProductDetail() {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isExistInWishlist, setIsExistInWishlist] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const classes = useStyles();
  const {
    dispatch
  } = CartState();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickWishlistBtn = () => {
    if (isExistInWishlist) {
      setIsExistInWishlist(false);
      enqueueSnackbar('???? x??a kh???i danh s??ch y??u th??ch!', {
        variant: 'error'
      });
    } else {
      setIsExistInWishlist(true);
      enqueueSnackbar('???? th??m v??o danh s??ch y??u th??ch!', {
        variant: 'success'
      });
    }

  };

  const handleClickAddToCartBtn = () => {
    dispatch({
      type: "ADD_TO_CART_WITH_QTY",
      payload: {
        product: product,
        quantity: quantity,
      },
    });

    enqueueSnackbar('???? th??m v??o gi??? h??ng!', {
      variant: 'success'
    });
  };

  const handleClickIncreaseBtn = () => {
    setQuantity(prevState => parseInt(prevState) + 1);
  }

  const handleClickDecreaseBtn = () => {
    setQuantity(prevState => {
      if (parseInt(prevState) !== 1) {
        return parseInt(prevState) - 1;
      } else return 1;
    });
  }

  const handleChangeQuantity = (e) => {
    if (e.target.value === '' || isNaN(e.target.value)) {
      setQuantity(1);
    } else {
      setQuantity(parseInt(e.target.value) <= 0 ? 1 : parseInt(e.target.value));
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_REMOTE_URL + location.pathname);
        setProduct(res.data);
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
        setError(error);
        setIsLoaded(true);
      }

    }

    fetchData();
    window.scroll(0, 0);
  }, [location.pathname]);
  if (error) {
    return <Typography variant="h4" color="error" align="center">Error: {error.message}</Typography>;
  } else if (!isLoaded) {
    return (
      <ProductDetailSkeleton />
    );
  } else {
  return (<>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <BreadcrumbsCustom
            path={location.pathname}
            breadCrumb={product.name}
            productUrl={product._id}
          />
        </Paper>
      </Grid>
      <Grid item sm={5} xs={12}>
        <Paper style={{
          position: 'relative',
          top: 0,
          left: 0,
        }}>
          <img src={product.primaryImg}
            alt={product.name}
            className={product.quantity === 0 ? classes.opacity : classes.image}
          />
          {product.quantity === 0 &&
            <img src="/out-of-stock.png"
              alt={product.name}
              className={classes.sold}
            />
          }
        </Paper>

      </Grid>
      <Grid item sm={7} xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h5">
            {product.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item>
                  <Rating name="read-only" value={product.rating ? product.rating : 0} readOnly />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">???? b??n {product.sold}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography variant="h4" color="secondary">
            <NumberFormat
              value={product.price}
              displayType={'text'}
              thousandSeparator={true}
              suffix={'???'}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </Typography>
          <Divider />
          <span style={{ fontSize: 18 }}>S??? l?????ng&nbsp;</span>
          <IconButton
            onClick={handleClickDecreaseBtn}
          ><RemoveCircleIcon /></IconButton>
          <InputBase
            className={classes.quantity}
            value={quantity}
            inputProps={{ 'aria-label': 'quantity' }}
            onChange={handleChangeQuantity}
          />
          <IconButton
            onClick={handleClickIncreaseBtn}
          ><AddCircleIcon /></IconButton>
          <Grid container spacing={3}>
            <Grid item>
              {product.quantity === 0 ?
                <Button
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  className={[classes.button, classes.addToCartBtn].join(" ")}
                  onClick={handleClickAddToCartBtn}
                  disabled
                >
                  Th??m
                </Button>

                : <Button
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  className={[classes.button, classes.addToCartBtn].join(" ")}
                  onClick={handleClickAddToCartBtn}
                >
                  Th??m
                </Button>
              }
            </Grid>
            <Grid item>
              {isExistInWishlist ? (
                <Button
                  variant="outlined"
                  startIcon={<DeleteOutlineIcon />}
                  className={classes.removeWishlist}
                  onClick={handleClickWishlistBtn}
                > B??? y??u th??ch</Button>
              ) :
                (<Button
                  variant="outlined"
                  startIcon={<FavoriteIcon />}
                  className={[classes.button, classes.addToWishlist].join(" ")}
                  onClick={handleClickWishlistBtn}
                >Y??u th??ch</Button>)}
            </Grid>
          </Grid>

        </Paper>
      </Grid>
      <Grid item xs={12} >
        <Paper className={classes.paper}>
          <Typography variant="h6"><b>Th??ng tin s???n ph???m</b></Typography>
          <Typography variant="body1">
            {product.description}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} >
        <Paper className={classes.paper}>
          <Typography variant="h6" style={{ paddingBottom: 5 }}><b>B??nh lu???n</b></Typography>
          <Comment
            productId={product._id}
          //pagination={cmtPagination}
          //comments={comments}
          //onChangeCmtPage={handleChangeCmtPage}
          //onPostComment={setPostComment}
          //onSetCmtPagination={setC}
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography
            variant="h6"
            align="center"
            className={classes.rcmProductTitle}
          >
            C?? TH??? B???N S??? TH??CH
          </Typography>
        </Paper>
      </Grid>
      <Grid container item md={12}>
        <Grid item xs={12}>
          <HotProductCarousel />
        </Grid>
      </Grid>
    </Grid>
  </>)}
}
