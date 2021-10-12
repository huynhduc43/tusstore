import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

//react-bootstrap
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

//My components
import HotProduct from './HotProduct';

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
  const classes = useStyles();
  const theme = useTheme();
  const isDownXS = useMediaQuery(theme.breakpoints.down("sm"));
  const [index, setIndex] = useState(0);
  const [hotProducts, setHotProducts] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchHotProducts = async () => {
      const response = await axios.get('http://localhost:3001/hot-products');
      setHotProducts(response.data);
    }
  
    fetchHotProducts();
  }, []);

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
