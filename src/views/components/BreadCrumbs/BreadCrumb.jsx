// Breadcrumbs.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css'; // Import the styles
import { Box, useMediaQuery } from '@mui/system';
import { Breadcrumbs, Grid, Typography } from '@mui/material';

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const isMobile = useMediaQuery('(max-width:600px)');
  if (location.pathname === '/inventory') {
    return (
      <Box sx={{ backgroundColor: '#7c39e8', color: '#fff', py: 2, px: 3 }}>
        <Grid  sx={{ textAlign: 'center', alignItems: 'center', padding: isMobile ? '0' : '0 8rem' }}>
        <Typography sx={{textAlign: 'left'}} variant="h4">Inventory</Typography>
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#fff' }}>
          <Link underline="hover" color="inherit" to="/">
            Home
          </Link>
          <Typography color="inherit">Inventory</Typography>
        </Breadcrumbs>
        </Grid>
        
      </Box>
    );
  }
  return (

    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <li key={to} className="breadcrumb-item active">
              {value}
            </li>
          ) : (
            <li key={to} className="breadcrumb-item">
              <Link to={to}>{value}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
