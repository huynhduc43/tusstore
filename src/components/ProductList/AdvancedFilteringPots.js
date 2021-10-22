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

export default function SelectType({path, onHandleFilter}) {
  const classes = useStyles();
  const [color, setColor] = React.useState({
    whitePot: false,
    colorPot: false,
  });
  const [pathname] = React.useState(path)

  const history = useHistory();

  const handleReset = () => {
    setColor({
      whitePot: false,
      colorPot: false,
    });
  }

  const handleChangeColor = (event) => {
    setColor({ ...color, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let filter = `${color.whitePot ? 'color=green&' : ''}${color.colorPot ? 'color=yellow&' : ''}`;
    filter = filter.slice(0, filter.length - 1);
    history.replace(`?` + filter);
    onHandleFilter(filter);
  }

  useEffect(() => {
    if (pathname !== path) {
      handleReset();
    }
  }, [pathname, path]);

  return (
    <>
      <form>
        <Grid container spacing={3} justifyContent="center">
          <Grid item md={12} sm={6} xs={12}>
            <Typography variant="h6" color="textPrimary">Màu sắc</Typography>
            <Divider />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={color.whitePot} onChange={handleChangeColor} name="whitePot" />}
                label="Chậu trắng"
              />
              <FormControlLabel
                control={<Checkbox checked={color.colorPot} onChange={handleChangeColor} name="colorPot" />}
                label="Chậu màu"
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
