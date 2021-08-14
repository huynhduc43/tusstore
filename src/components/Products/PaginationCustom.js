import React from "react";

import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from "@material-ui/core";

//My components
import Constants from "../Constants";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .Mui-selected': {
            backgroundColor: Constants.GREEN,
            color: '#fff !important',
        },
        '& .Mui-selected:hover': {
            backgroundColor: Constants.GREEN,
            color: '#fff',
        },
        '& .MuiPaginationItem-page:hover': {
            backgroundColor: Constants.GREEN,
            color: '#fff',
        },
        '& .MuiPaginationItem-rounded': {
            color: Constants.GREEN,
        },

    }
}));

export default function PaginationCustom() {
    const classes = useStyles();
    return (
        <>
            <Pagination count={10} variant="outlined" shape="rounded" className={classes.root}/>
        </>

    )
}