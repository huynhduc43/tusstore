import React from 'react';

import { Link } from 'react-router-dom';

import { TableBody, ThemeProvider, Typography } from '@material-ui/core';
import { TableCell, TableContainer, TableRow, Table, Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Checkbox } from "@material-ui/core";
import { Button } from '@material-ui/core';
import { createTheme } from '@material-ui/core';

//My components
import Constants from '../Constants';
import { CartState } from "../../context/Context";

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 400,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
})

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

const TableBodyCustom = (props) => {
    const classes = useStyles();
    const {
        dispatch
    } = CartState();

    const handleClickIncreaseBtn = () => {
        props.onChangeQuantity(prevState => {
            return { ...prevState, [props.id]: prevState[props.id] + 1 }
        });

        dispatch({
            type: "INCREASE_QTY",
            payload: { _id: props.product._id },
        });
    }

    const handleClickDecreaseBtn = () => {
        props.onChangeQuantity(prevState => {
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
        <TableBody key={props.product._id}>
            <TableRow style={{ borderTop: "5px solid #4fbfa8" }}>
                <TableCell className={classes.cell}>Ảnh</TableCell>
                <TableCell className={classes.infoCell}>
                    <img src={props.product.primaryImg}
                        alt={props.product.name}
                        className={classes.img}
                    />
                </TableCell>
                <TableCell rowSpan={2} padding="none"
                    style={{
                        borderLeft: "1px solid #EAECEE",
                    }}
                >
                    <Checkbox color="primary"
                        name={String(props.id)}
                        checked={props.checked ? props.checked : false}
                        onClick={props.onClickCheckBoxItem}

                    />
                </TableCell>

            </TableRow>
            <TableRow>
                <TableCell className={classes.cell}>Sản phẩm</TableCell>
                <TableCell className={classes.infoCell}>
                    <Link className={classes.name} to={`/products/${props.product._id}`}>{props.product.name}</Link>
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
                    {props.product.qty}

                    <IconButton color="primary"
                        onClick={handleClickIncreaseBtn}
                    >
                        <AddCircleIcon color="primary" />
                    </IconButton>
                </TableCell>
                <TableCell rowSpan={2} padding="none" style={{ borderLeft: "1px solid #EAECEE" }}>
                    <IconButton color="secondary"
                        onClick={() => props.onDeleteProduct(props.product.name, props.product._id, props.id)}>
                        <DeleteOutlinedIcon
                            className={classes.delete}
                        />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={classes.cell}>Giá</TableCell>
                <TableCell className={classes.infoCell}>{props.product.price * props.product.qty}₫</TableCell>
            </TableRow>
        </TableBody>
    )
}

export default function TableResponsive(props) {
    const classes = useStyles();
    const {
        state: { cart },
    } = CartState();

    return (<>
        <Grid item xs={12}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <Grid container alignItems="center" justifyContent="flex-end">
                                {cart.length === 0 ? (
                                    <><Grid item xs={12}><Typography variant="h4">Giỏ hàng của bạn trống!</Typography></Grid>
                                        <Grid item>
                                            <img src="/empty-cart.png" alt="empty-cart.png" width="50%" />
                                        </Grid></>)
                                    : (<>
                                        <Grid item xs={12}>
                                            <Typography variant="h5">Giỏ hàng của bạn</Typography>
                                        </Grid>
                                    </>)}
                            </Grid>
                            {cart.length !== 0 && <Grid item xs={12}>
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell colSpan={2} align="right" style={{ padding: 0 }}>
                                                    Tất cả
                                                </TableCell>
                                                <TableCell style={{ padding: 0 }}>
                                                    <Checkbox color="primary"
                                                        checked={props.checkedAll ? props.checkedAll : false}
                                                        onClick={props.onClickCheckAll}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        {props.product.map((product, i) => (
                                            <TableBodyCustom
                                                key={product._id}
                                                product={product}
                                                id={i}
                                                checked={props.checked[i]}
                                                onClickCheckBoxItem={props.onClickCheckBoxItem}
                                                onRemove={props.onRemove}
                                                onClickCheckAll={props.onClickCheckAll}
                                                checkedAll={props.checkAll}
                                                onHandleClickOpen={props.onHandleClickOpen}
                                                onOpenDialog={props.onOpenDialog}
                                                onAddDialogContent={props.onAddDialogContent}
                                                onAddProductId={props.onAddProductId}
                                                onDeleteProduct={props.onDeleteProduct}
                                                onSetIndex={props.onSetIndex}
                                                onChangeQuantity={props.onChangeQuantity}
                                            />))}
                                    </Table>
                                </TableContainer>
                            </Grid>}

                            <ThemeProvider theme={theme}>
                                {cart.length === 0 ? (<Grid container spacing={2} justifyContent="center" style={{ paddingTop: 30 }}>
                                    <Grid item sm={6} xs={12}>
                                        <Button variant="contained" fullWidth>Tiếp tục mua</Button>
                                    </Grid>
                                </Grid>)
                                    : (<Grid container spacing={2} justifyContent="center" style={{ paddingTop: 30 }}>
                                        <Grid item sm={6} xs={12}>
                                            <Button variant="contained" fullWidth>Tiếp tục mua</Button>
                                        </Grid>
                                        <Grid item sm={6} xs={12}>
                                            <Button variant="outlined" fullWidth className={classes.outlinedBtn} onClick={props.onHandleClickOpen}>Xem đơn hàng</Button>
                                        </Grid>
                                        <Grid item sm={6} xs={12}>
                                            <Button variant="contained" fullWidth className={classes.checkoutBtn}>Thanh toán</Button>
                                        </Grid>
                                    </Grid>)}
                            </ThemeProvider>

                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    </>)
}