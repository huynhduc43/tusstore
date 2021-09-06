import React from "react";

import { AppBar, Container, Divider, Grid, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles(theme => ({
  root: {
    padding: "24px 0",
  },
  appbar: {
    '& .MuiAppBar-colorPrimary': {
      backgroundColor: "#fff !important",
    }
  }
}))

export default function Footer() {
  const classes = useStyles();

  return (
    <AppBar position='static' color="inherit" className={classes.appbar}>
      <Container className={classes.root}>
        <Toolbar>
          <Grid container spacing={2}>

            <Grid item md={6} sm={12} xs={12}>
              <Typography variant="h6">Giới thiệu</Typography>
              <Typography variant="body2">TusStore là website thương mại điện tử chuyên cung cấp các loại cây cảnh cảnh về xương rồng và sen đá, góp phần giúp mọi người tô điểm cho không gian cá nhân.</Typography>
            </Grid>

            <Grid container item md={3} sm={6} xs={12} justifyContent="flex-start">
              <Grid item xs={12}>
                <Typography variant="h6">Liên hệ</Typography>
              </Grid>
       
                <Grid item xs={12}>
                  <Typography variant="body2"><LocationOnIcon />&nbsp;Dương Minh Châu, Tây Ninh</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2"><CallIcon />&nbsp;0869 395 072</Typography>
                </Grid>
                <Grid item xs={12}>
                  <a href="mailto:thanhduc4320@gmail.com?subject = Feedback&body = Message">
                    <Typography variant="body2"><EmailIcon />&nbsp;thanhduc4320@gmail.com</Typography>
                  </a>
                </Grid>
              

            </Grid>

            <Grid container item md={3} sm={6} xs={12} alignItems="flex-start">
              <Grid item xs={12}>
                <Typography variant="h6">Liên kết với chúng tôi</Typography>
                <Grid container spacing={1} justifyContent="flex-start">
                  <Grid item>
                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                      <FacebookIcon style={{ color: "#4267B2", }} />
                    </a>
                  </Grid>
                  <Grid item>
                    <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                      <TwitterIcon style={{ color: "#00acee", }} />
                    </a>
                  </Grid>
                  <Grid item>
                    <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
                      <YouTubeIcon style={{ color: "#FF0000", }} />
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
              <Typography variant="body1" color="inherit">
                © {new Date().getFullYear()} TusStore
              </Typography>
              <div>
                Icons made by &nbsp;
                <a href="https://www.freepik.com" title="Freepik">Freepik</a>,&nbsp;
                <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a>,&nbsp;
                <a href="https://smashicons.com/" title="Smashicons">Smashicons</a>,&nbsp;
                <a href="https://smashicons.com/" title="Smashicons">Smashicons</a>&nbsp;
                from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>

    </AppBar>
  )
}