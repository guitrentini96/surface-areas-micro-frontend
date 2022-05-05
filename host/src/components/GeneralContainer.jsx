import React from 'react';
import { Container, Paper } from '@mui/material';

const GeneralContainer = ({ children }) => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper
        variant="outlined"
        sx={{
          width: '20rem',
          backgroundColor: 'white',
          marginTop: '5vh',
          height: '80vh',
          padding: '10px',
        }}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default GeneralContainer;
