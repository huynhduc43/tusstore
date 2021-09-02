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

//My component
import Constants from '../../Constants.js'

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
        zIndex: 99,
        height: 36,
        borderRadius: 0,
        opacity: 0.7,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    },
}));

export default function Product(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const handleClickAddToCartBtn = () => {
        enqueueSnackbar('Đã thêm vào giỏ hàng!', {
            variant: 'success'
        });
    };

    return (
        <Grid item sm={4} xs={6}>
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
                                    <Typography variant="h6">{props.rating}</Typography>
                                </IconButton>
                            </span>
                            <span >
                                <IconButton style={{ padding: 6, color: "#000" }} disabled>
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton style={{ padding: 6, color: "#000" }} disabled>
                                    <Typography variant="h6">{props.view}</Typography>
                                </IconButton>
                            </span>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} >
                        <img src={props.primaryImg}
                            alt={props.name}
                            className={classes.img}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.productName}>
                        <b>{props.name}</b>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.productPrice}>{props.price}₫</Typography>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Button
                            variant="contained"
                            fullWidth
                            className={classes.viewBtn}
                            startIcon={<VisibilityIcon />}
                            component={Link}
                            to={`${props.link}`}
                        >
                            Xem
                        </Button>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Button
                            variant="contained"
                            fullWidth
                            className={classes.addToCartBtn}
                            startIcon={<AddShoppingCartIcon />}
                            style={{ width: '100%' }}
                            onClick={handleClickAddToCartBtn}
                        >
                            Thêm
                        </Button>
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
}