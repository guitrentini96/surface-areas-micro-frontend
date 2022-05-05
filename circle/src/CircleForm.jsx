import { Button, Stack, TextField, Typography, Alert } from '@mui/material';
import React from 'react';

function CircleSurfacePage() {
  const [state, setState] = React.useState({
    diameter: '',
    area: '',
    isInvalid: true,
    errorMessage: 'Enter a valid diameter',
  });

  const handleDiameterInput = (event) => {
    // first, get the inputs value and test to see if it's a valid number
    const value = event.target.value;
    const isNumber = /^\d*\.?\d*$/.test(value);
    // just procceed if the value is a valid number with no more than 4 algarisms or if the user deleted the value(value==='')
    if ((isNumber || value === '') && value.length <= 4) {
      // first check if the bigget is 0:
      const valid = /.*[1-9].*/.test(value);
      // if the value is 0, keep the error message
      if (valid) {
        const radius = value / 2;
        const area = 3.14 * Math.pow(radius, 2);
        setState({
          ...state,
          diameter: value,
          isInvalid: !valid,
          area: area,
        });
      } else {
        setState({
          ...state,
          diameter: value,
          isInvalid: !valid,
        });
      }
    }
  };

  const renderTextFields = () => {
    return (
      <TextField
        size="small"
        label={'Diameter'}
        variant="outlined"
        value={state.diameter}
        onChange={handleDiameterInput}
      />
    );
  };

  const resetValues = () => {
    setState({
      diameter: '',
      area: '',
      isInvalid: true,
      errorMessage: 'Enter a valid diameter',
    });
  };

  return (
    <Stack
      sx={{
        alignItems: 'center',
        height: '100%',
        position: 'relative',
      }}
    >
      <Typography variant="h4">Circle Surface</Typography>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Circle_-_black_simple.svg/800px-Circle_-_black_simple.svg.png"
        alt="circle"
        width="80%"
      ></img>
      <Typography sx={{ position: 'absolute', top: '100px', left: '250px' }}>
        {state.diameter}
      </Typography>
      <Stack
        sx={{ height: '40%', width: '80%', justifyContent: 'space-around' }}
      >
        {renderTextFields()}
        {/* <Button variant="contained" disabled={state.isInvalid}>
          {state.isInvalid ? state.errorMessage : 'submit'}
        </Button> */}
        <Alert
          variant="outlined"
          severity={state.isInvalid ? 'error' : 'success'}
          action={
            <Button color="inherit" size="small" onClick={resetValues}>
              RESET
            </Button>
          }
        >
          {state.isInvalid ? state.errorMessage : `Area: ${state.area}`}
        </Alert>
      </Stack>
    </Stack>
  );
}

export default CircleSurfacePage;
