import React from 'react';

import { Link, TableBody, ThemeProvider, Typography } from '@material-ui/core';
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
        width: 60,
        height: 80,
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
}))

export default function TableResponsive(props) {
    const classes = useStyles();

    const handleClickIncreaseBtn = () => {
        props.onChangeQuantity(prevState => {
            return { ...prevState, [props.data.id]: prevState[props.data.id] + 1 }
        })
    }

    const handleClickDecreaseBtn = () => {
        props.onChangeQuantity(prevState => {
            if (prevState[props.data.id] <= 1) {
                props.onOpenDialog(true);
                props.onAddDialogContent(props.data.name);
                return prevState;
            } else {
                return { ...prevState, [props.data.id]: prevState[props.data.id] - 1 }
            }
        })
    }

    return (<>
        <Grid item xs={12}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h5">Giỏ hàng của bạn</Typography>
                                </Grid>
                                <Grid item>
                                    Tất cả
                                    <Checkbox color="primary"
                                        checked={props.checkedAll}
                                        onClick={props.onClickCheckAll}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <TableContainer>
                                    <Table>
                                        {props.data.map((product, i) => {
                                            return (
                                                <TableBody key={product.id}>
                                                    <TableRow style={{ borderTop: "10px solid #4fbfa8" }}>
                                                        <TableCell>Sản phẩm</TableCell>
                                                        <TableCell>
                                                            <img src={product.url}
                                                                alt={product.name}
                                                                className={classes.img}
                                                            />
                                                        </TableCell>
                                                        <TableCell rowSpan={2} padding="none"
                                                            style={{
                                                                borderLeft: "1px solid #EAECEE",
                                                                paddingLeft: 8,
                                                            }}
                                                        >
                                                            <Checkbox color="primary"

                                                                name={product.id}
                                                                checked={props.checked[i]}
                                                                onClick={props.onClickCheckBoxItem}
                                                            />
                                                        </TableCell>

                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Tên sản phẩm</TableCell>
                                                        <TableCell>
                                                            <Link className={classes.name} to={`/${product.id}`}>{product.name}</Link>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Số lượng</TableCell>
                                                        <TableCell>
                                                            <IconButton color="secondary" className={classes.icon}
                                                                onClick={handleClickDecreaseBtn}
                                                            ><RemoveCircleIcon /></IconButton>
                                                            {product.quantity}
                                                            <IconButton color="primary"
                                                                onClick={handleClickIncreaseBtn}
                                                            ><AddCircleIcon color="primary" /></IconButton>
                                                        </TableCell>
                                                        <TableCell rowSpan={2} padding="none" style={{ borderLeft: "1px solid #EAECEE" }}>
                                                            <IconButton color="secondary">
                                                                <DeleteOutlinedIcon className={classes.delete} />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Giá</TableCell>
                                                        <TableCell>{product.price}</TableCell>
                                                    </TableRow>
                                                </TableBody>)
                                        })}
                                    </Table>
                                </TableContainer>
                            </Grid>

                            <ThemeProvider theme={theme}>
                                <Grid container spacing={2} justifyContent="center" style={{ paddingTop: 30 }}>
                                    <Grid item sm={6} xs={12}>
                                        <Button variant="contained" fullWidth>Tiếp tục mua</Button>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <Button variant="outlined" fullWidth className={classes.outlinedBtn} onClick={props.onHandleClickOpen}>Xem đơn hàng</Button>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <Button variant="contained" fullWidth className={classes.checkoutBtn}>Thanh toán</Button>
                                    </Grid>
                                </Grid>
                            </ThemeProvider>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    </>)
}