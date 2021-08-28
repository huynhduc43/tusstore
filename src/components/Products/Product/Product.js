import React from 'react';
import PropTypes from 'prop-types';

import {
    Link,
} from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { Grid, Paper, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
    viewBtn: {

    },
    addToCartBtn: Constants.BUTTON_CONTAINED,
    img: {
        width: '100%',
        height: 220,
        [theme.breakpoints.down("md")]: {
            height: 160,
        }
    },
    productName: {
        minHeight: 65,
        [theme.breakpoints.down(505)]: {
            height: 80,
        }
    }
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
                        <img src={props.primaryImg}
                            alt={props.name}
                            className={classes.img}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.productName}>
                        <b>{props.name}</b>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">{props.price}₫</Typography>
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