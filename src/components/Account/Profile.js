import React from 'react';

import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

//My components
import Constants from '../Constants';
import ChangeAvatar from './ChangeAvatar';

const useStyles = makeStyles(theme => ({
    root: {...Constants.RADIO_GROUP,
        padding: theme.spacing(2),
        textAlign: "center",
    },
    divider: {
        margin: "10px 0",
    },
    title: {
        textAlign: "right",
        paddingRight: 8,
    },
    textfield: {
        padding: 8,
    },
    input: {

    },
    saveBtn: {
        margin: 8,
    },
}))


export default function Profile() {
    const classes = useStyles();
    const [gender, setGender] = React.useState('female');
    const [selectedDate, setSelectedDate] = React.useState();
    const theme = useTheme();
    const isDownXS = useMediaQuery(theme.breakpoints.down("xs"));


    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Paper className={classes.root}>
            <Typography variant="h6">Thông tin tài khoản</Typography>
            <Divider className={classes.divider} />

            <Grid container direction="row-reverse" alignItems="flex-start">
                {isDownXS &&
                    <Grid container item sm={4} xs={12} alignItems="flex-start" justifyContent="center"
                        style={{paddingBottom: 20}}
                    >
                        <ChangeAvatar />
                    </Grid>
                }
                <Grid container item sm={8} xs={12} alignItems="center" >
                    <Grid item xs={3} className={classes.title}>
                        Tên đăng nhập
                    </Grid>
                    <Grid item xs={9} className={classes.textfield}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            type="text"
                            id="username"
                            autoComplete="username"
                            size="small"
                            className={classes.input}
                        />
                    </Grid>

                    <Grid item xs={3} className={classes.title}>
                        Tên
                    </Grid>
                    <Grid item xs={9} className={classes.textfield}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            type="password"
                            id="name"
                            autoComplete="name"
                            size="small"
                        />
                    </Grid>

                    <Grid container alignItems="center">
                        <Grid item xs={3} className={classes.title}>
                            Số điện thoại
                        </Grid>
                        <Grid item sm={5} xs={9} className={classes.textfield}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                type="text"
                                id="phone"
                                autoComplete="phone"
                                size="small"
                            />
                        </Grid>
                    </Grid>


                    <Grid item xs={3} className={classes.title}>
                        Giới tính
                    </Grid>
                    <Grid item xs={9} container justifyContent="flex-start" className={classes.textfield}>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="gender" name="gender1" value={gender} onChange={handleChange}>
                                <FormControlLabel value="female" control={<Radio classes={classes.radio} />} label="Nữ" />
                                <FormControlLabel value="male" control={<Radio classes={classes.radio} />} label="Nam" />
                                <FormControlLabel value="other" control={<Radio classes={classes.radio} />} label="Khác" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3} className={classes.title}>
                        Ngày sinh
                    </Grid>
                    <Grid item xs={9} container justifyContent="flex-start" style={{ padding: 12 }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                id="date-picker-inline"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item xs={3}>
                    </Grid>

                    <Grid item xs={9} container justifyContent="flex-start" alignItems="center">
                        <Button variant="contained" color="primary" className={classes.saveBtn}>Lưu thay đổi</Button>
                    </Grid>
                </Grid>
                {!isDownXS &&
                    <Grid container item sm={4} xs={12} justifyContent="center">
                        <ChangeAvatar />
                    </Grid>
                }
            </Grid>
        </Paper>
    )
}