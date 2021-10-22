import React, { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

import { makeStyles } from "@material-ui/core";
import { Grid, Button } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

//My components
import Constants from "../Constants";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .Mui-disabled': {
      borderColor: "#808B96",
      backgroundColor: "#F8F9F9",

    }
  },
  button: {
    ...Constants.BUTTON_OUTLINED,
    backgroundColor: "#fff",
    border: `1px solid ${Constants.GREEN}`,
    margin: 2,
    minWidth: 35,
    [theme.breakpoints.down(400)]: {
      margin: 0,
      minWidth: 25,
      padding: 0,
    }
  },
  selected: {
    ...Constants.BUTTON_CONTAINED,
    margin: 2,
    minWidth: 35,
    [theme.breakpoints.down(400)]: {
      margin: 0,
      minWidth: 25,
      padding: 0,
    }
  },
}));

export default function PaginationCustom({ pagination, filter, sort }) {
  const classes = useStyles();
  const location = useLocation();
  const [pageItem, setPageItem] = React.useState([]);

  useEffect(() => {
    let tmp = [];

    for (let i = pagination.first_page; i <= pagination.last_page; i++) {
      tmp.push({
        pageNumber: i,
        pageUrl: location.pathname + "?sort=" + sort + "&page=" + i + `${filter === '' ? '' : '&' + filter}`,
      })
    }

    setPageItem(tmp);
  }, [location.pathname, pagination.first_page, pagination.last_page, filter, sort])

  return (
    <Grid item className={classes.root}>
      {pagination.has_previous_page ?
        <>
          <Button
            className={classes.button}
            component={Link}
            to={`${location.pathname}${filter === '' ? '' : '?' + filter}`}
          >
            <ArrowBackIcon />
          </Button>
          <Button
            className={classes.button}
            component={Link}
            to={`${location.pathname}?page=${pagination.previous_page}${filter === '' ? '' : '&' + filter}`}
          >
            <ChevronLeftIcon />
          </Button>
        </>
        : <>
          <Button
            disabled className={classes.button}
            component={Link}
            to={`${location.pathname}`}
          >
            <ArrowBackIcon />
          </Button>
          <Button
            disabled className={classes.button}
            component={Link}
            to={`${location.pathname}?page=${pagination.previous_page}${filter === '' ? '' : '&' + filter}`}
          >
            <ChevronLeftIcon />
          </Button>

        </>
      }

      {pageItem.map(page => (
        <Button
          key={page.pageNumber}
          component={Link} to={page.pageUrl}
          className={page.pageNumber === pagination.current_page ? classes.selected : classes.button}
        >
          {page.pageNumber}
        </Button>
      ))}

      {pagination.has_next_page ?
        <><Button
          className={classes.button}
          component={Link}
          to={`${location.pathname}?page=${pagination.next_page}${filter === '' ? '' : '&' + filter}`}
        >
          <ChevronRightIcon />
        </Button>
          <Button
            className={classes.button}
            component={Link}
            to={`${location.pathname}?page=${pagination.total_pages}${filter === '' ? '' : '&' + filter}`}
          >
            <ArrowForwardIcon />
          </Button>
        </>
        : <><Button
          disabled className={classes.button}
          to={`${location.pathname}?page=${pagination.next_page}${filter === '' ? '' : '&' + filter}`}
        >
          <ChevronRightIcon />
        </Button>
          <Button
            disabled className={classes.button}
            component={Link}
            to={`${location.pathname}?page=${pagination.total_pages}${filter === '' ? '' : '&' + filter}`}
          >
            <ArrowForwardIcon />
          </Button>
        </>
      }
    </Grid>
  )
}