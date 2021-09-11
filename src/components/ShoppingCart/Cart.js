import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';

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

import { useSnackbar } from 'notistack';

//My components
import BreadcrumbsCustom from '../BreadcrumbsCustom';
import TableRowCustom from "./TableRowCustom";
import Constants from "../Constants";
import AlertDialog from "./AlertDialog";
import CurrentOrder from './CurrentOrder';
import TableResponsive from "./TableResponsive";
import { CartState } from "../../context/Context";
import useAuth from "../../context/AuthContext";

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

export default function ListOfProducts(props) {
    const classes = useStyles();
    const {
        state: { cart },
        dispatch
    } = CartState();
    let checkStatusState = Array(cart.length).fill(false);
    let quantityState = [];

    cart.forEach(element => {
        quantityState.push(element.qty);
    });

    const [checkStatus, setCheckStatus] = useState(checkStatusState);
    const [count, setCount] = useState(0);
    const [checkAll, setCheckAll] = useState(false);
    const [quantity, setQuantity] = useState(quantityState);
    const [open, setOpen] = useState(false);
    const [removeProduct, setRemoveProduct] = useState(false);
    const [index, setIndex] = useState(-1);//Vi tri phan tu can xoa trong checkStatus
    const [productId, setProductId] = useState('');
    const [dialogContent, setDialogContent] = useState('');
    const [openCurrentOrder, setOpenCurrentOrder] = React.useState(false);
    const theme = useTheme();
    const isDownSM = useMediaQuery(theme.breakpoints.down("sm"));
    const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));
    const { enqueueSnackbar } = useSnackbar();
    const auth = useAuth();

    const hanleClickCheckBoxItem = (e) => {
        setCheckStatus([...checkStatus.slice(0, parseInt(e.target.name)), e.target.checked, ...checkStatus.slice(parseInt(e.target.name) + 1)]);
    }

    const handleClickCheckAll = (e) => {
        if (e.target.checked) {
            setCheckStatus(Array(cart.length).fill(true));
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

    const handleDeleteProduct = (content, productId, index) => {
        setProductId(productId);
        setDialogContent(content);
        setIndex(index);
        setOpen(true);
    }

    const handleClickCheckout = () => {
        setOpenCurrentOrder(false);

        if (!auth.user) {
            enqueueSnackbar('Bạn cần đăng nhập để tiếp tục', {
                variant: 'warning'
            });
        }
    }

    useEffect(() => {
        if (removeProduct) {
            dispatch({
                type: "REMOVE_PRODUCT",
                payload: { _id: productId }
            });

            if (index !== -1) {
                let tmp = [...checkStatus];
                tmp.splice(index, 1);
                setCheckStatus(tmp);
                setIndex(-1);
            }

            setRemoveProduct(false);
        }
    }, [removeProduct, productId, dispatch, checkStatus, index]);

    useEffect(() => {
        setCount(Object.values(checkStatus).filter(element => element).length);
    }, [checkStatus, removeProduct]);

    useEffect(() => {
        //console.log("cart.length - count: " + cart.length + " - " + count);
        if (count === cart.length && cart.length !== 0) {
            setCheckAll(true);
        } else setCheckAll(false);
    }, [cart.length, count]);

    return (
        <>
            <AlertDialog
                dialogStatus={open}
                setDialogStatus={setOpen}
                setRemove={setRemoveProduct}
                content={dialogContent}
                checkAll={checkAll}
                onHandleCheckAll={setCheckAll}
            />
            <Dialog
                open={openCurrentOrder}
                onClose={handleClose}
                aria-labelledby="current-order-title"
                aria-describedby="current-order-description"
            >
                <DialogContent>
                    <CurrentOrder cart={cart} checkStatus={checkStatus} count={count} />
                    <br />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="secondary">
                        Đóng
                    </Button>
                    <Button
                        className={classes.checkoutBtn}
                        autoFocus
                        component={Link}
                        to="/checkout"
                        onClick={handleClickCheckout}
                    >
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
                            <Grid item xs={(isDownSM || cart.length === 0) ? 12 : 9} >
                                <Paper className={classes.paper}>
                                    <Grid container spacing={3} justifyContent="center">
                                        {cart.length === 0 ? (<>
                                            <Grid item xs={12}><Typography variant="h4">Giỏ hàng của bạn trống!</Typography></Grid>
                                            <Grid item>
                                                <img src="/empty-cart.png" alt="empty-cart.png" width="50%" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button variant="contained">Mua hàng ngay</Button>
                                            </Grid></>)
                                            : (<><Grid item xs={12}><Typography variant="h4">Giỏ hàng của bạn</Typography></Grid>
                                                <Grid item xs={12}>
                                                    <TableContainer>
                                                        <Table className={classes.table} aria-label="simple table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="left" padding="none" colSpan={2}>
                                                                        <Checkbox color="primary"
                                                                            onClick={handleClickCheckAll}
                                                                            checked={checkAll}
                                                                        />Tất cả
                                                                    </TableCell>
                                                                    <TableCell align="right"></TableCell>
                                                                    <TableCell align="center" colSpan={3}>Số lượng</TableCell>
                                                                    <TableCell align="right" style={{ paddingLeft: 50, paddingRight: 0, }}>Giá</TableCell>
                                                                    <TableCell align="center"></TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {cart.map((row, i) => (
                                                                    <TableRowCustom
                                                                        key={row._id}
                                                                        id={i}
                                                                        product={row}
                                                                        onClickCheckBoxItem={hanleClickCheckBoxItem}
                                                                        checked={checkStatus[i]}
                                                                        quantity={quantity[i]}
                                                                        onChange={setQuantity}
                                                                        onOpenDialog={setOpen}
                                                                        onRemove={removeProduct}
                                                                        onAddDialogContent={setDialogContent}
                                                                        onAddProductId={setProductId}
                                                                        onDeleteProduct={handleDeleteProduct}
                                                                        onSetIndex={setIndex}
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
                                                                <Button
                                                                    variant="contained"
                                                                    className={classes.checkoutBtn}
                                                                    component={Link}
                                                                    to="/checkout"
                                                                    onClick={handleClickCheckout}
                                                                >
                                                                    Thanh toán
                                                                </Button>
                                                            </Grid>
                                                        </Grid>)
                                                        : (
                                                            <Grid item>
                                                                <Button
                                                                    variant="contained"
                                                                    className={classes.checkoutBtn}
                                                                    component={Link}
                                                                    to="/checkout"
                                                                    onClick={handleClickCheckout}
                                                                >
                                                                    Thanh toán
                                                                </Button>
                                                            </Grid>
                                                        )
                                                    }
                                                </Grid></>
                                            )}
                                    </Grid>
                                </Paper>
                            </Grid>

                        )
                            : <TableResponsive
                                product={cart}
                                onChangeQuantity={setQuantity}
                                onClickCheckBoxItem={hanleClickCheckBoxItem}
                                checked={checkStatus}
                                onRemove={removeProduct}
                                onClickCheckAll={handleClickCheckAll}
                                checkedAll={checkAll}
                                onHandleClickOpen={handleClickOpen}
                                onhandleClose={handleClose}
                                onOpenDialog={setOpen}
                                onAddDialogContent={setDialogContent}
                                onAddProductId={setProductId}
                                onDeleteProduct={handleDeleteProduct}
                                onSetIndex={setIndex}
                                onClickCheckout={handleClickCheckout}
                            />}
                        {(!isDownSM && cart.length > 0) &&
                            <Grid container item xs={3}>
                                <Grid item xs={12} >
                                    <Paper className={[classes.paper, classes.sticky].join(" ")}>
                                        <CurrentOrder cart={cart} checkStatus={checkStatus} count={count} />
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