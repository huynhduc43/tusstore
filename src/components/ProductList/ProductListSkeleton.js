import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function ProductListSkeleton() {
  const theme = useTheme();
  const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  return (<>
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Grid container item xs={12} spacing={1} alignItems="center" justifyContent="space-around">
          <Grid item sm={5} xs={12}>
            <Typography variant="body2">
              <Skeleton animation="wave" />
            </Typography>
          </Grid>
          <Grid item sm={5} xs={12}>
            <Skeleton animation="wave" />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={isDownXS ? 1 : 3}>
        {Array(6).fill(null).map((item, i) => (
          <Grid key={i} item sm={4} xs={6} align="center">
            <Paper style={{ padding: 10 }}>
              <Skeleton variant="rect" animation="wave" height={180} />
              <Typography variant="body1">
                <Skeleton animation="wave" width="80%" />
                <Skeleton animation="wave" width="80%" style={{ marginBottom: 6 }} />
              </Typography>
              <Typography variant="h5">
                <Skeleton animation="wave" width="40%" style={{ marginBottom: 6 }} />
              </Typography>
              <Grid container justifyContent="space-around">
                <Grid item xs={5}>
                  <Skeleton variant="rect" animation="wave" height={30} />
                </Grid>
                <Grid item xs={5}>
                  <Skeleton variant="rect" animation="wave" height={30} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </>);
}