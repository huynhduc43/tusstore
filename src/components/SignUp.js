import React, { useState } from 'react';
import axios from 'axios';

import {
  Link,
  useHistory,
} from "react-router-dom";

import { useSnackbar } from 'notistack';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Constants from './Constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#fff",
    border: `4px solid ${Constants.GREEN}`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    ...Constants.BUTTON_CONTAINED,
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
  },
}));

function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [errMsg, setErrMsg] = useState("");
  let history = useHistory();

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src="/logoTD.svg" width="40%" alt="logo" />
        </Avatar>
        <Typography component="h1" variant="h5">
          ????ng k??
        </Typography>
        <form className={classes.form} onSubmit={
          (e) => handleSubmit(e, name, password, email, enqueueSnackbar, setErrMsg, history)
        }>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="filled"
                required
                fullWidth
                id="name"
                label="H??? t??n"
                autoFocus
                onChange={handleChangeName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="email"
                label="?????a ch??? email"
                name="email"
                autoComplete="email"
                onChange={handleChangeEmail}
                helperText={errMsg}
                error={errMsg === '' ? false : true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="password"
                label="M???t kh???u"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChangePassword}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="T??i mu???n nh???n ???????c ngu???n c???m h???ng, c??c ch????ng tr??nh khuy???n m??i v?? c???p nh???t ti???p th??? qua email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            ????ng k??
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/sign-in" className={classes.link}>
                ???? c?? t??i kho???n? ????ng nh???p
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

/**
 * Handle sign up
 * @param {*} e event
 * @param {*} name 
 * @param {*} password 
 * @param {*} email 
 * @param {*} enqueueSnackbar 
 * @param {*} setErrMsg 
 * @param {*} history 
 */

const handleSubmit = async (e, name, password, email, enqueueSnackbar, setErrMsg, history) => {
  e.preventDefault();
  try {
    const response = await axios.post(process.env.REACT_APP_REMOTE_URL + '/sign-up', {
      name: name,
      password: password,
      email: email,
    });

    if (response.data.notification === "success") {
      enqueueSnackbar('???? ????ng k?? th??nh c??ng! Vui l??ng ????ng nh???p t??i kho???n', {
        variant: 'success'
      });

      setErrMsg('');
      history.replace("/sign-in");
    } else {
      setErrMsg(response.data.notification);
    }
  } catch (error) {
    console.error(error);
  }
}

export default SignUp;