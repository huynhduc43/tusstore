import React from 'react';

import { Divider, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
    },
    divider: {
        margin: "10px 0",
    }
}))


export default function Notifications(){
    const classes = useStyles();

    return(
        <Paper className={classes.paper}>
            <Typography variant="h6">Thông báo</Typography>
            <Divider className={classes.divider}/>
        </Paper>
    )
}