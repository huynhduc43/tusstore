import React, { useState, useEffect } from 'react';

import { Button, Grid, Paper, Typography } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { makeStyles } from '@material-ui/core';

import { useSnackbar } from 'notistack';

//My components
import Constants from '../../Constants';

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
    }
}));

export default function ProductDetail(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [product, setProduct] = useState({});
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

    const fetchData = async (url) => {
        const data = await fetch(url);
        const items = await data.json();
        console.log(items);
        setProduct(items);
    }

    useEffect(() => {
        fetchData("https://random-data-api.com/api/food/random_food");
        //fetchData(location.pathname);
    }, []);

    return (
        <>
            <Grid item md={6} >
                <img src="https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg"
                    alt="product"
                    className={classes.image}
                />
            </Grid>
            <Grid item md={6}>
                <Paper>
                    <Typography variant="h4" align="center">
                        {product.dish}
                    </Typography>
                    <Typography variant="h3" align="center">
                        {product.measurement}
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
            <Grid item md={12} >

                <Paper>
                    <Typography variant="body1">
                        {product.description}
                    </Typography>

                </Paper>
            </Grid>
        </>
    )
}