import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

export default function SimpleRating() {

    return (
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} >
                <Typography align="center" variant="h6"><b>Đánh giá</b></Typography>
            </Grid>
            <Grid item>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Rating name="read-only" defaultValue={4} readOnly />
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2">Đã bán 10</Typography>
                    </Grid>
                </Grid>
            </Grid>



        </Grid>
    );
}
