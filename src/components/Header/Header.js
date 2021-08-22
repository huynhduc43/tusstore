import React, { useRef } from "react";

import {
    Link as Links,
    useLocation
} from "react-router-dom";

//Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Container, Grid } from "@material-ui/core";
import { List } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { Badge } from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications';

//My components
import Constants from "../Constants";
import { auto } from "async";
import ListItemCustom from './ListItemCustom';
import { Favorite } from "@material-ui/icons";
import NavItem from './NavItem';
import InputBase from '@material-ui/core/InputBase';
import SearchDialog from './SearchDialog';
import AccountButton from './AccountButton';

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
}));

const NavBar = (props) => {
    const classes = useStyles();
    const location = useLocation();
    const [open1, setOpen1] = React.useState(false);
    const anchorRef1 = useRef(null);
    const [openSearchDialog, setOpenSearchDialog] = React.useState(false);

    const theme = useTheme();
    const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));
    const isDownSM = useMediaQuery(theme.breakpoints.down("sm"));
    //console.log(isMedium);

    const handleToggle1 = () => {
        setOpen1((prevOpen) => !prevOpen);
    };

    const handleClose1 = (event) => {
        if (anchorRef1.current && anchorRef1.current.contains(event.target)) {
            return;
        }

        setOpen1(false);
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen1 = React.useRef(open1);
    React.useEffect(() => {
        if (prevOpen1.current === true && open1 === false) {
            anchorRef1.current.focus();
        }

        prevOpen1.current = open1;
    }, [open1]);

    const handleClickOpenSearchDialog = () => {
        setOpenSearchDialog(true);
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
                                        style={{ textAlign: "center" }}
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
                                    {/* <Button component={Links} to="/sign-in" className={classes.button} color="inherit">
                                        Đăng nhập
                                    </Button>
                                    <Button component={Links} to="/sign-up" className={classes.button} color="inherit">
                                        Đăng ký
                                    </Button> */}

                                    {/* Login */}
                                    <AccountButton/>
                                </Grid>
                            </Grid>
                        ) : (
                            <>
                                <Button component={Links} to="/offer" color="inherit">
                                    Get flat 35% off on orders over $50!
                                </Button>
                                <div className={classes.toolbarButtons}>
                                    {/* <Button component={Links} to="/sign-in" className={classes.button} color="inherit">
                                        Đăng nhập
                                    </Button>
                                    <Button component={Links} to="/sign-up" className={classes.button} color="inherit">
                                        Đăng ký
                                    </Button> */}

                                    {/* Login */}
                                    <IconButton>
                                        <NotificationsIcon className={classes.notificationIcon} />
                                    </IconButton>
                                    |
                                    <AccountButton/>
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
                            <img src="../../logoTD.svg"
                                style={{
                                    width: 24,
                                    height: auto,
                                    margin: 5,
                                }}
                                alt="Logo TusStore"
                            />
                            <p>TusStore</p>
                        </Button>

                        {isDownXS ? (<>
                            <IconButton
                                ref={anchorRef1}
                                aria-controls={open1 ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle1}
                                className={classes.circleBtn}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Popper open={open1} anchorEl={anchorRef1.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose1}>
                                                <List
                                                    component="nav"
                                                    aria-labelledby="nested-list-subheader"
                                                >
                                                    {props.data.map((data, i) => {
                                                        return (
                                                            <ListItemCustom key={i}
                                                                nameListItem={data.nameNavItem}
                                                                nestedList={data.list}
                                                                onClickClose={handleClose1}
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
                            {props.data.map((data, i) => {
                                return (
                                    <NavItem key={i} name={data.nameNavItem} items={data.list} />
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
                            >
                                <Favorite />
                            </IconButton>

                            <IconButton color="inherit" className={classes.circleBtn}
                                component={Links} to="/cart"
                            >
                                <Badge badgeContent={4} max={9} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            {(location.pathname !== '/sign-in' && location.pathname !== '/sign-up') ? <Toolbar /> : <></>}
        </>
    );
}

export default function Header() {
    const data = [
        {
            nameNavItem: "Xương rồng",
            list: [
                {
                    itemName: "Tất cả",
                    itemUrl: '/list-of-cactus',
                },
                {
                    itemName: "Cỡ lớn",
                    itemUrl: '/list-of-cactus/large-cactus',
                },
                {
                    itemName: "Cỡ vừa",
                    itemUrl: '/list-of-cactus/medium-cactus',
                },
                {
                    itemName: "Cỡ nhỏ",
                    itemUrl: '/list-of-cactus/small-cactus',
                },
                {
                    itemName: "Mix",
                    itemUrl: '/list-of-cactus/mix-cactus',
                }
            ]
        },
        {
            nameNavItem: "Sen đá",
            list: [
                {
                    itemName: "Tất cả",
                    itemUrl: '/list-of-lotus',
                },
                {
                    itemName: "Cỡ lớn",
                    itemUrl: '/list-of-lotus/large-lotus',
                },
                {
                    itemName: "Cỡ vừa",
                    itemUrl: '/list-of-lotus/medium-lotus',
                },
                {
                    itemName: "Cỡ nhỏ",
                    itemUrl: '/list-of-lotus/small-lotus',
                },
                {
                    itemName: "Mix",
                    itemUrl: '/list-of-lotus/mix-lotus',
                }
            ]
        },
        {
            nameNavItem: "Chậu",
            list: [
                {
                    itemName: "Tất cả",
                    itemUrl: '/list-of-pots/ceramic-pots',
                },
                {
                    itemName: "Chậu sứ",
                    itemUrl: '/list-of-pots/ceramic-pots',
                },
                {
                    itemName: "Chậu đất nung",
                    itemUrl: '/list-of-pots/terracotta-pots',
                },
            ]
        }
    ]

    return (
        <React.Fragment>
            <CssBaseline />
            <NavBar data={data} />
        </React.Fragment>
    );
}