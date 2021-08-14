import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Grid } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from "@material-ui/core";

//My components
import Constants from "../Constants";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: Constants.BUTTON_CONTAINED
}));

export default function SelectColor() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        greenPlant: true,
        yellowPlant: true,
        redPlant: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <form>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={state.greenPlant} onChange={handleChange} name="greenPlant" />}
                    label="Xanh lá"
                />
                <FormControlLabel
                    control={<Checkbox checked={state.yellowPlant} onChange={handleChange} name="yellowPlant" />}
                    label="Vàng"
                />
                <FormControlLabel
                    control={<Checkbox checked={state.redPlant} onChange={handleChange} name="redPlant" />}
                    label="Đỏ"
                />
            </FormGroup>
            <Grid container spacing={1} justifyContent="space-evenly">
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<DoneIcon />}
                        className={classes.button}
                        
                    >
                        Áp dụng
                    </Button>
                </Grid>
                {/* <Grid item xs={6}>
                    <Button
                        variant="contained"
                        startIcon={<HighlightOffIcon />}
                        color="secondary"
                        style={{
                            width: '100%',
                            fontSize: 13,
                        }}
                    >
                        Xóa
                    </Button>
                </Grid> */}
            </Grid>


        </form>
    );
}
