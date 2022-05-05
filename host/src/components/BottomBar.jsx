import React from 'react';
import { Stack, Typography, Link } from '@mui/material';

export default function BottomBar() {
  return (
    <Stack
      position="fixed"
      left="0"
      bottom="0"
      width="100vw"
      bgcolor="rgb(25,118,210)"
      direction="row"
      justifyContent="center"
    >
      <Typography color="white">
        {' '}
        built by{' '}
        <Link
          href="https://github.com/guitrentini96"
          underline="hover"
          target="_blank"
          rel="noopener"
          sx={{ color: 'white' }}
        >
          Guilherme Campara
        </Link>{' '}
        :)
      </Typography>
    </Stack>
  );
}
