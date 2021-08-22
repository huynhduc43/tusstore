import React from 'react';

import {Link} from 'react-router-dom';

import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//My components


const useStyles = makeStyles((theme) => ({
    popover: {

    },
    paper: {

    },
    accountBtn: {
        margin: theme.spacing(1),
        color: "#fff",
        '&:hover': {
            backgroundColor: "#ABB2B9",
        }
    },
}));

export default function MouseOverPopover() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button
                className={classes.accountBtn}
                endIcon={<AccountCircleIcon />}
                onClick={handleClick}
            >
                my_account
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                className={classes.popover}
            >
                <Paper className={classes.paper}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button component={Link} to="/account/profile" onClick={handleClose}>
                            <ListItemText primary="Thông tin tài khoản" />
                        </ListItem>
                        <ListItem button component={Link} to="/account/manage-orders" onClick={handleClose}>
                            <ListItemText primary="Đơn hàng" />
                        </ListItem>
                        <ListItem button component={Link} to="/sign-in" onClick={handleClose}>
                            <ListItemText primary="Đăng xuất" />
                        </ListItem>
                    </List>
                </Paper>
            </Popover>
        </div>
    );
}
