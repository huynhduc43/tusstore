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
  const [pathname] = React.useState(path)

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
          <Grid item md={12} sm={6} xs={12} >
            <Typography variant="h6" color="textPrimary">Lo???i c??y</Typography>
            <Divider />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={type.flower} onChange={handleChangeType} name="flower" />}
                label="C?? hoa"
              />
              <FormControlLabel
                control={<Checkbox checked={type.nonflower} onChange={handleChangeType} name="nonflower" />}
                label="Kh??ng c?? hoa"
              />
            </FormGroup>
          </Grid>
          <Grid item md={12} sm={6} xs={12}>
            <Typography variant="h6" color="textPrimary">M??u s???c</Typography>
            <Divider />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={color.colorful} onChange={handleChangeColor} name="colorful" />}
                label="Nhi???u m??u"
              />
              <FormControlLabel
                control={<Checkbox checked={color.greenPlant} onChange={handleChangeColor} name="greenPlant" />}
                label="Xanh l??"
              />
              <FormControlLabel
                control={<Checkbox checked={color.yellowPlant} onChange={handleChangeColor} name="yellowPlant" />}
                label="V??ng"
              />
              <FormControlLabel
                control={<Checkbox checked={color.purplePlant} onChange={handleChangeColor} name="purplePlant" />}
                label="T??m"
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
                onClick={() => handleReset}
              >
                X??a
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
                L???c
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
