import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import authLeftBg from '../../../assets/authleftbg.png';

const AuthPageRightSide = () => {
  return (
    <Grid
      item
      container
      xs={12}
      sm={6}
      minHeight={'10vh'}
      sx={{
        backgroundImage: `url(${authLeftBg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Box m={'auto'} textAlign={'center'}>
        <Typography
          variant={'h6'}
          fontWeight={500}
          sx={{ color: 'white', letterSpacing: '5px' }}
        >
          Unlock Your Future:
        </Typography>
        <Typography
          variant={'body1'}
          fontSize={'42px'}
          fontWeight={800}
          sx={{ color: 'white' }}
        >
          Sign In to CRM
        </Typography>
      </Box>
    </Grid>
  );
};

export default AuthPageRightSide;
