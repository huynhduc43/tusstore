import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Constants from "./Constants";
import useAuth from "../context/AuthContext";
import { CartState } from "../context/CartContext";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    ...Constants.BUTTON_CONTAINED,
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  let history = useHistory();
  let location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const auth = useAuth();
  const {
    state: { cart },
    dispatch
  } = CartState();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  useEffect(() => {
    //handle sync cart in server
    const updateCart = async () => {
      await axios.put(process.env.REACT_APP_LOCAL_URL + '/cart/update', {
        userId: auth.user._id,
        currentCart: cart,
      });
    }

    if (auth.user) {
      updateCart();
    }
    // eslint-disable-next-line
  }, [auth.user]);

  return (
    <>
      <Container component="main" maxWidth="xs" style={{ height: "100%" }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img src="/logoTD.svg" width="40%" alt="logo" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <form className={classes.form} onSubmit={
            (e) => handleSubmit(e, email, password, auth, from, history, dispatch, enqueueSnackbar, setErrMsg)
            }>
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Địa chỉ email"
              name="email"
              autoComplete="email"
              autoFocus
              // value={location.state != undefined ? location.state.data.email : ""}
              onChange={handleChangeEmail}
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="password"
              onChange={handleChangePassword}
              helperText={errMsg}
              error={errMsg === '' ? false : true}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs >
                <Link to="/" variant="body2" className={classes.link}>
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up" variant="body2" className={classes.link}>
                  {"Chưa có tài khoản? Đăng ký"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}

const handleSubmit = async (e, email, password, auth, from, history, dispatch, enqueueSnackbar, setErrMsg) => {
  e.preventDefault();

  try {
    const response = await axios.post(process.env.REACT_APP_LOCAL_URL + '/sign-in', {
      password: password,
      email: email,
    });

    if (response.data.isLogged) {
      auth.signin(response.data.user);

      //Redirect
      history.replace(from);

      if (response.data.user.cart.length !== 0) {
        //handle sync cart in local
        dispatch({
          type: "SYNC_CART",
          payload: { userCart: response.data.user.cart }
        });
      }

      enqueueSnackbar('Đã đăng nhập thành công!', {
        variant: 'success'
      });
    } else {
      setErrMsg(response.data.errMsg);
    }

  } catch (error) {
    console.error(error);
  }
}