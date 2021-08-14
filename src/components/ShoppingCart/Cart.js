import React, { useState } from "react";

import { Container, Divider, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from "@material-ui/styles";
import { Button, Checkbox } from "@material-ui/core";

import {
    Switch,
    BrowserRouter as Route,
    Link,
    useLocation,
    useRouteMatch,
    withRouter,
} from "react-router-dom";

//My components
import BreadcrumbsCustom from '../BreadcrumbsCustom';
import TableRowCustom from "./TableRowCustom";
import Constants from "../Constants";
import AlertDialog from "./AlertDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    checkoutBtn: Constants.BUTTON,
    sticky: {
        position: "sticky",
        top: 24,
    },
}));

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(id, url, name, quantity, fat, carbs, protein) {
    return { id, url, name, quantity, fat, carbs, protein };
}

const rows = [
    createData("0", "https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg", 'Frozen yoghurt', 1, 6.0, 24, 4.0),
    createData("1", "https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg", 'Ice cream sandwich', 2, 9.0, 37, 4.3),
    createData("2", "https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg", 'Eclair', 2, 16.0, 24, 6.0),
    createData("3", "https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg", 'Cupcake', 3, 3.7, 67, 4.3),
    createData("4", "https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg", 'Gingerbread', 3, 16.0, 49, 3.9),
];


export default function ListOfProducts(props) {
    const classes = useStyles();
    let checkStatusState = Array(rows.length).fill(false);
    let quantityState = [];

    rows.forEach(element => {
        quantityState.push(element.quantity);
    });

    const [checkStatus, setCheckStatus] = useState(checkStatusState);
    const [checkAll, setCheckAll] = useState(false);
    const [quantity, setQuantity] = useState(quantityState);
    const [open, setOpen] = useState(false);
    const [removeProduct, setRemoveProduct] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

    if (removeProduct) {
        console.log("da xoa san pham");
    }

    const hanleClickCheckBoxItem = (e) => {
        setCheckStatus({ ...checkStatus, [e.target.name]: e.target.checked });
    }

    const handleClickCheckAll = (e) => {
        if (e.target.checked) {
            setCheckStatus(Array(rows.length).fill(true));
        } else {
            setCheckStatus(checkStatusState);
        }
        setCheckAll(e.target.checked);
    }

    return (
        <>
            <AlertDialog
                dialogStatus={open}
                setDialogStatus={setOpen}
                setRemove={setRemoveProduct}
                content={dialogContent}
            />
            <Container maxWidth="lg">
                <div className={classes.root}>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <BreadcrumbsCustom />
                            </Paper>
                        </Grid>

                        <Grid item xs={9} >
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}><Typography variant="h4">Giỏ hàng của bạn</Typography></Grid>
                                            <Grid item xs={12}>
                                                <TableContainer>
                                                    <Table className={classes.table} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell align="left" padding="none">
                                                                    <Checkbox
                                                                        onClick={handleClickCheckAll}
                                                                        checked={checkAll}
                                                                    />Tất cả
                                                                </TableCell>
                                                                <TableCell>Sản phẩm</TableCell>
                                                                <TableCell align="right"></TableCell>
                                                                <TableCell align="right"></TableCell>
                                                                <TableCell align="center" padding="none">Số lượng</TableCell>
                                                                <TableCell align="right"></TableCell>
                                                                <TableCell align="right">Giá</TableCell>
                                                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                                                <TableCell align="center"></TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {rows.map((row, i) => (
                                                                <TableRowCustom
                                                                    row={row}
                                                                    onClickCheckBoxItem={hanleClickCheckBoxItem}
                                                                    checked={checkStatus[i]}
                                                                    quantity={quantity[i]}
                                                                    onChange={setQuantity}
                                                                    onOpenDialog={setOpen}
                                                                    onRemove={removeProduct}
                                                                    //setRemove={setRemoveProduct}
                                                                    onAddDialogContent={setDialogContent}
                                                                />
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>

                                            <Grid item xs={12} container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Button variant="contained">Tiếp tục mua hàng</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" className={classes.checkoutBtn}>Thanh toán</Button>
                                                </Grid>
                                            </Grid>

                                        </Grid>

                                    </Paper>
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid container item xs={3} direction="column">
                            <Grid item xs={12} >
                                <Paper className={[classes.paper, classes.sticky].join(" ")}>
                                    <Typography variant="h6" style={{ textAlign: "center" }}>Đơn hàng hiện tại</Typography>
                                    <Divider />
                                    <TableContainer>
                                        <Table className={classes.table} aria-label="simple table">
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
                                                    <TableCell align="right">20.000.000</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    )
}