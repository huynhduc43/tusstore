import React from "react";

import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core";

//My components
import Constants from "../Constants";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .Mui-selected': {
            backgroundColor: Constants.GREEN + " !important",
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
        '& .MuiPaginationItem-page': {
            backgroundColor: "#fff",

        },
    }
}));

export default function PaginationCustom() {
    const classes = useStyles();
    const theme = useTheme();
    const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            size={isDownXS ? "small" : "medium"}
            className={classes.root}
        />
    )
}