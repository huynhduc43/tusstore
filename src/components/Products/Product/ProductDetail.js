import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

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

//import axios from 'axios';

//My components
import Constants from "../../Constants";
import BreadcrumbsCustom from '../../BreadcrumbsCustom'
import { Button } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Comment from './Comment';
import HotProductCarousel from '../../Homepage/HotProductCarousel';

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

export default function ProductDetail(props) {
    const classes = useStyles();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [isExistInWishlist, setIsExistInWishlist] = useState(false);

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
        setProduct(props.product)
        window.scroll(0, 0);
    }, [props.product]);

    const handleClickIncreaseBtn = (e) => {
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
            setQuantity(parseInt(e.target.value));
        }
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <BreadcrumbsCustom
                            path={location.pathname}
                            breadCrumb={props.product.name}
                            productUrl={props.product._id}
                        />
                    </Paper>
                </Grid>
                <Grid item sm={5} xs={12}>
                    <Paper style={{
                        position: 'relative',
                        top: 0,
                        left: 0,
                    }}>
                        <img src={props.product.primaryImg}
                            alt={props.product.name}
                            className={props.product.quantity === 0 ? classes.opacity : classes.image}
                        />
                        {props.product.quantity === 0 &&
                            <img src="/out-of-stock.png"
                                alt={props.product.name}
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
                                        <Rating name="read-only" value={props.product.rating ? props.product.rating : 0} readOnly />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2">Đã bán {props.product.sold}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Typography variant="h4">
                            {product.price}₫
                        </Typography>
                        <Divider />
                        <span style={{ fontSize: 18 }}>Số lượng&nbsp;</span>
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
                                {props.product.quantity === 0 ?
                                    <Button
                                        variant="contained"
                                        startIcon={<AddShoppingCartIcon />}
                                        className={[classes.button, classes.addToCartBtn].join(" ")}
                                        onClick={handleClickAddToCartBtn}
                                        disabled
                                    >
                                        Thêm
                                    </Button>

                                    : <Button
                                        variant="contained"
                                        startIcon={<AddShoppingCartIcon />}
                                        className={[classes.button, classes.addToCartBtn].join(" ")}
                                        onClick={handleClickAddToCartBtn}
                                    >
                                        Thêm
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
        </>
    )
}

ProductDetail.propTypes = {
    product: PropTypes.object.isRequired,
}