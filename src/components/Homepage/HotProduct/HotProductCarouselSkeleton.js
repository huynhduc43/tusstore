import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Skeleton from '@material-ui/lab/Skeleton';

//react-bootstrap
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HotProductCarouselSkeleton () {
  const theme = useTheme();
  const isDownXS = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Carousel>
        {isDownXS ? (
          <Grid container spacing={3}>
            {Array(2).fill(null).map((item, i) => (
              <Grid key={i} item xs={6} align="center">
                <Paper>
                  <Skeleton variant="rect" animation="wave" height={150} />
                  <Typography variant="body1">
                    <Skeleton animation="wave" width="80%" />
                    <Skeleton animation="wave" width="80%" style={{ marginBottom: 6 }} />
                  </Typography>
                  <Typography variant="h5">
                    <Skeleton animation="wave" width="40%" />
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {Array(4).fill(null).map((item, i) => (
              <Grid key={i} item xs={3} align="center">
                <Paper>
                  <Skeleton variant="rect" animation="wave" height={200} />
                  <Typography variant="body1">
                    <Skeleton animation="wave" width="80%" />
                    <Skeleton animation="wave" width="80%" style={{ marginBottom: 6 }} />
                  </Typography>
                  <Typography variant="h5">
                    <Skeleton animation="wave" width="40%" />
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Carousel>
  );
}