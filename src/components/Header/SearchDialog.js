import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';

//My components
import Constants from "../Constants";

const useStyles = makeStyles(theme => ({
    searchBtn: Constants.BUTTON_CONTAINED,
}))

export default function SearchDialog(props) {
    const classes = useStyles();

    const handleClose = () => {
        props.onClickOpenSearch(false);
    };

    return (
        <div>
            <Dialog open={props.status} onClose={handleClose} aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle id="form-dialog-title">Tìm kiếm sản phẩm</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="keywords"
                        label="Từ khóa"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose} color="secondary">
                        Hủy
                    </Button>
                    <Button variant="contained" onClick={handleClose} color="primary" className={classes.searchBtn}>
                        Tìm kiếm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
