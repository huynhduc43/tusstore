import React, { useState } from "react";

import { Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

import Constants from "../Constants";

const useStyles = makeStyles((theme) => ({
    name: {
        color: "rgba(0, 0, 0, 0.87)",
        textDecoration: "none",
        '&:hover': {
            color: Constants.GREEN,
        }
    }
}))

export default function TableRowCustom(props) {
    const classes = useStyles();

    const handleClickIncreaseBtn = () => {
        props.onChange(prevState => {
            return { ...prevState, [props.row.id]: prevState[props.row.id] + 1 }
        })
    }

    const handleClickDecreaseBtn = () => {
        props.onChange(prevState => {
            if (prevState[props.row.id] <= 1) {
                props.onOpenDialog(true);
                props.onAddDialogContent(props.row.name);
                return prevState;
            } else {
                return { ...prevState, [props.row.id]: prevState[props.row.id] - 1 }
            }
        })
    }

    return (
        <TableRow key={props.row.id}>
            <TableCell align="left" padding="none">
                <Checkbox
                    name={props.row.id}
                    checked={props.checked}
                    onClick={props.onClickCheckBoxItem}
                />
            </TableCell>
            <TableCell component="th" scope="row">
                <img src={props.row.url}
                    style={{
                        width: 60,
                        height: 80,
                    }}
                    alt={props.row.name}
                />
            </TableCell>
            <TableCell component="th" scope="row">
                <Link className={classes.name} to={`/${props.row.id}`}>{props.row.name}</Link>
            </TableCell>
            <TableCell align="right" width="10" padding="none">
                <IconButton color="secondary"
                    onClick={handleClickDecreaseBtn}
                ><RemoveCircleIcon /></IconButton>
            </TableCell>
            <TableCell align="center" padding="none">
                {props.quantity}
            </TableCell>
            <TableCell align="left" width="10" padding="none">
                <IconButton color="primary"
                    onClick={handleClickIncreaseBtn}
                ><AddCircleIcon color="primary" /></IconButton>
            </TableCell>
            <TableCell align="right">{props.row.fat}</TableCell>
            <TableCell align="right">{props.row.carbs}</TableCell>
            <TableCell align="right" padding="none">
                <IconButton color="secondary">
                    <DeleteOutlinedIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}