import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid,Paper } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

//react-bootstrap
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

//My components
import HotProduct from './HotProduct';

const products = [
    {
        id: "1",
        name: "Xương rồng bánh sinh nhật",
    },
    {
        id: "2",
        name: "Product 2",
    },
    {
        id: "3",
        name: "Product 3",
    },
    {
        id: "4",
        name: "Product 4",
    },
    {
        id: "5",
        name: "Xương rồng bánh sinh nhật",
    },
    {
        id: "6",
        name: "Product 2",
    },
    {
        id: "7",
        name: "Product 3",
    },
    {
        id: "8",
        name: "Product 4",
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "100%",
        paddingBottom: 10,
        marginBottom: 10,
    },
    carousel: {
        '& .carousel-indicators ': {
            bottom: -50,
        },
        '& .carousel-indicators [data-bs-target]': {
            backgroundColor: "#4fbfa8",
            width: 15,
            height: 15,
            borderRadius: "50%",
        },
    }
}));

const chunk = (array, chunkVal) => {
    let result = [];
    let i, j, temporary;
    for (i = 0, j = array.length; i < j; i += chunkVal) {
        temporary = array.slice(i, i + chunkVal);
        result.push(temporary);
    }

    return result;
}

export default function HotProductCarousel() {
    const classes = useStyles();
    const theme = useTheme();
    const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    let chunkProducts;
    if (isDownXS) {
        chunkProducts = chunk(products, 2);
    } else {
        chunkProducts = chunk(products, 4);
    }

    return (
        <div className={classes.root}>
            <Carousel controls={false} className={classes.carousel} activeIndex={index} onSelect={handleSelect}>
                {isDownXS ? (
                    chunkProducts.map((array, i) => (
                        <Carousel.Item key={i}>
                            <Grid container spacing={1}>
                                {array.map(product => (
                                    <Grid key={product.id} item xs={6}>
                                        <Paper className={classes.paper}>
                                            <HotProduct
                                                productId={product.id}
                                                productName={product.name}
                                            />
                                        </Paper>

                                    </Grid>
                                ))}
                            </Grid>
                        </Carousel.Item>
                    ))
                ) : (
                    chunkProducts.map((array, i) => (
                        <Carousel.Item key={i}>
                            <Grid container spacing={3}>
                                {array.map(product => (
                                    <Grid key={product.id} item xs={3}>
                                        <Paper className={classes.paper}>
                                            <HotProduct
                                                productId={product.id}
                                                productName={product.name}
                                            />
                                        </Paper>

                                    </Grid>
                                ))}
                            </Grid>
                        </Carousel.Item>
                    ))
                )}
            </Carousel>
        </div>
    );
}
