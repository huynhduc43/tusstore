import React, { useState } from "react";

import { Container, Divider, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import {
  Switch,
  BrowserRouter as Route,
  Link,
  useLocation,
  useRouteMatch,
  withRouter,
} from "react-router-dom";

//My components
import Product from "./Product/Product";
import BreadcrumbsCustom from '../BreadcrumbsCustom';
import SortBy from "./SortBy";
import Show from './Show';
import Categories from './Categories';
import SelectType from './SelectType';
import SelectColor from './SelectColor';
import PaginationCustom from "./PaginationCustom";
import ProductDetail from "./Product/ProductDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function ListOfProducts(props) {
  const classes = useStyles();
  const location = useLocation();

  let { path, url } = useRouteMatch();
  const products = [
    {
      id: "1",
      name: "Product 1",
    },
    {
      id: "2",
      name: "Product 2",
    },
    {
      id: "3",
      name: "Product 3",
    }
  ];
  React.useEffect(() => {
  }, [location])

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
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography color="textPrimary">Màu sắc</Typography>
                    <Divider />
                    <SelectColor />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid container item xs={9} direction="column">
              <Grid container spacing={3}>
                {location.pathname !== "/list-of-cactus/large-cactus" ? <ProductDetail /> :
                  (<>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>xs=12</Paper>
                    </Grid>

                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <Grid container item xs={12} spacing={1} alignItems="center" direction="row">
                          <Grid item md={4} sm={12} xs={12}>
                            <Paper className={classes.paper}>xs=4</Paper>
                          </Grid>
                          <Grid item md={4} sm={6} xs={12}>
                            <Show />
                          </Grid>
                          <Grid container item md={4} sm={6} xs={12} alignItems="center" justifyContent="center">
                            <p>Sắp xếp theo&nbsp;</p>
                            <SortBy />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        {
                          products.map((product) => (
                            <Product link={`${url}/${product.id}`} key={product.id} productId={product.id} productName={product.name} />
                          ))
                        }
                      </Grid>
                    </Grid>

                    <Grid container item xs={12} justifyContent="center" style={{ marginBottom: 10, }}>
                      <PaginationCustom />
                    </Grid>
                  </>)}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}