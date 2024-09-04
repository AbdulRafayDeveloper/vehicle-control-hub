import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

function ComponentLoader() {
  const company = useSelector(state => state.auth?.company);

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <img
          style={{ maxWidth: '90%', maxHeight: '150px' }}
          src={company?.logo}
        />
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CircularProgress
            sx={{
              width: '250px',
              height: '250px',
              '& svg': {
                strokeWidth: '24px',
              },
            }}
          />
        </div>
      </div>
    </Box>
  );
}

export default ComponentLoader;
