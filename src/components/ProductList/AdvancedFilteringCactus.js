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

import { useHistory, useLocation } from 'react-router';

//My components
import Constants from "../Constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: Constants.BUTTON_CONTAINED
}));

export default function AdvancedFilteringCactus({
  type, color, path, sort, filterParent,
  setType,
  setColor,
  onHandleFilter,
}) {
  const classes = useStyles();

  //const [pathname] = React.useState(pathname);
  const history = useHistory();
  const location = useLocation();

  const handleChangeType = (event) => {
    setType({ ...type, [event.target.name]: event.target.checked });
  };

  const handleChangeColor = (event) => {
    setColor({ ...color, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let filter = `${type.flower ? 'type=flower&' : ''}${type.nonflower ? 'type=non-flower&' : ''}${color.greenPlant ? 'color=green&' : ''}${color.yellowPlant ? 'color=yellow&' : ''}`;
    filter = filter.slice(0, filter.length - 1);
    history.replace(`?sort=${sort}${filter ? `&${filter}` : ''}`);
    onHandleFilter(filter);
  }

  useEffect(() => {
    if (location.pathname !== path) {
      handleReset(type, color, setType, setColor, onHandleFilter);
    }
    //console.log(location.pathname + ' - ' + pathname);

    // eslint-disable-next-line
  }, [location.pathname, path]);

  useEffect(() => {
    if (filterParent === '') {
      history.replace(`?sort=${sort}`);
    }
    // eslint-disable-next-line
  }, [filterParent]);

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
                onClick={() => handleReset}
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

const handleReset = (type, color, setType, setColor, onHandleFilter) => {
  setType({
    flower: type.flower,
    nonflower: type.nonflower,
  });

  setColor({
    greenPlant: color.greenPlant,
    yellowPlant: color.yellowPlant,
  });

  //history.replace(`?sort=${sort}`);
  onHandleFilter('');
};
