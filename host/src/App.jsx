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

  // React.useEffect(() => {
  //   const fetchDiameters = async () => {
  //     const resDiameters = await fetch(
  //       'https://oaedqcfxnfmlzqyvfwyc.supabase.co/rest/v1/circle?select=*',
  //       {
  //         method: 'GET',
  //         headers: {
  //           apikey:
  //             'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZWRxY2Z4bmZtbHpxeXZmd3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE3MTExODMsImV4cCI6MTk2NzI4NzE4M30.01hjAN5jecCRn0VG2NfqIuBmKK7Mak8xN7SKsRs48NY',
  //           Authorization:
  //             'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZWRxY2Z4bmZtbHpxeXZmd3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE3MTExODMsImV4cCI6MTk2NzI4NzE4M30.01hjAN5jecCRn0VG2NfqIuBmKK7Mak8xN7SKsRs48NY',
  //         },
  //       }
  //     );
  //     const returnedDiametersList = await resDiameters.json();
  //     console.log('these are the diameters:');
  //     console.log(returnedDiametersList);
  //   };
  //   fetchDiameters().catch(console.error);
  //   console.log('aaaa');
  // }, []);

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
        <TriangleForm display={state.showTrianglePage} />
        <CircleForm display={state.showCirclePage} />
        <PagesToggle page={state.page} setPage={setNewPage} />
      </Stack>
      <BottomBar />
    </GeneralContainer>
  );
}
ReactDOM.render(<App />, document.getElementById('app'));
