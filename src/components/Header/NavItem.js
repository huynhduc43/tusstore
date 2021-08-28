import React, { useState } from "react";

import {
    Link as Links,
} from "react-router-dom";

//Material UI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

//My components
import Constants from "../Constants";

const useStyles = makeStyles((theme) => ({
    circleBtn: {
        '&:hover': {
            color: Constants.GREEN,
        }
    },
    button: {
        '&:hover': {
            backgroundColor: Constants.GREEN,
        }
    },
    navItemBtn: {
        '&:hover': {
            color: "#fff",
            backgroundColor: "#4fbfa8",
        }
    },
    menuItem: {
        "&:hover": {
            color: "#fff",
            backgroundColor: Constants.GREEN,
        },
        "&:active": {
            color: "#fff",
            backgroundColor: Constants.GREEN,
        }
    }
}));

export default function NavItem(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event, url) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
        //console.log(url);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div>
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={classes.navItemBtn}
            >
                {props.name}<ArrowDropDownIcon />
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="" onKeyDown={handleListKeyDown}>
                                    {props.items.map((item, i) => {
                                        return (
                                            <MenuItem
                                                key={i}
                                                component={Links} to={item.itemUrl}
                                                onClick={(e) => handleClose(e, item.itemUrl)}
                                                className={classes.menuItem}
                                            >
                                                {item.itemName}
                                            </MenuItem>
                                        );
                                    })}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

        </div>
    );
}