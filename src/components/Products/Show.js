import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Constants from '../Constants';

const useStyles = makeStyles((theme) => ({
    btnGroup: Constants.BUTTON_OUTLINED,
    active: Constants.BUTTON_CONTAINED,
    root: Constants.RADIO_GROUP,
}));

export default function Show(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(props.perPage);

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onChangePerPage(event.target.value);

    
  };

  //console.log("show: " + value);

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">Số sản phẩm mỗi trang</FormLabel>
      <RadioGroup row aria-label="show" name="show" value={value} onChange={handleChange}>
        <FormControlLabel value="12" control={<Radio />} label="12" />
        <FormControlLabel value="24" control={<Radio />} label="24" />
        <FormControlLabel value="All" control={<Radio />} label="All" />
      </RadioGroup>
    </FormControl>
  );
}
