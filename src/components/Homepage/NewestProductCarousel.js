import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';

//react-bootstrap
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,

    },
    carousel: {
        "& .carousel-control-prev": {
            width: 100,
        },
        "& .carousel-control-next": {
            width: 100,
        },
        "& .carousel-control-prev-icon": {
            backgroundImage: "url('https://res.cloudinary.com/dnbjep0mp/image/upload/v1629734722/icons/left-arrow_b66ti6.svg')",
        },
        "& .carousel-control-next-icon": {
            backgroundImage: "url('https://res.cloudinary.com/dnbjep0mp/image/upload/v1629734913/icons/right-arrow_n2esp6.svg')",
        },
        '& .carousel-indicators ': {
            bottom: -40,
        },
        '& .carousel-indicators [data-bs-target]': {
            backgroundColor: "#4fbfa8",
            width: 30,
            height: 6,
        },
    },
    paper: {
        padding: "20px 0",
    },
    product: {
        paddingTop: 20,
        textAlign: "right",
    },
    image: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        height: 350,
        [theme.breakpoints.down("xs")]: {
            width: 250,
            height: 200,
        }
    },
    detail: {
        minHeight: 200,
        [theme.breakpoints.down("sm")]: {
            padding: "32px 5px 5px 5px",
            minHeight: 180,
        },
        [theme.breakpoints.down("xs")]: {
            minHeight: 200,
        }
    },
    name: {
        textDecoration: "none",
        color: "#000",
        [theme.breakpoints.down("xs")]: {
            minHeight: 70,
        },
        [theme.breakpoints.down(340)]: {
            minHeight: 100,
        },
    }
}));

export default function NewestProductCarousel() {
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const theme = useTheme();
    const isDownSM = useMediaQuery(theme.breakpoints.down("sm"));
    const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));
    const [newestProducts, setNewestProducts] = useState([]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const fetchNewestProduct = async () => {
        const res = await axios.get('http://localhost:3001');

        setNewestProducts(res.data.newestProducts);
    }

    useEffect(() => {
        fetchNewestProduct();
    }, [])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Carousel controls={isDownXS ? false : true} activeIndex={index} onSelect={handleSelect} className={classes.carousel}>
                            {newestProducts.map(product => (
                                <Carousel.Item key={product._id}>
                                    <Grid container item justifyContent="space-evenly">
                                        {isDownSM && <>
                                            <Grid item sm={5} xs={12}>
                                                <img
                                                    src={product.primaryImg}
                                                    alt={product.name}
                                                    className={classes.image}
                                                />
                                            </Grid>
                                            <Grid container item sm={5} xs={12} alignItems="center"
                                                justifyContent={isDownXS ? "center" : "flex-start"}
                                            >
                                                {isDownXS && <><Grid item style={{ textAlign: "center" }}>
                                                    <Typography
                                                        variant="h6"
                                                        className={classes.name}
                                                        component={Link}
                                                        to={product.path}
                                                    >
                                                        <b>{product.name}</b>
                                                    </Typography>
                                                    <Typography variant="h5">{product.price}₫</Typography>
                                                </Grid>
                                                    <Typography variant="body1" className={classes.detail}>
                                                        Với sự hiểu biết
                                                        về dinh dưỡng, xương rồng được trồng và chế biến ra những món “đặc sản”.
                                                        Trong đó, xương rồng tai thỏ được ưa chuộng không chỉ bởi vẻ đẹp
                                                        bên ngoài mà còn có công dụng tuyệt vời với sức khỏe.
                                                    </Typography>
                                                </>}

                                                {!isDownXS && <Grid item>
                                                    <Typography
                                                        variant="h6"
                                                        className={classes.name}
                                                        component={Link}
                                                        to={product.path}
                                                    >
                                                        <b>{product.name}</b>
                                                    </Typography>
                                                    <Typography variant="h5">{product.price}₫</Typography>
                                                </Grid>}

                                            </Grid>
                                            {!isDownXS &&
                                                <Grid container>
                                                    <Grid item xs={1}></Grid>
                                                    <Grid item xs={10}>
                                                        <Typography variant="body1" className={classes.detail}>
                                                            Với sự hiểu biết
                                                            về dinh dưỡng, xương rồng được trồng và chế biến ra những món “đặc sản”.
                                                            Trong đó, xương rồng tai thỏ được ưa chuộng không chỉ bởi vẻ đẹp
                                                            bên ngoài mà còn có công dụng tuyệt vời với sức khỏe.
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1}></Grid>
                                                </Grid>
                                            }
                                        </>}

                                        {(!isDownSM) && <>
                                            <Grid item xs={3} className={classes.product}>
                                                <Typography
                                                    variant="h5"
                                                    className={classes.name}
                                                    component={Link}
                                                    to={product.path}
                                                >
                                                    <b>{product.name}</b>
                                                </Typography>
                                                <Typography variant="h4">{product.price}₫</Typography>
                                            </Grid>
                                            <Grid item md={3} sm={4}>
                                                <img
                                                    src={product.primaryImg}
                                                    alt={product.name}
                                                    className={classes.image}
                                                />
                                            </Grid>
                                            <Grid container item xs={3} alignItems="flex-end" className={classes.detail}>
                                                <Grid item>
                                                    <Typography variant="body1">
                                                        Với sự hiểu biết
                                                        về dinh dưỡng, xương rồng được trồng và chế biến ra những món “đặc sản”.
                                                        Trong đó, xương rồng tai thỏ được ưa chuộng không chỉ bởi vẻ đẹp
                                                        bên ngoài mà còn có công dụng tuyệt vời với sức khỏe.
                                                    </Typography>
                                                </Grid>

                                            </Grid>
                                        </>}
                                    </Grid>
                                </Carousel.Item>
                            ))}

                        </Carousel>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
