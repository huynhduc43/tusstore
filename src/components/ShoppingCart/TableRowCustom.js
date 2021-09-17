import React, { useState, useEffect } from "react";

import { Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

import NumberFormat from 'react-number-format';

import Constants from "../Constants";
import { CartState } from "../../context/CartContext";

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
    const {
        state: { cart },
        dispatch,
    } = CartState();

    const [btnStatus, setBtnStatus] = useState(false);

    const handleClickIncreaseBtn = () => {
        setBtnStatus(true);
        props.onChange(prevState => {
            return { ...prevState, [props.id]: prevState[props.id] + 1 }
        });

        dispatch({
            type: "INCREASE_QTY",
            payload: { _id: props.product._id },
        })
    }

    useEffect(() => {
        setBtnStatus(false);
    }, [cart]);

    const handleClickDecreaseBtn = () => {
        props.onChange(prevState => {
            if (prevState[props.id] <= 1) {
                props.onOpenDialog(true);
                props.onAddDialogContent(props.product.name);
                props.onAddProductId(props.product._id);
                props.onSetIndex(props.id);

                return prevState;
            } else {
                return { ...prevState, [props.id]: prevState[props.id] - 1 }
            }
        });

        dispatch({
            type: "DECREASE_QTY",
            payload: { _id: props.product._id },
        });
    }

    return (
        <TableRow>
            <TableCell align="left" padding="none">
                <Checkbox color="primary"
                    name={String(props.id)}
                    checked={props.checked}
                    onClick={props.onClickCheckBoxItem}
                />
            </TableCell>
            <TableCell component="th" scope="row">
                <img src={props.product.primaryImg}
                    style={{
                        width: 80,
                        height: 60,
                    }}
                    alt={props.product.name}
                />
            </TableCell>
            <TableCell component="th" scope="row">
                <Link className={classes.name} to={`/products/${props.product._id}`}>{props.product.name}</Link>
            </TableCell>
            <TableCell align="right" width="10" padding="none">
                <IconButton color="secondary"
                    disabled={btnStatus}
                    onClick={handleClickDecreaseBtn}
                ><RemoveCircleIcon /></IconButton>
            </TableCell>
            <TableCell align="center" padding="none">
                {props.product.qty}
            </TableCell>
            <TableCell align="left" width="10" padding="none">
                <IconButton color="primary"
                    disabled={btnStatus}
                    onClick={handleClickIncreaseBtn}
                ><AddCircleIcon /></IconButton>
            </TableCell>
            <TableCell align="right" style={{ paddingLeft: 50, paddingRight: 0, fontSize: 18 }}>
                <NumberFormat
                    value={props.product.price * props.product.qty}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'₫'}
                    renderText={(value, props) => <div {...props}>{value}</div>}
                />
            </TableCell>
            <TableCell align="right">
                <IconButton color="secondary"
                    onClick={() => props.onDeleteProduct(props.product.name, props.product._id, props.id)}
                >
                    <DeleteOutlinedIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}