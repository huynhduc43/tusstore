import React, { useState, useEffect } from 'react';
//import axios from 'axios';

import { Button, Grid, Paper, Typography } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { makeStyles } from '@material-ui/core';

import { useSnackbar } from 'notistack';

//import { useLocation } from 'react-router';

//My components
import Constants from '../../Constants';
import Comment from './Comment';
import CustomRating from './CustomRating';
import HotProductCarousel from '../../Homepage/HotProductCarousel';

const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%',
        borderRadius: 4,
    },
    button: {
        width: "100%"
    },
    addToCartBtn: Constants.BUTTON_CONTAINED,
    addToWishlist: Constants.BUTTON_OUTLINED,
    removeWishlist: {
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
    }
}));

export default function ProductDetail(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [product, setProduct] = useState({});
    const [isExistInWishlist, setIsExistInWishlist] = useState(false);
    //const location = useLocation();

    //const removeProduct

    const handleClickWishlistBtn = () => {
        if (isExistInWishlist) {
            setIsExistInWishlist(false);
            enqueueSnackbar('Đã xóa khỏi danh sách yêu thích!', {
                variant: 'error'
            });
        } else {
            setIsExistInWishlist(true);
            enqueueSnackbar('Đã thêm vào danh sách yêu thích!', {
                variant: 'success'
            });
        }

    };

    const handleClickAddToCartBtn = () => {
        enqueueSnackbar('Đã thêm vào giỏ hàng!', {
            variant: 'success'
        });
    };

    // const fetchData = async (url) => {
    //     const res = await axios.get(url);
    //     setProduct(res.data);
    // }

    useEffect(() => {
        //fetchData("http://localhost:3001" + location.pathname);
        setProduct(props.product)
        window.scroll(0, 0);

    }, [props.product]);

    return (
        <Grid container item spacing={3} justifyContent="center">

            <Grid item md={6} sm={7} xs={12}>
                <img src={product.primaryImg}
                    alt={product.name}
                    className={classes.image}
                />
            </Grid>

            <Grid item md={6} sm={5} xs={12} >
                <Grid container spacing={3} justifyContent="flex-start">
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" align="left">
                                {product.name}
                            </Typography>
                            <Typography variant="h4" align="center">
                                {product.price}₫
                            </Typography>
                            <Grid container spacing={3} justifyContent="center">
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        startIcon={<AddShoppingCartIcon />}
                                        className={[classes.button, classes.addToCartBtn].join(" ")}
                                        onClick={handleClickAddToCartBtn}
                                    >
                                        Thêm
                                    </Button>
                                </Grid>
                                <Grid item>
                                    {isExistInWishlist ? (
                                        <Button
                                            variant="outlined"
                                            startIcon={<DeleteOutlineIcon />}
                                            className={classes.removeWishlist}
                                            onClick={handleClickWishlistBtn}
                                        > Bỏ yêu thích</Button>
                                    ) :
                                        (<Button
                                            variant="outlined"
                                            startIcon={<FavoriteIcon />}
                                            className={[classes.button, classes.addToWishlist].join(" ")}
                                            onClick={handleClickWishlistBtn}
                                        >Yêu thích</Button>)}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <CustomRating rating={product.rating} sold={product.sold} />
                        </Paper>
                    </Grid>
                </Grid>

            </Grid>

            <Grid item xs={12} >
                <Paper className={classes.paper}>
                    <Typography variant="h6"><b>Thông tin sản phẩm</b></Typography>
                    <Typography variant="body1">
                        {product.description}
                    </Typography>
                </Paper>
            </Grid>

            <Grid item md={12} >
                <Paper className={classes.paper}>
                    <Typography variant="h6"><b>Bình luận</b></Typography>
                    <Comment />
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
    )
}