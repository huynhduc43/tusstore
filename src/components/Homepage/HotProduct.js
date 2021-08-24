import React from 'react';

import {
    Link as Links,
} from 'react-router-dom';

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

//My component
import Constants from '../Constants';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    image: {
        width: '100%',
    },
    productName: {
        color: "#000",
        fontWeight: "bold",
        textDecoration: "none",
        padding: 2,
        "&:hover": {
            color: Constants.GREEN
        },
    },
    name: {
        minHeight: 60,
    },
    price: {

    }

}));

export default function Product(props) {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Grid container spacing={1} justifyContent="space-evenly">
                <Grid item xs={12}>
                    <img src="https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg"
                        alt="product"
                        className={classes.image}
                    />
                </Grid>
                <Grid item xs={12} className={classes.name}>
                    <Typography variant="body1"
                        component={Links}
                        to="/1"
                        className={classes.productName}
                    >
                        {props.productName}
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.price}>
                    <Typography variant="h6">20.000</Typography>
                </Grid>
            </Grid>

        </Grid>
    )
}