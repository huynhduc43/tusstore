import React, { useRef } from "react";

import {
  Link as Links,
} from "react-router-dom";

//Material UI
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Container, Grid } from "@material-ui/core";
import { List } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { useSnackbar } from 'notistack';

//My components
import Constants from "../Constants";
import { auto } from "async";
import ListItemCustom from './ListItemCustom';
import { Favorite } from "@material-ui/icons";
import NavItem from './NavItem';
import InputBase from '@material-ui/core/InputBase';
import SearchDialog from './SearchDialog';
import AccountButton from './AccountButton';
import CartButton from '../ShoppingCart/CartButton';
import useAuth from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbarButtons: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBar: {
    boxShadow: "0 0px 2px 0px #000",
    zIndex: 1,
  },
  appBar1: {
    backgroundColor: "#000",
    boxShadow: "0 -1000px 0 1000px #000",
    padding: 0,
  },
  appBar2: {
    backgroundColor: "#fff",
    color: "#000",
    boxShadow: "0 -1000px 0 1000px #fff",
    zIndex: -1,
    padding: 0,
  },
  circleBtn: {
    '&:hover': {
      color: Constants.GREEN,
    },
  },
  button: {
    '&:hover': {
      backgroundColor: Constants.GREEN,
      color: "#fff",
    }
  },
  navItemBtn: {
    '&:hover': {
      color: "#fff",
      backgroundColor: Constants.GREEN,
    }
  },
  search: {
    position: 'relative',
    border: "1px solid #000",
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: Constants.GREEN,
      borderColor: Constants.GREEN,
    },
    '&:focus': {
      color: Constants.GREEN,
      borderColor: Constants.GREEN,
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1.5em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
  notificationIcon: {
    color: "#fff",
  },
  offer: {
    "&:hover": {
      color: "#fff",
      textAlign: "center",
      textDecoration: "underline",
    }
  }
}));

export default function NavBar ({ data }) {
  const classes = useStyles();
  const [menu, setMenu] = React.useState(false);
  const anchorRefMenu = useRef(null);
  const [openSearchDialog, setOpenSearchDialog] = React.useState(false);
  const theme = useTheme();
  const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));
  const isDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const { enqueueSnackbar } = useSnackbar();
  const auth = useAuth();
  //console.log(isMedium);

  const handleToggle = () => {
    setMenu((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRefMenu.current && anchorRefMenu.current.contains(event.target)) {
      return;
    }

    setMenu(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevMenu = React.useRef(menu);
  React.useEffect(() => {
    if (prevMenu.current === true && menu === false) {
      anchorRefMenu.current.focus();
    }

    prevMenu.current = menu;
  }, [menu]);

  const handleClickOpenSearchDialog = () => {
    setOpenSearchDialog(true);
  }

  const handleDisplayNotification = () => {
    if (!auth.user) {
      enqueueSnackbar('Bạn cần đăng nhập để tiếp tục', {
        variant: 'warning'
      });
    }
  }

  return (
    <>
      <SearchDialog status={openSearchDialog} onClickOpenSearch={setOpenSearchDialog} />
      <AppBar position="relative" className={classes.appBar}>
        <Container className={classes.appBar1}>
          <Toolbar>
            {isDownXS ? (
              <Grid container>
                <Grid container item xs={12}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button component={Links} to="/offer" color="inherit"
                    className={classes.offer}
                  >
                    Get flat 35% off on orders over $50!
                  </Button>
                </Grid>

                <Grid container item xs={12}
                  style={{
                    paddingBottom: 5,
                  }}
                  justifyContent="center"
                >
                  {auth.user ? (
                    <AccountButton email={auth.user.email} />
                  ) : (<>
                    <Button component={Links} to="/sign-in" className={classes.button} color="inherit">
                      Đăng nhập
                    </Button>
                    <Button component={Links} to="/sign-up" className={classes.button} color="inherit">
                      Đăng ký
                    </Button>
                  </>)}
                </Grid>
              </Grid>
            ) : (
              <>
                <Button component={Links} to="/offer" color="inherit"
                  className={classes.offer}
                >
                  Get flat 35% off on orders over $50!
                </Button>
                <div className={classes.toolbarButtons}>
                  {auth.user ? (<>
                    <IconButton>
                      <NotificationsIcon className={classes.notificationIcon} />
                    </IconButton>
                    |
                    <AccountButton email={auth.user.email} />
                  </>) : (<>
                    <Button component={Links} to="/sign-in" className={classes.button} color="inherit">
                      Đăng nhập
                    </Button>
                    <Button component={Links} to="/sign-up" className={classes.button} color="inherit">
                      Đăng ký
                    </Button>
                  </>)}
                </div>

              </>
            )}
          </Toolbar>
        </Container>
        <Container className={classes.appBar2}>
          <Toolbar>
            <Button
              edge="start"
              className={[classes.menuButton, classes.navItemBtn].join(" ")}
              aria-label="menu"
              component={Links}
              to="/"
            >
              <img src="/logoTD.svg"
                style={{
                  width: 24,
                  height: auto,
                  margin: 5,
                }}
                alt="Logo TusStore"
              />
              <p style={{
                margin: "auto"
              }}>TusStore</p>
            </Button>

            {isDownXS ? (<>
              <IconButton
                ref={anchorRefMenu}
                aria-controls={menu ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={classes.circleBtn}
              >
                <MenuIcon />
              </IconButton>
              <Popper open={menu} anchorEl={anchorRefMenu.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <List
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                        >
                          {data.map((data, i) => {
                            return (
                              <ListItemCustom key={i}
                                nameListItem={data.navItemName}
                                nestedList={data.list}
                                onClickClose={handleClose}
                              />
                            );
                          })}

                        </List>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>) : (<>
              {data.map((data, i) => {
                return (
                  <NavItem key={i} name={data.navItemName} items={data.list} />
                );
              })}
            </>)}

            <div className={classes.toolbarButtons}>
              {!isDownSM &&
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <IconButton color="inherit" className={classes.circleBtn}
                      component={Links} to='/account/wishlist'
                    >
                      <SearchIcon />
                    </IconButton>
                  </div>
                  <InputBase
                    placeholder="Tìm kiếm..."
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
              }
              {isDownSM &&
                <IconButton color="inherit" className={classes.circleBtn}
                  onClick={handleClickOpenSearchDialog}
                >
                  <SearchIcon />
                </IconButton>
              }
              <IconButton color="inherit" className={classes.circleBtn}
                component={Links} to='/account/wishlist'
                onClick={handleDisplayNotification}

              >
                <Favorite />
              </IconButton>

              <CartButton />
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}