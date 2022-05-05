import {
  Alert,
  Button,
  Stack,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import React from 'react';
import axios from 'axios';

export default function TriangleForm(props) {
  const [state, setState] = React.useState({
    sides: ['', '', ''],
    area: 0,
    isInvalid: true,
    errorMessage: 'Needs 3 values',
    loading: false,
  });

  const handleSideInput = (event) => {
    // first, get the inputs value and test to see if it's a valid number
    const value = event.target.value;
    const isNumber = /^\d*\.?\d*$/.test(value);
    // we just procceed if the value is a valid number with no more than 4 algarisms or if the user deleted the value(value==='')
    if ((isNumber || value === '') && value.length <= 4) {
      // asign a index and a newSidesArray constants, which will be used to test the values
      const index = parseInt(event.target.name);
      const newSidesArray = state.sides;
      newSidesArray[index] = value;
      // first check if it has 3 values that are bigget than 0:
      const has3Values = newSidesArray.every((value) =>
        /.*[1-9].*/.test(value)
      );
      // if the values are invalid, keep the error message
      if (!has3Values) {
        setState({
          ...state,
          sides: newSidesArray,
          isInvalid: true,
          errorMessage: 'Needs 3 values',
        });
      } else {
        // it has 3 values. check if they make a triangle
        // first, get the perimeter
        const perimeter = newSidesArray.reduce(
          (prevValue, currentValue) =>
            parseFloat(prevValue) + parseFloat(currentValue),
          0
        );
        // then check if every value is smaller then half the perimeter
        const makesATriangle = newSidesArray.every(
          (value) => parseFloat(value) < perimeter / 2
        );
        // so if it doesn't make a triangle, update the error message:
        if (!makesATriangle) {
          setState({
            ...state,
            sides: newSidesArray,
            isInvalid: true,
            errorMessage: 'Not a triangle',
          });
        }
        // and finally, if it makes a triangle, the submit button becomes active
        else {
          setState({
            ...state,
            sides: newSidesArray,
            isInvalid: false,
          });
        }
      }
    }
  };

  const renderTextFields = () => {
    return (
      <>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          {state.sides.map(function (value, index) {
            return (
              <TextField
                size="small"
                label={'Side '.concat(index + 1)}
                variant="outlined"
                value={value}
                key={index}
                name={index.toString()}
                onChange={handleSideInput}
                sx={{ width: '30%' }}
                disabled={state.loading || state.area > 0}
              />
            );
          })}
        </Stack>
      </>
    );
  };

  const resetValues = () => {
    setState({
      ...state,
      sides: ['', '', ''],
      area: 0,
      isInvalid: true,
      errorMessage: 'Needs 3 values',
      loading: false,
    });
  };

  const handleSubmit = () => {
    console.log('creating variables');
    const side1 = parseFloat(state.sides[0]);
    const side2 = parseFloat(state.sides[1]);
    const side3 = parseFloat(state.sides[2]);
    const semiPerimeter = (side1 + side2 + side3) / 2;
    const area = parseFloat(
      Math.sqrt(
        semiPerimeter *
          (semiPerimeter - side1) *
          (semiPerimeter - side2) *
          (semiPerimeter - side3)
      ).toFixed(3)
    );
    let triangleId = Math.floor(Math.random() * 100000000);

    const postSidesAndArea = () => {
      console.log('posting it');
      axios.post(
        'https://oaedqcfxnfmlzqyvfwyc.supabase.co/rest/v1/triangle',
        {
          id: triangleId,
          side1: side1,
          side2: side2,
          side3: side3,
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
    postSidesAndArea();
    async function fetchArea() {
      console.log('fetching area');
      const triangle = await axios.get(
        `https://oaedqcfxnfmlzqyvfwyc.supabase.co/rest/v1/triangle?id=eq.${triangleId}&select=*`,
        {
          headers: {
            apikey:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZWRxY2Z4bmZtbHpxeXZmd3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE3MTExODMsImV4cCI6MTk2NzI4NzE4M30.01hjAN5jecCRn0VG2NfqIuBmKK7Mak8xN7SKsRs48NY',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZWRxY2Z4bmZtbHpxeXZmd3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE3MTExODMsImV4cCI6MTk2NzI4NzE4M30.01hjAN5jecCRn0VG2NfqIuBmKK7Mak8xN7SKsRs48NY',
          },
        }
      );
      console.log(triangle);

      const area = triangle.data[0].area;

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
      <Typography variant="h4">Triangle Surface</Typography>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Regular_triangle.svg/800px-Regular_triangle.svg.png"
        alt="triangle"
        width="80%"
      ></img>
      <Stack
        sx={{
          direction: 'row',
          position: 'absolute',
          top: '135px',
          left: '43px',
          width: '50px',
          alignItems: 'flex-end',
        }}
      >
        <Typography>{state.sides[0]}</Typography>
      </Stack>
      <Stack
        sx={{
          direction: 'row',
          position: 'absolute',
          top: '135px',
          right: '45px',
          width: '50px',
        }}
      >
        <Typography>{state.sides[1]}</Typography>
      </Stack>
      <Typography sx={{ position: 'absolute', top: '250px' }}>
        {state.sides[2]}
      </Typography>
      <Stack
        sx={{ height: '40%', width: '90%', justifyContent: 'space-around' }}
      >
        {renderTextFields()}
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
            : 'Valid values'}
        </Alert>
        <Button
          variant="contained"
          disabled={state.isInvalid || state.loading || state.area > 0}
          onClick={handleSubmit}
        >
          Get Area
        </Button>
      </Stack>
    </Stack>
  );
}
