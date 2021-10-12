import React, { useEffect } from "react";

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

export default function CommentPagination({productId, pagination, onChangeCmtPage}) {
  const classes = useStyles();
  const [pageItem, setPageItem] = React.useState([]);

  useEffect(() => {
    let tmp = [];

    for (let i = pagination.first_page; i <= pagination.last_page; i++) {
      tmp.push({
        pageNumber: i,
        pageUrl: "/comments/" + productId + "?page=" + i,
      })
    }

    setPageItem(tmp);
  }, [pagination.first_page, pagination.last_page, productId])

  return (
    <Grid item className={classes.root}>
      <Button
        className={classes.button}
        onClick={() => onChangeCmtPage("/comments/" + productId)}
        disabled={pagination.has_previous_page ? false : true}
      >
        <ArrowBackIcon />
      </Button>
      <Button
        className={classes.button}
        onClick={
          () => onChangeCmtPage(`/comments/${productId}?page=${pagination.previous_page}`)
        }
        disabled={pagination.has_previous_page ? false : true}
      >
        <ChevronLeftIcon />
      </Button>

      {pageItem.map(page => (
        <Button
          key={page.pageNumber}
          className={page.pageNumber === pagination.current_page ? classes.selected : classes.button}
          onClick={() => onChangeCmtPage(page.pageUrl)}
        >
          {page.pageNumber}
        </Button>
      ))}

      <Button
        className={classes.button}
        onClick={
          () => onChangeCmtPage(`/comments/${productId}?page=${pagination.next_page}`)
        }
        disabled={pagination.has_next_page ? false : true}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        className={classes.button}
        onClick={
          () => onChangeCmtPage(`/comments/${productId}?page=${pagination.total_pages}`)
        }
        disabled={pagination.has_next_page ? false : true}
      >
        <ArrowForwardIcon />
      </Button>
    </Grid>
  )
}