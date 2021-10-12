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

import Constants from "../../Constants";
import { CartState } from "../../../context/CartContext";

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  name: {
    color: "rgba(0, 0, 0, 0.87)",
    textDecoration: "none",
    '&:hover': {
      color: Constants.GREEN,
    }
  }
}))

export default function TableRowCustom({
  id, product, checked,
  onChange,
  onOpenDialog,
  onAddDialogContent,
  onAddProductId,
  onSetIndex,
  onClickCheckBoxItem,
  onDeleteProduct
}) {
  const classes = useStyles();
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [btnStatus, setBtnStatus] = useState(false);

  const handleClickIncreaseBtn = () => {
    setBtnStatus(true);
    onChange(prevState => {
      return { ...prevState, [id]: prevState[id] + 1 }
    });

    dispatch({
      type: "INCREASE_QTY",
      payload: { _id: product._id },
    })
  }

  useEffect(() => {
    setBtnStatus(false);
  }, [cart]);

  const handleClickDecreaseBtn = () => {
    onChange(prevState => {
      if (prevState[id] <= 1) {
        onOpenDialog(true);
        onAddDialogContent(product.name);
        onAddProductId(product._id);
        onSetIndex(id);

        return prevState;
      } else {
        return { ...prevState, [id]: prevState[id] - 1 }
      }
    });

    dispatch({
      type: "DECREASE_QTY",
      payload: { _id: product._id },
    });
  }

  return (
    <TableRow>
      <TableCell align="left" padding="none">
        <Checkbox color="primary"
          name={String(id)}
          checked={checked}
          onClick={onClickCheckBoxItem}
        />
      </TableCell>
      <TableCell component="th" scope="row">
        <img src={product.primaryImg}
          style={{
            width: 80,
            height: 60,
          }}
          alt={product.name}
        />
      </TableCell>
      <TableCell component="th" scope="row">
        <Link className={classes.name} to={`/products/${product._id}`}>{product.name}</Link>
      </TableCell>
      <TableCell align="right" width="10" padding="none">
        <IconButton color="secondary"
          disabled={btnStatus}
          onClick={handleClickDecreaseBtn}
        ><RemoveCircleIcon /></IconButton>
      </TableCell>
      <TableCell align="center" padding="none">
        {product.qty}
      </TableCell>
      <TableCell align="left" width="10" padding="none">
        <IconButton color="primary"
          disabled={btnStatus}
          onClick={handleClickIncreaseBtn}
        ><AddCircleIcon /></IconButton>
      </TableCell>
      <TableCell align="right" style={{ paddingLeft: 50, paddingRight: 0, fontSize: 18 }}>
        <NumberFormat
          value={product.price * product.qty}
          displayType={'text'}
          thousandSeparator={true}
          suffix={'₫'}
          renderText={(value, props) => <div {...props}>{value}</div>}
        />
      </TableCell>
      <TableCell align="right">
        <IconButton color="secondary"
          onClick={() => onDeleteProduct(product.name, product._id, id)}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

TableRowCustom.propTypes = {
  id: PropTypes.number.isRequired,
  product: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onOpenDialog: PropTypes.func.isRequired,
  onAddDialogContent: PropTypes.func.isRequired,
  onAddProductId: PropTypes.func.isRequired,
  onSetIndex: PropTypes.func.isRequired,
  onClickCheckBoxItem: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired
}