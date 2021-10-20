import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export default function NewestProductCarouselSkeleton() {
  const theme = useTheme();
  const isDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Paper style={{ padding: 20 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Grid container item justifyContent="space-evenly">
            {isDownSM && <>
              <Grid item sm={5} xs={12}>
                <Skeleton variant="rect" height={200} />
              </Grid>
              <Grid container item sm={5} xs={12} alignItems="center"
                justifyContent={isDownXS ? "center" : "flex-start"}
              >
                {isDownXS && <><Grid item xs={12} align="center">
                  <Typography variant="body1">
                    <Skeleton animation="wave" width="80%" />
                    <Skeleton animation="wave" width="80%" style={{ marginBottom: 10 }} />
                  </Typography>
                  <Typography variant="h5">
                    <Skeleton animation="wave" width="50%" style={{ marginBottom: 30 }} />
                  </Typography>
                  <Typography variant="body1">
                    <Skeleton animation="wave" width="80%" />
                    <Skeleton animation="wave" width="80%" />
                  </Typography>
                </Grid>
                </>}

                {!isDownXS && <Grid item xs={12}>
                  <Typography variant="body1" >
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" style={{ marginBottom: 10 }} />
                  </Typography>
                  <Typography variant="h5" >
                    <Skeleton animation="wave" width="50%" />
                  </Typography>
                </Grid>}
              </Grid>
              {!isDownXS &&
                <Grid container>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={10}>
                    <Typography variant="body1">
                      <Skeleton animation="wave" />
                      <Skeleton animation="wave" />
                      <Skeleton animation="wave" />
                    </Typography>
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              }
            </>}

            {(!isDownSM) && <>
              <Grid item xs={3} align="right">
                <Typography variant="h5">
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" style={{ marginBottom: 10 }} />
                </Typography>
                <Typography variant="h4">
                  <Skeleton animation="wave" width="50%" />
                </Typography>
              </Grid>
              <Grid item md={3} sm={4}>
                <Skeleton variant="rect" height={300} />
              </Grid>
              <Grid container item xs={3} alignItems="flex-end">
                <Grid item xs={12} alignItems="flex-end">
                  <Typography variant="body1">
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                  </Typography>
                </Grid>
              </Grid>
            </>}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}