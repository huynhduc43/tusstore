import React, { useEffect, useState } from "react";

import { Divider, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import NumberFormat from 'react-number-format';

//My components
import Constants from "../Constants";
//import { CartState } from "../../context/Context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  checkoutBtn: Constants.BUTTON_CONTAINED,
  outlinedBtn: Constants.BUTTON_OUTLINED,
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  divider: {
    padding: 5,
    margin: "10px 0",
    backgroundColor: Constants.GREEN,
    opacity: 1,
  },
  total: {
    fontSize: 25,
  }
}));

const codeList = [
  {
    name: 'AAAAAAAAA',
    value: `10000`,
  },
  {
    name: 'BBBBBBBBB',
    value: `15000`,
  },
  {
    name: 'CCCCCCCCC',
    value: `20000`,
  }
]

export default function CurrentOrder({checkStatus, count, cart, }) {
  const classes = useStyles();
  const [code, setCode] = useState(0);
  const [shippingFee, setShippingFee] = useState(20000);
  const [total, setTotal] = useState(0);
  const [display, setDisplay] = useState(false);

  const handleChangeCode = (event) => {
    setCode(event.target.value);
    if (event.target.value === '') {
      setDisplay(false);
    } else setDisplay(true);
  };

  useEffect(() => {
    let tmp = 0;
    cart.forEach((product, i) => {
      if (checkStatus[i]) {
        tmp += product.price * product.qty;
      }

    });
    setTotal(tmp);

  }, [cart, checkStatus]);

  useEffect(() => {
    //Free ship
    if (total > 200000) {
      setShippingFee(0);
    } else setShippingFee(20000);
  }, [total]);

  return (
    <>
      <Typography variant="h6" style={{ textAlign: "center" }}>Đơn hàng hiện tại</Typography>
      <Divider />
      <TableContainer>
        <Table className={classes.table} aria-label="current-order">
          <TableBody>
            <TableRow>
              <TableCell align="left">
                <b>Tổng số sản phẩm</b>
              </TableCell>
              <TableCell align="right">
                {count}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <b>Tạm tính</b>
              </TableCell>
              <TableCell align="right">
                <NumberFormat
                  value={total}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={'₫'}
                  renderText={(value, props) => <div {...props}>{value}</div>}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <b>Phí vận chuyển</b>
                <Typography variant="subtitle2" color="secondary"><i>Free ship đơn hàng từ 200,000₫</i></Typography>
              </TableCell>
              <TableCell align="right">
                <NumberFormat
                  value={shippingFee}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={'₫'}
                  renderText={(value, props) => <div {...props}>{value}</div>}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={1} justifyContent="center">
        <Grid container item xs={12} justifyContent="center">
          <FormControl className={classes.formControl}>
            <InputLabel id="code-label">Mã khuyến mãi</InputLabel>
            <Select
              labelId="code-label"
              id="select-code"
              value={code}
              onChange={handleChangeCode}
              defaultValue="0"
            >
              <MenuItem value="0">
                <em>Không có</em>
              </MenuItem>
              {codeList.map(code => (
                <MenuItem key={code.name} value={code.value}>{code.name} - Giảm <NumberFormat
                  value={code.value}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={'₫'}
                  renderText={(value, props) => <div {...props}>{value}</div>}
                />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer>
        <Table>
          <TableBody>
            {display &&
              <TableRow>
                <TableCell align="left">
                  <b>Khuyến mãi giảm</b>
                </TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={code}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'₫'}
                    renderText={(value, props) => <div {...props}>{value}</div>}
                  />
                </TableCell>
              </TableRow>
            }
            <TableRow style={{ borderTop: `10px solid ${Constants.GREEN}` }}>
              <TableCell align="left">
                <b>Tổng cộng</b>
              </TableCell>
              <TableCell align="right" className={classes.total}>
                <NumberFormat
                  value={count === 0 ? 0 : total + shippingFee - parseInt(code)}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={'₫'}
                  renderText={(value, props) => <div {...props}>{value}</div>}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}