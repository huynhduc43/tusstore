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

export default function PaginationCustom(props) {
    const classes = useStyles();
    const location = useLocation();
    const [pageItem, setPageItem] = React.useState([]);

    useEffect(() => {
        let tmp = [];

        for (let i = props.pagination.first_page; i <= props.pagination.last_page; i++) {
            tmp.push({
                pageNumber: i,
                pageUrl: location.pathname + "?page=" + i + `${props.filter === '' ? '' : '&' + props.filter}`,
            })
        }

        setPageItem(tmp);
    }, [location.pathname, props.pagination.first_page, props.pagination.last_page, props.filter])

    return (
        <Grid item className={classes.root}>
            {props.pagination.has_previous_page ?
                <>
                    <Button
                        className={classes.button}
                        component={Link}
                        to={`${location.pathname}${props.filter === '' ? '' : '?' + props.filter}`}
                    >
                        <ArrowBackIcon />
                    </Button>
                    <Button
                        className={classes.button}
                        component={Link}
                        to={`${location.pathname}?page=${props.pagination.previous_page}${props.filter === '' ? '' : '&' + props.filter}`}
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
                        to={`${location.pathname}?page=${props.pagination.previous_page}${props.filter === '' ? '' : '&' + props.filter}`}
                    >
                        <ChevronLeftIcon />
                    </Button>

                </>
            }

            {pageItem.map(page => (
                <Button
                    key={page.pageNumber}
                    component={Link} to={page.pageUrl}
                    className={page.pageNumber === props.pagination.current_page ? classes.selected : classes.button}
                >
                    {page.pageNumber}
                </Button>
            ))}

            {props.pagination.has_next_page ?
                <><Button
                    className={classes.button}
                    component={Link}
                    to={`${location.pathname}?page=${props.pagination.next_page}${props.filter === '' ? '' : '&' + props.filter}`}
                >
                    <ChevronRightIcon />
                </Button>
                    <Button
                        className={classes.button}
                        component={Link}
                        to={`${location.pathname}?page=${props.pagination.total_pages}${props.filter === '' ? '' : '&' + props.filter}`}
                    >
                        <ArrowForwardIcon />
                    </Button>
                </>
                : <><Button
                    disabled className={classes.button}
                    to={`${location.pathname}?page=${props.pagination.next_page}${props.filter === '' ? '' : '&' + props.filter}`}
                >
                    <ChevronRightIcon />
                </Button>
                    <Button
                        disabled className={classes.button}
                        component={Link}
                        to={`${location.pathname}?page=${props.pagination.total_pages}${props.filter === '' ? '' : '&' + props.filter}`}
                    >
                        <ArrowForwardIcon />
                    </Button>
                </>
            }
        </Grid>
    )
}