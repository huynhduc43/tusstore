import React from 'react';

import { Link } from 'react-router-dom';

import { TableBody } from '@material-ui/core';
import { TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Checkbox } from "@material-ui/core";

import NumberFormat from 'react-number-format';

//My components
import Constants from '../../Constants';
import { CartState } from "../../../context/CartContext";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  name: {
    color: "rgba(0, 0, 0, 0.87)",
    textDecoration: "none",
    '&:hover': {
      color: Constants.GREEN,
    }
  },
  img: {
    width: 80,
    height: 60,
  },
  icon: {

  },
  checkoutBtn: Constants.BUTTON_CONTAINED,
  outlinedBtn: Constants.BUTTON_OUTLINED,
  checbox: {
    marginLeft: 20,
  },
  delete: {
  },
  cell: {
    padding: 0,
    fontWeight: "bold",
  },
  infoCell: {
    padding: 4,
  }
}))

export default function TableBodyCustom({
  id, product, checked,
  onOpenDialog,
  onAddDialogContent,
  onAddProductId,
  onSetIndex,
  onChangeQuantity,
  onClickCheckBoxItem,
  onDeleteProduct,
}) {
  const classes = useStyles();
  const {
    dispatch
  } = CartState();

  const handleClickIncreaseBtn = () => {
    onChangeQuantity(prevState => {
      return { ...prevState, [id]: prevState[id] + 1 }
    });

    dispatch({
      type: "INCREASE_QTY",
      payload: { _id: product._id },
    });
  }

  const handleClickDecreaseBtn = () => {
    onChangeQuantity(prevState => {
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
    <TableBody key={product._id}>
      <TableRow style={{ borderTop: "5px solid #4fbfa8" }}>
        <TableCell className={classes.cell}>Ảnh</TableCell>
        <TableCell className={classes.infoCell}>
          <img src={product.primaryImg}
            alt={product.name}
            className={classes.img}
          />
        </TableCell>
        <TableCell rowSpan={2} padding="none"
          style={{
            borderLeft: "1px solid #EAECEE",
          }}
        >
          <Checkbox color="primary"
            name={String(id)}
            checked={checked ? checked : false}
            onClick={() => onClickCheckBoxItem}

          />
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell className={classes.cell}>Sản phẩm</TableCell>
        <TableCell className={classes.infoCell}>
          <Link className={classes.name} to={`/products/${product._id}`}>{product.name}</Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.cell}>Số lượng</TableCell>
        <TableCell className={classes.infoCell}>
          <IconButton color="secondary" className={classes.icon}
            onClick={handleClickDecreaseBtn}
          >
            <RemoveCircleIcon />
          </IconButton>
          {product.qty}

          <IconButton color="primary"
            onClick={handleClickIncreaseBtn}
          >
            <AddCircleIcon color="primary" />
          </IconButton>
        </TableCell>
        <TableCell rowSpan={2} padding="none" style={{ borderLeft: "1px solid #EAECEE" }}>
          <IconButton color="secondary"
            onClick={() => onDeleteProduct(product.name, product._id, id)}>
            <DeleteOutlinedIcon
              className={classes.delete}
            />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.cell}>Giá</TableCell>
        <TableCell className={classes.infoCell}>
          <NumberFormat
            value={product.price * product.qty}
            displayType={'text'}
            thousandSeparator={true}
            suffix={'₫'}
            renderText={(value, props) => <div {...props}>{value}</div>}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  )
}
