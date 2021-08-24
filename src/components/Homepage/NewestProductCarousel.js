import React, { useState } from 'react';

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
    },
    detail: {
        paddingBottom: 20,
    },
    fixedImg: {
        width: 250,
    },
}));

export default function NewestProductCarousel() {
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const theme = useTheme();
    const isDownSM = useMediaQuery(theme.breakpoints.down("sm"));
    const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Carousel controls={isDownXS ? false : true} activeIndex={index} onSelect={handleSelect} className={classes.carousel}>
                            <Carousel.Item>
                                <Grid container item justifyContent="space-evenly">
                                    {isDownSM && <>
                                        <Grid item sm={5} xs={12}>
                                            <img
                                                src="https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg"
                                                alt="First slide"
                                                className={isDownXS ? ([classes.image, classes.fixedImg].join(" ")) : (classes.image)}
                                            />
                                        </Grid>
                                        <Grid container item sm={5} xs={12} alignItems="center"
                                            justifyContent={isDownXS ? "center" : "flex-start"}
                                        >
                                            {isDownXS && <Grid item style={{textAlign: "center"}}>
                                                <Typography variant="h6"><b>Xương rồng tai thỏ</b></Typography>
                                                <Typography variant="h5">20.000</Typography>
                                            </Grid>}

                                            {!isDownXS && <Grid item>
                                                <Typography variant="h5"><b>Xương rồng tai thỏ</b></Typography>
                                                <Typography variant="h4">20.000</Typography>
                                            </Grid>}
                                            
                                            <Grid item xs={12}>
                                                <Typography variant="body1" style={{padding: 5}}>
                                                    Với sự hiểu biết
                                                    về dinh dưỡng, xương rồng được trồng và chế biến ra những món “đặc sản”.
                                                    Trong đó, xương rồng tai thỏ được ưa chuộng không chỉ bởi vẻ đẹp
                                                    bên ngoài mà còn có công dụng tuyệt vời với sức khỏe.
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                    </>}

                                    {(!isDownSM) && <>
                                        <Grid item xs={3} className={classes.product}>
                                            <Typography variant="h5"><b>Xương rồng tai thỏ</b></Typography>
                                            <Typography variant="h4">20.000</Typography>
                                        </Grid>
                                        <Grid item md={3} sm={4}>
                                            <img
                                                src="https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg"
                                                alt="First slide"
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

                        </Carousel>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
