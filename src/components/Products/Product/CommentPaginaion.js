import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core";
import { Grid, Button } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

//My components
import Constants from "../../Constants";

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

export default function CommentPagination(props) {
    const classes = useStyles();
    const [pageItem, setPageItem] = React.useState([]);

    useEffect(() => {
        let tmp = [];

        for (let i = props.pagination.first_page; i <= props.pagination.last_page; i++) {
            tmp.push({
                pageNumber: i,
                pageUrl: "/comments/" + props.productId + "?page=" + i,
            })
        }

        setPageItem(tmp);
    }, [props.pagination.first_page, props.pagination.last_page, props.productId])

    return (
        <Grid item className={classes.root}>
            <Button
                className={classes.button}
                onClick={() => props.onChangeCmtPage("/comments/" + props.productId)}
                disabled={props.pagination.has_previous_page ? false : true}
            >
                <ArrowBackIcon />
            </Button>
            <Button
                className={classes.button}
                onClick={
                    () => props.onChangeCmtPage(`/comments/${props.productId}?page=${props.pagination.previous_page}`)
                }
                disabled={props.pagination.has_previous_page ? false : true}
            >
                <ChevronLeftIcon />
            </Button>

            {pageItem.map(page => (
                <Button
                    key={page.pageNumber}
                    className={page.pageNumber === props.pagination.current_page ? classes.selected : classes.button}
                    onClick={() => props.onChangeCmtPage(page.pageUrl)}
                >
                    {page.pageNumber}
                </Button>
            ))}

            <Button
                className={classes.button}
                onClick={
                    () => props.onChangeCmtPage(`/comments/${props.productId}?page=${props.pagination.next_page}`)
                }
                disabled={props.pagination.has_next_page ? false : true}
            >
                <ChevronRightIcon />
            </Button>
            <Button
                className={classes.button}
                onClick={
                    () => props.onChangeCmtPage(`/comments/${props.productId}?page=${props.pagination.total_pages}`)
                }
                disabled={props.pagination.has_next_page ? false : true}
            >
                <ArrowForwardIcon />
            </Button>
        </Grid>
    )
}