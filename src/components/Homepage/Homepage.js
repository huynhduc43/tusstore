import React from "react";

//Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";

//My components
import Constants from '../Constants'
import NewestProductCarousel from './NewestProduct/NewestProductCarousel';
import HotProductCarousel from "./HotProduct/HotProductCarousel";

const useStyles = makeStyles(theme => ({
  container: {
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  title: {
    color: Constants.GREEN,
    [theme.breakpoints.down("sm")]: {
      minHeight: 70,
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: 0,
    },
  },
  description: {
    [theme.breakpoints.down("md")]: {
      minHeight: 55,
    },
    [theme.breakpoints.down(630)]: {
      minHeight: 85,
    },
  }
}))

export default function Homepage() {
  const classes = useStyles();
  const theme = useTheme();
  const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <NewestProductCarousel />
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h4" className={classes.title}>XU HƯỚNG</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <HotProductCarousel />
          </Grid>
          <Grid container item xs={12} style={{ paddingTop: 16 }} direction="row"
            justifyContent="center"
            alignItems="stretch">
            {isDownXS ? (<>
              <Grid item sm={4} xs={12} style={{ paddingBottom: 24 }}>
                <Paper className={classes.paper}>
                  <img src="https://res.cloudinary.com/dnbjep0mp/image/upload/v1629735083/icons/cactus.svg"
                    width="100px"
                    alt="cactus"
                  />
                  <Typography variant="h6" className={classes.title}>CÂY CẢNH PHONG PHÚ</Typography>
                  <Typography variant="subtitle1">Đa dạng sản phẩm, thỏa sức lựa chọn</Typography>
                </Paper>
              </Grid>
              <Grid item sm={4} xs={12} style={{ paddingBottom: 24 }}>
                <Paper className={classes.paper}>
                  <img src="https://res.cloudinary.com/dnbjep0mp/image/upload/v1629733723/icons/offer.svg"
                    width="100px"
                    alt="best price"
                  />
                  <Typography variant="h6" className={classes.title}>GIÁ TỐT NHẤT</Typography>
                  <Typography variant="subtitle1">Sản phẩm với nhiều mức giá hấp dẫn</Typography>
                </Paper>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Paper className={classes.paper}>
                  <img src="https://res.cloudinary.com/dnbjep0mp/image/upload/v1629734238/icons/delivery.svg"
                    width="100px"
                    alt="delivery"
                  />
                  <Typography variant="h6" className={classes.title}>GIAO HÀNG NHANH</Typography>
                  <Typography variant="subtitle1">Dịch vụ giao hàng hỏa tốc</Typography>
                </Paper>
              </Grid>
            </>) : (<>
              <Grid item sm={4} xs={12} style={{ paddingRight: 16 }}>
                <Paper className={classes.paper} >
                  <img src="https://res.cloudinary.com/dnbjep0mp/image/upload/v1629735083/icons/cactus.svg"
                    width="100px"
                    alt="cactus"
                  />
                  <Typography variant="h6" className={classes.title}>
                    CÂY CẢNH PHONG PHÚ
                  </Typography>
                  <Typography variant="subtitle1" className={classes.description}>
                    Đa dạng sản phẩm, thỏa sức lựa chọn
                  </Typography>
                </Paper>
              </Grid>
              <Grid item sm={4} xs={12} style={{ padding: "0 8px" }}>
                <Paper className={classes.paper}>
                  <img src="https://res.cloudinary.com/dnbjep0mp/image/upload/v1629733723/icons/offer.svg"
                    width="100px"
                    alt="best price"
                  />
                  <Typography variant="h6" className={classes.title}>GIÁ TỐT NHẤT</Typography>
                  <Typography variant="subtitle1" className={classes.description}>Sản phẩm với nhiều mức giá hấp dẫn</Typography>
                </Paper>
              </Grid>
              <Grid item sm={4} xs={12} style={{ paddingLeft: 16 }}>
                <Paper className={classes.paper} >
                  <img src="https://res.cloudinary.com/dnbjep0mp/image/upload/v1629734238/icons/delivery.svg"
                    width="100px"
                    alt="delivery"
                  />
                  <Typography variant="h6" className={classes.title}>GIAO HÀNG NHANH</Typography>
                  <Typography variant="subtitle1" className={classes.description}>Dịch vụ giao hàng hỏa tốc</Typography>
                </Paper>
              </Grid>
            </>)}

          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}