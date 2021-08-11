import React from 'react';

import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

export default function BasicButtonGroup() {
    const classes = useStyles();

    return (
        <>
            <ButtonGroup
                aria-label="contained primary button group"
            >
                <Button component={NavLink} to="/">12</Button>
                <Button component={NavLink} to="/">24</Button>
                <Button component={NavLink} to="/">All</Button>

            </ButtonGroup>
        </>
    );
}
