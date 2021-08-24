import React from "react";

import { Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import {
  useLocation,
  useRouteMatch,
} from "react-router-dom";

//My components
import Product from "./Product/Product";
import BreadcrumbsCustom from '../BreadcrumbsCustom';
import SortBy from "./SortBy";
import Show from './Show';
import AdvancedFiltering from './AdvancedFiltering';
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
  sticky: {
    position: "sticky",
    top: 24,
  }
}));

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
  },
  {
    id: "4",
    name: "Product 1",
  },
  {
    id: "5",
    name: "Product 2",
  },
  {
    id: "6",
    name: "Product 3",
  }
];

export default function ListOfProducts(props) {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const isDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));

  let { url } = useRouteMatch();

  React.useEffect(() => {
  }, [location])

  return (
    <>
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={3}>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <BreadcrumbsCustom path={location.pathname} />
              </Paper>
            </Grid>

            {isDownSM &&
              <Grid item xs={12}>
                <Paper className={classes.paper}>xs=12</Paper>
              </Grid>
            }

            <Grid container item xs={isDownSM ? 12 : 3} >
              <Grid item xs={12}>
                <Paper className={[classes.paper, classes.sticky].join(" ")}>
                  <AdvancedFiltering />
                </Paper>
              </Grid>
            </Grid>


            <Grid container item md={9} xs={12} direction="column">
              <Grid container spacing={3}>
                {location.pathname !== "/list-of-cactus/large-cactus" ? <ProductDetail /> :
                  (<>
                    {!isDownSM &&
                      <Grid item xs={12}>
                        <Paper className={classes.paper}>xs=12</Paper>
                      </Grid>
                    }

                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <Grid container item xs={12} spacing={1} alignItems="center">
                          <Grid item sm={6} xs={12}>
                            <Show />
                          </Grid>
                          <Grid container item sm={6} xs={12} alignItems="center" justifyContent="center">
                            <p>Sắp xếp theo&nbsp;</p>
                            <SortBy />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={isDownXS ? 1 : 3}>
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