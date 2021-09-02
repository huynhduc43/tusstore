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

import {useHistory, useLocation} from 'react-router';

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
   
    //const [pathname] = React.useState(props.pathname);
    const history = useHistory();
    const location = useLocation();

    const handleReset = React.useCallback(() => {
        props.setType({
            flower: props.type.flower,
            nonflower: props.type.nonflower,
        });

        props.setColor({
            greenPlant: props.color.greenPlant,
            yellowPlant: props.color.yellowPlant,
        });

        //history.replace(`?sort=${props.sort}`);
        props.onHandleFilter('');
    }, [props]);

    const handleChangeType = (event) => {
        props.setType({ ...props.type, [event.target.name]: event.target.checked });
    };

    const handleChangeColor = (event) => {
        props.setColor({ ...props.color, [event.target.name]: event.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let filter = `${props.type.flower ? 'type=flower&' : ''}${props.type.nonflower ? 'type=non-flower&' : ''}${props.color.greenPlant ? 'color=green&' : ''}${props.color.yellowPlant ? 'color=yellow&' : ''}`;
        filter = filter.slice(0, filter.length - 1);
        history.replace(`?sort=${props.sort}${filter ? `&${filter}` : ''}`);
        props.onHandleFilter(filter);
    }

    useEffect(() => {
        if (location.pathname !== props.pathname){
            handleReset();
        }
        //console.log(location.pathname + ' - ' + props.pathname);
    }, [location.pathname, props.pathname, handleReset]);

    useEffect(() => {
        if (props.filterParent === '') {
            history.replace(`?sort=${props.sort}`);
        }
    }, [props.filterParent, history, props.sort])

    return (
        <>
            <form>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item md={12} sm={6} xs={12} >
                        <Typography variant="h6" color="textPrimary">Loại cây</Typography>
                        <Divider />
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={props.type.flower} onChange={handleChangeType} name="flower" />}
                                label="Có hoa"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={props.type.nonflower} onChange={handleChangeType} name="nonflower" />}
                                label="Không có hoa"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item md={12} sm={6} xs={12}>
                        <Typography variant="h6" color="textPrimary">Màu sắc</Typography>
                        <Divider />
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={props.color.greenPlant} onChange={handleChangeColor} name="greenPlant" />}
                                label="Xanh lá"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={props.color.yellowPlant} onChange={handleChangeColor} name="yellowPlant" />}
                                label="Vàng"
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
