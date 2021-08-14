import React, {useState} from 'react';

import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

import Constants from '../Constants';

const useStyles = makeStyles((theme) => ({
    btnGroup: Constants.BUTTON_OUTLINED,
    active: Constants.BUTTON_CONTAINED
}));

export default function BasicButtonGroup() {
    const classes = useStyles();
    const [active, setActive] = useState([true, false, false]);

    const handleClick = (e) => {
        console.log(e.target.value);
        switch (e.target.value){
            case "12":
                alert("Hien thi 12 san pham");
                setActive([true, false, false]);
                break;
            case "24":
                alert("Hien thi 24 san pham");
                setActive([false, true, false]);
                break;
            default:
                alert("Hien thi tat ca san pham");
                setActive([false, false, true]);
        }
    }

    return (
        <>
            <ButtonGroup
                aria-label="contained primary button group show"
            >
                <Button className={(active[0]  ? classes.active : classes.btnGroup)} value="12" onClick={handleClick}>12</Button>
                <Button className={(active[1]  ? classes.active : classes.btnGroup)} value="24" onClick={handleClick}>24</Button>
                <Button className={(active[2]  ? classes.active : classes.btnGroup)} value="all" onClick={handleClick}>All</Button>

            </ButtonGroup>
        </>
    );
}
