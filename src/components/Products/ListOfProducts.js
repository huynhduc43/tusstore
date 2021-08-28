import React, { useState } from "react";

import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import {
  useLocation,
} from "react-router-dom";

import axios from 'axios';

//My components
import Product from "./Product/Product";
import BreadcrumbsCustom from '../BreadcrumbsCustom';
import SortBy from "./SortBy";
//import Show from './Show';
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

//Sử dụng switch + route +map bị lỗi do useEffect đc gọi lại khi pathname thay đổi
//Rerender
//Back từ xem chi tiết về không giữ được data
const pathnameList = [
  "/products/cactus/large-cactus",
  "/products/cactus/medium-cactus",
  "/products/cactus/small-cactus",
  "/products/cactus/mix-cactus",
  "/products/cactus",
  "/products/stone-lotus",
  "/products/stone-lotus/large-stone-lotus",
  "/products/stone-lotus/medium-stone-lotus",
  "/products/stone-lotus/small-stone-lotus",
  "/products/stone-lotus/mix-stone-lotus",
  "/products/pots/ceramic-pots",
  "/products/pots/terracotta-pots",
  "/products/pots",
]

export default function ListOfProducts(props) {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const isDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});



  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001' + location.pathname + location.search);

      if (Array.isArray(response.data.productList)) {
        setProducts(response.data.productList);
        setPagination(response.data.paginationInfo);
      }
    }

    if (pathnameList.indexOf(location.pathname) !== -1) {
      fetchData();
      window.scroll(0, 0);
    }

  }, [location.pathname, location.search]);

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

            {/* {isDownSM &&
              <Grid item xs={12}>
                <Paper className={classes.paper}>xs=12</Paper>
              </Grid>
            } */}

            <Grid container item xs={isDownSM ? 12 : 3} >
              <Grid item xs={12}>
                <Paper className={[classes.paper, classes.sticky].join(" ")}>
                  <AdvancedFiltering />
                </Paper>
              </Grid>
            </Grid>

            <Grid container item md={9} xs={12} direction="column">
              <Grid container spacing={3}>

                {pathnameList.indexOf(location.pathname) === -1 ? <ProductDetail />
                  :
                  (<>
                    {/* {!isDownSM &&
                      <Grid item xs={12}>
                        <Paper className={classes.paper}>xs=12</Paper>
                      </Grid>
                    } */}

                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        {pagination.total_results === 0 ? <Typography variant="h6">Không có sản phẩm.</Typography> : (
                          <Grid container item xs={12} spacing={1} alignItems="center">
                            <Grid item sm={6} xs={12}>
                              {/* <Show perPage={perPage} onChangePerPage={setPerPage} /> */}
                              <Typography variant="body2">
                                Hiển thị <b>{pagination.first_result + 1} - {pagination.last_result + 1} / {pagination.total_results}</b> sản phẩm
                              </Typography>
                            </Grid>
                            <Grid container item sm={6} xs={12} alignItems="center" justifyContent="center">
                              <Grid item>Sắp xếp theo&nbsp;</Grid>
                              <Grid item><SortBy /></Grid>
                            </Grid>
                          </Grid>
                        )}

                      </Paper>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={isDownXS ? 1 : 3}>
                        {
                          products.map((product) => (
                            <Product
                              key={product._id}
                              link={`${location.pathname}/${product._id}`}
                              _id={product._id}
                              name={product.name}
                              price={product.price}
                              primaryImg={product.primaryImg}
                            />
                          ))
                        }
                      </Grid>
                    </Grid>
                    {pagination.total_results !== 0 &&
                      <Grid container item xs={12} justifyContent="center" style={{ marginBottom: 10, }}>
                        <PaginationCustom pagination={pagination} />
                      </Grid>
                    }
                  </>)}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}