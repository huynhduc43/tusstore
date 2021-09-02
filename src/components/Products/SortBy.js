import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

import {
    useHistory,
} from 'react-router-dom';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    margin: {
        minWidth: 120,
    },
}));

export default function SortBy(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(props.sort);
    let history = useHistory();

    const handleChange = (event) => {
        setValue(event.target.value);
        props.onChangeSortValue(event.target.value);
        history.replace(`?sort=${event.target.value}${props.filter ? `&${props.filter}` : ''}`);
    };

    return (
        <FormControl className={classes.margin}>
            <Select
                size="small"
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={value}
                onChange={handleChange}
                input={<BootstrapInput />}
            >
                <MenuItem value="newest" >Mới nhất</MenuItem>
                <MenuItem value="most-viewed">Xem nhiều nhất</MenuItem>
                <MenuItem value="high-rated">Đánh giá cao nhất</MenuItem>
                <MenuItem value="asc-price" >Giá tăng dần</MenuItem>
                <MenuItem value="desc-price">Giá giảm dần</MenuItem>

            </Select>
        </FormControl>
    );
}
