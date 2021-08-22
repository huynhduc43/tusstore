import React, { useState } from 'react';

import { Button, Divider, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
    },
    divider: {
        margin: "10px 0",
    }
}))


export default function ChangePassword() {
    const classes = useStyles();
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [repeatNewPass, setRepeatNewPass] = useState("");

    console.log(currentPass, newPass, repeatNewPass);//to avoid warning and run on mobile

    const handleChangeCurrentPass = (e) => {
        setCurrentPass(e.target.value);
    }

    const handleChangeNewPass = (e) => {
        setNewPass(e.target.value);
    }

    const handleChangeRepeatNewPass = (e) => {
        setRepeatNewPass(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Paper className={classes.paper}>
            <Typography variant="h6">Đổi mật khẩu</Typography>
            <Divider className={classes.divider}/>
            <Grid container justifyContent="center">
                <Grid item sm={4} xs={10}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu cũ"
                            type="password"
                            id="current-password"
                            autoComplete="current-password"
                            size="small"
                            onChange={handleChangeCurrentPass}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="new-password"
                            label="Mật khẩu mới"
                            type="password"
                            id="new-password"
                            autoComplete="new-password"
                            size="small"
                            onChange={handleChangeNewPass}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="repeat-new-password"
                            label="Nhập lại mật khẩu mới"
                            type="password"
                            id="repeat-new-password"
                            autoComplete="new-password"
                            size="small"
                            onChange={handleChangeRepeatNewPass}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Xác nhận
                        </Button>
                    </form>

                </Grid>
            </Grid>
        </Paper>
    )
}