import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

//My components
import Constants from '../Constants';
import { PhotoCamera } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    avatar: {
        borderRadius: "50%",
        width: "80%",
        height: "auto",
        padding: 8,
    },
    changeAvtBtn: {
        ...Constants.BUTTON_CONTAINED,
    },
    input: {
        display: 'none',
    },
}))

export default function AlertDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid item sm={12} xs={6}>
                <img alt="avatar" src="https://picsum.photos/200" className={classes.avatar} />
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Button
                        className={classes.changeAvtBtn}
                        size="medium"
                        onClick={handleClickOpen}
                    >
                        Đổi ảnh
                    </Button>
                </Grid>

            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Đổi ảnh đại diện"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Chọn 1 file ảnh từ thiết bị của bạn để làm ảnh đại diện
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Thay đổi
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
