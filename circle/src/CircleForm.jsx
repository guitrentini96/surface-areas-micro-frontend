import {
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
  LoadingButton,
  FormControlLabel,
} from '@mui/material';
import React from 'react';
import axios from 'axios';

function CircleSurfacePage(props) {
  const [state, setState] = React.useState({
    diameter: '',
    area: 0,
    isInvalid: true,
    errorMessage: 'Invalid diameter',
    loading: false,
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
        setState({
          ...state,
          diameter: value,
          isInvalid: !valid,
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

  const renderTextField = () => {
    return (
      <TextField
        size="small"
        label={'Diameter'}
        variant="outlined"
        value={state.diameter}
        onChange={handleDiameterInput}
        disabled={state.loading || state.area > 0}
      />
    );
  };

  const resetValues = () => {
    setState({
      diameter: '',
      area: 0,
      isInvalid: true,
      errorMessage: 'Invalid diameter',
      loading: false,
    });
  };

  const handleSubmit = () => {
    console.log('creating variables');
    const diameter = parseFloat(state.diameter);
    const radius = diameter / 2;
    const area = 3.14 * radius * radius;
    let circleId = Math.floor(Math.random() * 100000000);

    const postDiameterAndArea = () => {
      console.log('posting it');
      axios.post(
        'https://oaedqcfxnfmlzqyvfwyc.supabase.co/rest/v1/circle',
        {
          id: circleId,
          diameter: diameter,
          area: area,
        },
        {
          headers: {
            apikey:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZWRxY2Z4bmZtbHpxeXZmd3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE3MTExODMsImV4cCI6MTk2NzI4NzE4M30.01hjAN5jecCRn0VG2NfqIuBmKK7Mak8xN7SKsRs48NY',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZWRxY2Z4bmZtbHpxeXZmd3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE3MTExODMsImV4cCI6MTk2NzI4NzE4M30.01hjAN5jecCRn0VG2NfqIuBmKK7Mak8xN7SKsRs48NY',
          },
        }
      );
      console.log('posted');
      setState({
        ...state,
        loading: true,
      });
    };
    postDiameterAndArea();
    async function fetchArea() {
      console.log('fetching area');
      const circle = await axios.get(
        `https://oaedqcfxnfmlzqyvfwyc.supabase.co/rest/v1/circle?id=eq.${circleId}&select=*`,
        {
          headers: {
            apikey:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZWRxY2Z4bmZtbHpxeXZmd3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE3MTExODMsImV4cCI6MTk2NzI4NzE4M30.01hjAN5jecCRn0VG2NfqIuBmKK7Mak8xN7SKsRs48NY',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZWRxY2Z4bmZtbHpxeXZmd3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE3MTExODMsImV4cCI6MTk2NzI4NzE4M30.01hjAN5jecCRn0VG2NfqIuBmKK7Mak8xN7SKsRs48NY',
          },
        }
      );
      console.log(circle);

      const area = circle.data[0].area;

      setState({
        ...state,
        loading: false,
        area: area,
      });
    }
    console.log('starting timer');
    setTimeout(fetchArea, 10000);
  };

  return (
    <Stack
      sx={{
        alignItems: 'center',
        height: '100%',
        position: 'relative',
        display: props.display ? 'box' : 'none',
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
        sx={{ height: '40%', width: '90%', justifyContent: 'space-around' }}
      >
        {renderTextField()}
        {/* <Button variant="contained" disabled={state.isInvalid}>
          {state.isInvalid ? state.errorMessage : 'submit'}
        </Button> */}
        <Alert
          variant="outlined"
          severity={
            state.isInvalid ? 'error' : state.area === 0 ? 'success' : 'info'
          }
          action={
            <Button
              color="inherit"
              size="small"
              onClick={resetValues}
              disabled={state.loading}
            >
              RESET
            </Button>
          }
        >
          {state.isInvalid
            ? state.errorMessage
            : state.loading
            ? 'Processing...'
            : state.area > 0
            ? `Area: ${state.area}`
            : 'Valid value'}
        </Alert>
        <Button
          variant="contained"
          disabled={state.isInvalid || state.loading || state.area > 0}
          onClick={handleSubmit}
        >
          GET AREA
        </Button>
      </Stack>
    </Stack>
  );
}

export default CircleSurfacePage;
