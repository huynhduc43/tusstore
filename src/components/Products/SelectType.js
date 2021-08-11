import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Grid } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        backgroundColor: "#4fbfa8",
        '&:hover': {
            backgroundColor: "#03A685",
        },
        '&:active': {
            backgroundColor: "#01755D",
        }
    }
}));

export default function CheckboxLabels() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <form>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                    label="Có hoa"
                />
                <FormControlLabel
                    control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
                    label="Không có hoa"
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
