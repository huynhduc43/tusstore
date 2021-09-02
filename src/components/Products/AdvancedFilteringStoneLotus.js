import React, { useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import { Divider } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';

import { useHistory } from 'react-router';

//My components
import Constants from "../Constants";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: Constants.BUTTON_CONTAINED
}));

export default function SelectType(props) {
    const classes = useStyles();
    const [type, setType] = React.useState({
        flower: false,
        nonflower: false,
    });
    const [color, setColor] = React.useState({
        colorful: false,
        greenPlant: false,
        yellowPlant: false,
        purplePlant: false,
        orangePlant: false,
        bluePlant: false,
    });
    const [pathname] = React.useState(props.pathname)

    const history = useHistory();

    const handleReset = () => {
        setType({
            flower: false,
            nonflower: false,
        });

        setColor({
            colorful: false,
            greenPlant: false,
            yellowPlant: false,
            purplePlant: false,
            orangePlant: false,
            bluePlant: false,
        });
    }

    const handleChangeType = (event) => {
        setType({ ...type, [event.target.name]: event.target.checked });
    };


    const handleChangeColor = (event) => {
        setColor({ ...color, [event.target.name]: event.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let filter = `${color.greenPlant ? 'color=green&' : ''}${color.yellowPlant ? 'color=yellow&' : ''}`;
        filter = filter.slice(0, filter.length - 1);
        history.replace(`?` + filter);
        props.onHandleFilter(filter);
    }

    useEffect(() => {
        if (pathname !== props.pathname) {
            handleReset();
        }
    }, [pathname, props.pathname]);

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
                                control={<Checkbox checked={color.colorful} onChange={handleChangeColor} name="colorful" />}
                                label="Nhiều màu"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={color.greenPlant} onChange={handleChangeColor} name="greenPlant" />}
                                label="Xanh lá"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={color.yellowPlant} onChange={handleChangeColor} name="yellowPlant" />}
                                label="Vàng"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={color.purplePlant} onChange={handleChangeColor} name="purplePlant" />}
                                label="Tím"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={color.orangePlant} onChange={handleChangeColor} name="orangePlant" />}
                                label="Cam"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={color.bluePlant} onChange={handleChangeColor} name="bluePlant" />}
                                label="Xanh lam"
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
                                onClick={handleSubmit}
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
