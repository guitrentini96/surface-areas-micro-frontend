import React from 'react';
import CircleOutlined from '@mui/icons-material/CircleOutlined';
import ChangeHistory from '@mui/icons-material/ChangeHistory';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function PagesToggle(props) {
  const [state, setState] = React.useState({
    page: props.page,
  });

  const handleChange = (event, newPage) => {
    if (newPage !== null) {
      setState({ page: newPage });
      props.setPage(newPage);
    }
  };

  return (
    <ToggleButtonGroup
      value={state.page}
      exclusive
      onChange={handleChange}
      aria-label="pages toggle"
      sx={{ marginBottom: '3%' }}
    >
      <ToggleButton value="triangle" aria-label="centered">
        <ChangeHistory />
      </ToggleButton>
      <ToggleButton value="circle" aria-label="left aligned">
        <CircleOutlined />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
