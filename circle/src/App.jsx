import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Paper } from '@mui/material';

import './index.css';
import CircleForm from './CircleForm';

const App = () => (
  <div className="container">
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
        <CircleForm display={true} />
      </Paper>
    </Container>
  </div>
);
ReactDOM.render(<App />, document.getElementById('app'));
