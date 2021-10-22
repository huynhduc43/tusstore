import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

//react-bootstrap
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

//My components
import HotProduct from './HotProduct';
import HotProductCarouselSkeleton from './HotProductCarouselSkeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 24,
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
  const [index, setIndex] = useState(0);
  const [hotProducts, setHotProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const isDownXS = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    let mounted = true;
    const fetchHotProducts = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_REMOTE_URL + '/hot-products');

        if (response && mounted) {
          setIsLoaded(true);
          setHotProducts(response.data);;
        }
      } catch (error) {
        console.error(error);
        setIsLoaded(true);
        setError(error);
      }
    }

    fetchHotProducts();
    return () => mounted = false;
  }, []);

  if (error) {
    return <Typography variant="h4" color="error" align="center">Error: {error.message}</Typography>;
  } else if (!isLoaded) {
    return (
      <HotProductCarouselSkeleton />
    );
  } else {
    return (
      <div className={classes.root}>
        <Carousel controls={false} className={classes.carousel} activeIndex={index} onSelect={handleSelect}>
          {isDownXS ? (
            chunk(hotProducts, 2).map((array, i) => (
              <Carousel.Item key={i}>
                <Grid container spacing={1}>
                  {array.map(product => (
                    <Grid key={product._id} item xs={6}>
                      <Paper className={classes.paper}>
                        <HotProduct
                          _id={product._id}
                          name={product.name}
                          price={product.price}
                          primaryImg={product.primaryImg}
                        />
                      </Paper>

                    </Grid>
                  ))}
                </Grid>
              </Carousel.Item>
            ))
          ) : (
            chunk(hotProducts, 4).map((array, i) => (
              <Carousel.Item key={i}>
                <Grid container spacing={3}>
                  {array.map(product => (
                    <Grid key={product._id} item xs={3}>
                      <Paper className={classes.paper}>
                        <HotProduct
                          _id={product._id}
                          name={product.name}
                          price={product.price}
                          primaryImg={product.primaryImg}
                          path={product.path}
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
}
