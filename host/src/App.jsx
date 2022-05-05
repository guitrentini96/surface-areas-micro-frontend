import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import GeneralContainer from './components/GeneralContainer';
import BottomBar from './components/BottomBar';
import PagesToggle from './components/PagesToggle';
import TriangleForm from 'triangle/TriangleForm';
import CircleForm from 'circle/CircleForm';
import { Stack, Typography } from '@mui/material';

function App() {
  const [state, setState] = React.useState({
    page: 'triangle',
    showTrianglePage: true,
    showCirclePage: false,
  });

  const setNewPage = (page) => {
    console.log(`show ${page}`);
    if (page === 'triangle') {
      setState({
        ...state,
        page: 'triangle',
        showTrianglePage: true,
        showCirclePage: false,
      });
    } else if (page === 'circle') {
      setState({
        ...state,
        page: 'circle',
        showTrianglePage: false,
        showCirclePage: true,
      });
    }
  };

  return (
    <GeneralContainer>
      <Stack
        sx={{
          marginTop: '2%',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        {state.showTrianglePage ? (
          <TriangleForm />
        ) : state.showCirclePage ? (
          <CircleForm />
        ) : (
          <Typography variant="h4">No page selected</Typography>
        )}
        <PagesToggle page={state.page} setPage={setNewPage} />
      </Stack>
      <BottomBar />
    </GeneralContainer>
  );
}
ReactDOM.render(<App />, document.getElementById('app'));
