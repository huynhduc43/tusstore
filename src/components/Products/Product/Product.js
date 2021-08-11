import React, { useState } from 'react';

import { Grid, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
        fontSize: 12,
    },
    addToCartBtn: {
        fontSize: 12,
        backgroundColor: "#4fbfa8",
        '&:hover': {
            backgroundColor: "#03A685",
        },
        '&:active': {
            backgroundColor: "#01755D",
        }
    }
}));

export default function Product() {
    const classes = useStyles();

    return (
        <Grid item md={4} sm={6} xs={12}>
            <Paper className={classes.paper}>
                <Grid container justifyContent="space-evenly">
                    <Grid item xs={12}>
                        <img src="https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg"
                            style={{
                                width: '100%',
                            }}
                            alt="product"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <b>Ten san pham</b>
                    </Grid>
                    <Grid item xs={12}>
                        <p>Giá san pham</p>
                    </Grid>
                    <Grid item xs={5}>
                        <Button
                            variant="contained"
                            className={[classes.button, classes.viewBtn].join(" ")}
                            startIcon={<VisibilityIcon />}
                            style={{ width: '100%' }}
                        >
                            Xem
                        </Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={[classes.button, classes.addToCartBtn].join(" ")}
                            startIcon={<ShoppingCartIcon />}
                            style={{ width: '100%' }}
                        >
                            Thêm
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}