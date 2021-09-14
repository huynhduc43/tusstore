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

import axios from 'axios';
import NumberFormat from 'react-number-format';

//My components
import Constants from "../../Constants";
import BreadcrumbsCustom from '../../BreadcrumbsCustom'
import { Button } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Comment from './Comment';
import HotProductCarousel from '../../Homepage/HotProductCarousel';
import { CartState } from "../../../context/Context";

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
    const {
        dispatch
    } = CartState();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const [product, setProduct] = useState(props.product);
    const [quantity, setQuantity] = useState(1);
    const [isExistInWishlist, setIsExistInWishlist] = useState(false);

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
        dispatch({
            type: "ADD_TO_CART_WITH_QTY",
            payload: {
                product: product,
                quantity: quantity,
            },
        });

        enqueueSnackbar('Đã thêm vào giỏ hàng!', {
            variant: 'success'
        });
    };

    useEffect(() => {
        if (Object.keys(props.product).length !== 0) {
            setProduct(props.product);
            window.scroll(0, 0);
        }
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
            setQuantity(parseInt(e.target.value) <= 0 ? 1 : parseInt(e.target.value));
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            let path = location.pathname.split('/');

            if (path.length === 3 && path[1] === "products") {
                let res = await axios.get('http://localhost:3001' + location.pathname);
                setProduct(res.data);
            }
        }

        fetchData();
        window.scroll(0, 0);
    }, [location.pathname]);

    return (
        <>
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
                                        <Typography variant="subtitle2">Đã bán {product.sold}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Typography variant="h4" color="secondary">
                            <NumberFormat
                                value={product.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'₫'}
                                renderText={(value, props) => <div {...props}>{value}</div>}
                            />
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
                                {product.quantity === 0 ?
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

                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                        <Typography variant="h6" style={{ paddingBottom: 5 }}><b>Bình luận</b></Typography>
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