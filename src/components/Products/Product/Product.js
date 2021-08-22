import React from 'react';

import { 
    Link,
} from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { Grid, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';

//My component
import Constants from '../../Constants.js'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    viewBtn: {
        
    },
    addToCartBtn: Constants.BUTTON_CONTAINED,
}));

export default function Product(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const handleClickAddToCartBtn = () => {
        enqueueSnackbar('Đã thêm vào giỏ hàng!', {
            variant: 'success'
        });
    };

    return (
        <Grid item sm={4} xs={6}>
            <Paper className={classes.paper}>
                <Grid container spacing={1} justifyContent="space-evenly">
                    <Grid item xs={12}>
                        <img src="https://d19m59y37dris4.cloudfront.net/obaju/2-1-1/img/product1_2.jpg"
                            style={{
                                width: '100%',
                            }}
                            alt="product"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <b>{props.productName}</b>
                    </Grid>
                    <Grid item xs={12}>
                        <p>Giá san pham</p>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Button
                            variant="contained"
                            fullWidth
                            className={classes.viewBtn}
                            startIcon={<VisibilityIcon />}
                            style={{ width: '100%' }}
                            component={Link}
                            to={`${props.link}`}
                        >
                            Xem
                        </Button>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Button
                            variant="contained"
                            fullWidth
                            className={classes.addToCartBtn}
                            startIcon={<AddShoppingCartIcon />}
                            style={{ width: '100%' }}
                            onClick={handleClickAddToCartBtn}
                        >
                            Thêm
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}