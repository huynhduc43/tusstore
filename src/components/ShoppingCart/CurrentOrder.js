import React from "react";

import { Divider, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { Button } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//My components
import Constants from "../Constants";

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
        margin: "30px 0",
        backgroundColor: Constants.GREEN,
    },
    total: {
        fontSize: 25,
    }
}));

export default function CurrentOrder() {
    const classes = useStyles();
    const [code, setCode] = React.useState('');

    const handleChangeCode = (event) => {
        setCode(event.target.value);
    };


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
                            <TableCell align="right">2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                                <b>Tổng đơn hàng</b>
                            </TableCell>
                            <TableCell align="right">2.000.000</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                                <b>Phí vận chuyển</b>
                            </TableCell>
                            <TableCell align="right">20.000</TableCell>
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
                        >
                            <MenuItem value="">
                                <em>Không có</em>
                            </MenuItem>
                            <MenuItem value="AAAAAAAAA">AAAAAAAAA</MenuItem>
                            <MenuItem value="BBBBBBBBB">BBBBBBBBB</MenuItem>
                            <MenuItem value="CCCCCCCCC">CCCCCCCCC</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" className={classes.outlinedBtn}>Xác nhận</Button>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left">
                                <b>Tổng cộng</b>
                            </TableCell>
                            <TableCell align="right" className={classes.total}>2.020.000</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}