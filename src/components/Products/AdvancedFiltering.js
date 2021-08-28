import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import { Divider } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';

//My components
import Constants from "../Constants";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: Constants.BUTTON_CONTAINED
}));

export default function SelectType() {
    const classes = useStyles();
    const [type, setType] = React.useState({
        flower: false,
        nonflower: false,
    });

    const [color, setColor] = React.useState({
        greenPlant: false,
        yellowPlant: false,
        redPlant: false,
    });

    const handleReset = () => {
        setType({
            flower: false,
            nonflower: false,
        });

        setColor({
            greenPlant: false,
            yellowPlant: false,
            redPlant: false,
        });
    }

    const handleChangeType = (event) => {
        setType({ ...type, [event.target.name]: event.target.checked });
    };

    const handleChangeColor = (event) => {
        setColor({ ...color, [event.target.name]: event.target.checked });
    };

    return (
        <>
            <form>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item md={12} sm={6} xs={12} >
                        <Typography variant="h6" color="textPrimary">Loại cây</Typography>
                        <Divider />
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={type.flower} onChange={handleChangeType} name="flower" />}
                                label="Có hoa"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={type.nonflower} onChange={handleChangeType} name="nonflower" />}
                                label="Không có hoa"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item md={12} sm={6} xs={12}>
                        <Typography variant="h6" color="textPrimary">Màu sắc</Typography>
                        <Divider />
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={color.greenPlant} onChange={handleChangeColor} name="greenPlant" />}
                                label="Xanh lá"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={color.yellowPlant} onChange={handleChangeColor} name="yellowPlant" />}
                                label="Vàng"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={color.redPlant} onChange={handleChangeColor} name="redPlant" />}
                                label="Đỏ"
                            />
                        </FormGroup>
                        <br />
                    </Grid>
                    <Grid container item xs={12} spacing={3} justifyContent="center">
                    <Grid item md={6} sm={3} xs={6}>
                            <Button
                                variant="contained"
                                startIcon={<HighlightOffIcon />}
                                color="secondary"
                                fullWidth
                                onClick={handleReset}
                            >
                                Xóa
                            </Button>
                        </Grid>
                        <Grid item md={6} sm={3} xs={6}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                startIcon={<FilterListOutlinedIcon />}
                                className={classes.button}
                            >
                                Lọc
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
