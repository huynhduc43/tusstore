import React, { useState } from "react";

import { Container, Divider, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";


//My components
import Product from "./Product/Product";
import BreadcrumbsCustom from '../BreadcrumbsCustom';
import SortBy from "./SortBy";
import Show from './Show';
import Categories from './Categories';
import SelectType from './SelectType';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function ListOfProducts(props) {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={3}>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <BreadcrumbsCustom />
              </Paper>
            </Grid>

            <Grid item xs={3} >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper} >
                    <Typography color="textPrimary">Danh mục sản phẩm</Typography>
                    <Divider />
                    <Categories />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography color="textPrimary">Loại cây</Typography>
                    
                    <Divider />
                    <SelectType />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid container item xs={9} direction="column">

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>

                    <Grid container item xs={12} alignItems="center" direction="row">
                      <Grid item xs={4}>
                        <Paper className={classes.paper}>xs=4</Paper>
                      </Grid>
                      <Grid item xs={4}>
                        <Show />
                      </Grid>
                      <Grid container item xs={4} alignItems="center" justifyContent="center">
                        <p>Sắp xếp theo&nbsp;</p>
                        <SortBy />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                  </Grid>
                </Grid>


              </Grid>
            </Grid>

          </Grid>
        </div>
      </Container>
    </>
  )
}