import React from 'react';

import {
  Link as Links,
} from 'react-router-dom';

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import NumberFormat from 'react-number-format';

//My component
import Constants from '../../Constants';

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
    minHeight: 230,
    [theme.breakpoints.down("sm")]: {
      minHeight: 350,
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: 220,
    },
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
    minHeight: 80,
    textDecoration: "none",
    color: "#000",
    fontWeight: 'bold',
    '&:hover': {
      color: Constants.GREEN,
    },
    [theme.breakpoints.down("md")]: {
      minHeight: 80,
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: 60,
    },
    [theme.breakpoints.down(345)]: {
      minHeight: 105,
    },
  },
  price: {

  }

}));

export default function HotProduct({_id, name, price, primaryImg}) {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Grid container spacing={1} justifyContent="space-evenly">
        <Grid item xs={12}>
          <img src={primaryImg}
            alt={name}
            className={classes.image}
          />
        </Grid>
        <Grid item xs={12} className={classes.name}>
          <Typography variant="body1"
            component={Links}
            to={`/products/${_id}`}
            className={classes.name}
          >
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.price}>
          <Typography variant="h5" color="secondary">
            <NumberFormat
              value={price}
              displayType={'text'}
              thousandSeparator={true}
              suffix={'???'}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}