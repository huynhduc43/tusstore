import React from "react";
import { Divider, Grid, InputBase, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { IconButton } from "@material-ui/core";

//My components
import Constants from "../../Constants";
import { Button } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HotProductCarousel from "../../Homepage/HotProduct/HotProductCarousel";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
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
}));

export default function ProductDetailSkeleton() {
  const classes = useStyles();

  return (<>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Skeleton animation="wave" width="50%"/>
        </Paper>
      </Grid>
      <Grid item sm={5} xs={12}>
        <Paper style={{}}>
          <Skeleton variant="rect" animation="wave" height={400} />
        </Paper>
      </Grid>
      <Grid item sm={7} xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h5">
            <Skeleton animation="wave" />
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item>
                  <Rating name="read-only" value={0} readOnly />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">Đã bán </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography variant="h4" color="secondary">
            <Skeleton animation="wave" width={100} />
          </Typography>
          <Divider />
          <span style={{ fontSize: 18 }}>Số lượng&nbsp;</span>
          <IconButton><RemoveCircleIcon /></IconButton>
          <InputBase
            className={classes.quantity}
            value={1}
            inputProps={{ 'aria-label': 'quantity' }}
          />
          <IconButton ><AddCircleIcon /></IconButton>
          <Grid container spacing={3}>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                className={[classes.button, classes.addToCartBtn].join(" ")}
              >
                Thêm
              </Button>

            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<FavoriteIcon />}
                className={[classes.button, classes.addToWishlist].join(" ")}
              >Yêu thích</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} >
        <Paper className={classes.paper}>
          <Typography variant="h6"><b>Thông tin sản phẩm</b></Typography>
          <Typography variant="body1">
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} >
        <Paper className={classes.paper}>
          <Typography variant="h6" style={{ paddingBottom: 5 }}><b>Bình luận</b></Typography>
          <Typography variant="body1">
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography
            variant="h6"
            align="center"
            className={classes.rcmProductTitle}
          >
            CÓ THỂ BẠN SẼ THÍCH
          </Typography>
        </Paper>
      </Grid>
      <Grid container item md={12}>
        <Grid item xs={12}>
          <HotProductCarousel />
        </Grid>
      </Grid>
    </Grid>
  </>)
}
