import React, { useState } from "react";

import { Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Checkbox } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

//My components
import BreadcrumbsCustom from '../BreadcrumbsCustom';
import TableRowCustom from "./TableRowCustom";
import Constants from "../Constants";
import AlertDialog from "./AlertDialog";
import CurrentOrder from './CurrentOrder';
import TableResponsive from "./TableResponsive";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    checkoutBtn: Constants.BUTTON_CONTAINED,
    outlinedBtn: {
        ...Constants.BUTTON_OUTLINED,
        marginRight: 8,
    },
    sticky: {
        position: "sticky",
        top: 24,
    },
}));

function createData(id, url, name, quantity, price) {
    return { id, url, name, quantity, price };
}

const rows = [
    createData("0", "https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg", 'Frozen yoghurt Frozen yoghurt Frozen yoghurt', 1, 6.0),
    createData("1", "https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg", 'Ice cream sandwich', 2, 9.0),
    createData("2", "https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg", 'Eclair', 2, 16.0),
    createData("3", "https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg", 'Cupcake', 3, 37),
    createData("4", "https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg", 'Gingerbread', 3, 16.0),
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
    const [openCurrentOrder, setOpenCurrentOrder] = React.useState(false);
    const theme = useTheme();
    const isDownSM = useMediaQuery(theme.breakpoints.down("sm"));
    const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));

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

    const handleClickOpen = () => {
        setOpenCurrentOrder(true);
    };

    const handleClose = () => {
        setOpenCurrentOrder(false);
    };

    return (
        <>
            <AlertDialog
                dialogStatus={open}
                setDialogStatus={setOpen}
                setRemove={setRemoveProduct}
                content={dialogContent}
            />
            <Dialog
                open={openCurrentOrder}
                onClose={handleClose}
                aria-labelledby="current-order-title"
                aria-describedby="current-order-description"
            >
                <DialogContent>
                    <CurrentOrder />
                    <br />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="secondary">
                        Đóng
                    </Button>
                    <Button onClick={handleClose} className={classes.checkoutBtn} autoFocus>
                        Thanh toán
                    </Button>
                </DialogActions>
            </Dialog>
            <Container maxWidth="lg">
                <div className={classes.root}>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <BreadcrumbsCustom />
                            </Paper>
                        </Grid>

                        {!isDownXS ? (
                            <Grid item xs={isDownSM ? 12 : 9} >
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
                                                                    <TableCell align="right" style={{ paddingLeft: 50, paddingRight: 0, }}>Giá</TableCell>
                                                                    <TableCell align="center"></TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {rows.map((row, i) => (
                                                                    <TableRowCustom
                                                                        key={row.id}
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
                                                    <Grid container item xs={5}>
                                                        <Button variant="contained">Tiếp tục mua</Button>
                                                    </Grid>
                                                    {isDownSM ?
                                                        (<Grid container item xs={7} justifyContent="flex-end">
                                                            <Grid item>
                                                                <Button variant="outlined" className={classes.outlinedBtn} onClick={handleClickOpen}>Xem đơn hàng</Button>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button variant="contained" className={classes.checkoutBtn}>Thanh toán</Button>
                                                            </Grid>
                                                        </Grid>)
                                                        : (
                                                            <Grid item>
                                                                <Button variant="contained" className={classes.checkoutBtn}>Thanh toán</Button>
                                                            </Grid>
                                                        )
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>

                        )
                            : <TableResponsive
                                data={rows}
                                onChangeQuantity={setQuantity}
                                onClickCheckBoxItem={hanleClickCheckBoxItem}
                                checked={checkStatus}
                                onRemove={removeProduct}
                                onClickCheckAll={handleClickCheckAll}
                                checkedAll={checkAll}
                                onHandleClickOpen={handleClickOpen}
                                onhandleClose={handleClose}
                            />}
                        {!isDownSM &&
                            <Grid container item xs={3}>
                                <Grid item xs={12} >
                                    <Paper className={[classes.paper, classes.sticky].join(" ")}>
                                        <CurrentOrder />
                                    </Paper>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </div>
            </Container>
        </>
    )
}