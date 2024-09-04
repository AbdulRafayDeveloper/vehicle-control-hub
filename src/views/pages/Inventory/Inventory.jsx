import React from 'react';
import BreadCrumb from '../../components/BreadCrumbs/BreadCrumb';
import { Grid, Box, Typography, Button, Card, CardMedia, CardContent, useMediaQuery } from '@mui/material';

const Inventory = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <>
      <BreadCrumb />
      <Box display="flex" sx={{padding: isMobile ? '0' : '0 8rem'}}>
        {/* Sidebar */}
        <Box width="550px" p={2} bgcolor="white" boxShadow={1}>
          <Typography variant="h6" gutterBottom>Filters</Typography>
          {/* Add Filter Options Here */}
          {/* Example Filter */}
          <Box mb={2}>
            <Typography variant="subtitle1">Category</Typography>
            <Button variant="outlined">Apply Filter</Button>
          </Box>
          {/* Add more filters */}
        </Box>

        {/* Main Content */}
        <Box flexGrow={1} p={2}>
          <Grid container spacing={2}>
            {/* Example Car Card */}
            {Array.from({ length: 12 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/src/assets/vehicle1.png" // Replace with actual image path
                    alt="Car Image"
                  />
                  <CardContent>
                    <Typography variant="h6">Audi A5</Typography>
                    <Typography variant="body2" color="textSecondary">1.4 Liters - 2018</Typography>
                    <Button variant="contained" color="primary" fullWidth>Submit a Bid</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Inventory;
