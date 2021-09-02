import React, { useEffect, useState } from "react";

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
import AdvancedFilteringCactus from './AdvancedFilteringCactus';
import PaginationCustom from "./PaginationCustom";
import ProductDetail from "./Product/ProductDetail";
import AdvancedFilteringStoneLotus from './AdvancedFilteringStoneLotus';
import AdvancedFilteringPots from './AdvancedFilteringPots';


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
  const [productDetail, setProductDetail] = useState({});
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState({
    cactus: true,
    stoneLotus: false,
    pots: false,
  });
  const [sort, setSort] = useState('newest');
  const [pathname, setPathname] = React.useState(props.pathname);

  React.useEffect(() => {
    console.log(location);
    const fetchData = async () => {
      console.log("filter: " + filter);
      let response;
      if (filter === '') {
        response = await axios.get('http://localhost:3001' + location.pathname + `${`?sort=${sort}` === location.search ? `?sort=${sort}` : `${location.search}`}`);
      } else {
        response = await axios.get('http://localhost:3001' + location.pathname + location.search);
      }

      setProducts(response.data.productList);
      setPagination(response.data.paginationInfo);

    }

    const fetchProductDetail = async () => {
      const response = await axios.get('http://localhost:3001' + location.pathname);
      setProductDetail(response.data);
    }

    if (pathnameList.indexOf(location.pathname) !== -1) {
      fetchData();
      window.scroll(0, 0);
    } else {
      fetchProductDetail();
    }

    //console.log(filter);
    setPathname(location.pathname);
  }, [location.pathname, location.search, filter, sort, location]);

  useEffect(() => {
    if (location.pathname.indexOf("/products/cactus") !== -1) {
      setFilterType({
        cactus: true,
        stoneLotus: false,
        pots: false,
      })
    } else if (location.pathname.indexOf("/products/stone-lotus") !== -1) {
      setFilterType({
        cactus: false,
        stoneLotus: true,
        pots: false,
      })
    } else {
      setFilterType({
        cactus: false,
        stoneLotus: false,
        pots: true,
      })
    }
  }, [location.pathname]);

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <BreadcrumbsCustom
                path={location.pathname}
                breadCrumb={productDetail.name}
                productUrl={productDetail._id}
              />
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
                {filterType.cactus && <AdvancedFilteringCactus
                  filterParent={filter}
                  onHandleFilter={setFilter}
                  page={pagination.current_page}
                  pathname={pathname}
                  sort={sort}
                />}
                {filterType.stoneLotus && <AdvancedFilteringStoneLotus
                  onHandleFilter={setFilter}
                  page={pagination.current_page}
                  pathname={location.pathname}
                />}
                {filterType.pots && <AdvancedFilteringPots
                  onHandleFilter={setFilter}
                  page={pagination.current_page}
                  pathname={location.pathname}
                />}
              </Paper>
            </Grid>
          </Grid>

          <Grid container item md={9} xs={12} direction="column">
            <Grid container spacing={3}>

              {pathnameList.indexOf(location.pathname) === -1 ? <ProductDetail product={productDetail} />
                :
                (<>
                  {/* {!isDownSM &&
                      <Grid item xs={12}>
                        <Paper className={classes.paper}>xs=12</Paper>
                      </Grid>
                    } */}

                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      {pagination.total_results === 0 ? <>
                        <img src='/search.svg' width="20%" alt="not-found" />
                        <Typography variant="h6" color="secondary">Không có sản phẩm!</Typography>
                      </> : (
                        <Grid container item xs={12} spacing={1} alignItems="center">
                          <Grid item sm={6} xs={12}>
                            {/* <Show perPage={perPage} onChangePerPage={setPerPage} /> */}
                            <Typography variant="body2">
                              Hiển thị <b>{pagination.first_result + 1} - {pagination.last_result + 1} / {pagination.total_results}</b> sản phẩm
                            </Typography>
                          </Grid>
                          <Grid container item sm={6} xs={12} alignItems="center" justifyContent="center">
                            <Grid item>Sắp xếp theo&nbsp;</Grid>
                            <Grid item>
                              <SortBy
                                filter={filter}
                                onChangeSortValue={setSort}
                                sort={sort}
                              />
                            </Grid>
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
                            view={product.view}
                            rating={product.rating}
                          />
                        ))
                      }
                    </Grid>
                  </Grid>
                  {pagination.total_results !== 0 &&
                    <Grid container item xs={12} justifyContent="center" style={{ marginBottom: 10, }}>
                      <PaginationCustom pagination={pagination} filter={filter} sort={sort} />
                    </Grid>
                  }
                </>)}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}