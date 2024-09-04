import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Avatar,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchBar from '../../components/GenericSearchBar/SearchBar'; // Assume SearchBar component from previous implementation
import InventoryIcon from '@mui/icons-material/Inventory'
import ReceiptIcon from '@mui/icons-material/Receipt'; // Icon for Bills
import GavelIcon from '@mui/icons-material/Gavel'; // Icon for Auctions
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getUserName } from '../../../core/services/authService';
import { StoreMallDirectoryRounded } from '@mui/icons-material';
import TestimonialSection from '../../components/Testimonial/TestimonialSection';
const user = getUserName()
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home - BITS</title>
        <meta
          name='description'
          content='Welcome to the home page of Your Website Name. Manage vehicles, spare parts, and user profile easily.'
        />
        <link rel='canonical' href='https://www.yourwebsite.com/home' />
        {/* Add other SEO-related meta tags as needed */}
      </Helmet>
      <Paper sx={{ padding: '1.2rem', marginBottom: '12px' }}>
        <Stack spacing={2} direction='row' alignItems='center'>
          <Avatar>
            <AccountBoxIcon />
          </Avatar>
          <Typography variant='h6'>Hello, {user}</Typography>
        </Stack>
      </Paper>

      {/* <SearchBar onSearch={(query) => console.log(query)} /> */}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={4} md={4}>
          <Card>
            <CardContent>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Link to='/vehicle-listing'>
                  <IconButton>
                  <DirectionsCarIcon fontSize='large' />
                </IconButton>
                </Link>
                <Typography variant='h6'>Vehicles</Typography>
              </Stack>
              <Typography color='textSecondary'>
                Manage your vehicles inventory and details.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card>
            <CardContent>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Link to='/spare-part-listing'>
                  <IconButton>
                  <BuildIcon fontSize='large' />
                </IconButton>
                </Link>
                <Typography variant='h6'>Spare Parts</Typography>
              </Stack>
              <Typography color='textSecondary'>
                Keep track of all available spare parts.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card>
            <CardContent>
              <Stack direction='row' spacing={2} alignItems='center'>
                <IconButton>
                  <AccountBoxIcon fontSize='large' />
                </IconButton>
                <Typography variant='h6'>Profile</Typography>
              </Stack>
              <Typography color='textSecondary'>
                Update your personal and account information.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card>
            <CardContent>
              <Stack direction='row' spacing={2} alignItems='center'>
              <Link to='/bl-documents'>
                <IconButton>
                  <ReceiptIcon fontSize='large' />
                </IconButton>
                </Link>
                <Typography variant='h6'>Bills</Typography>
              </Stack>
              <Typography color='textSecondary'>
                Upload bills of lading for your vehicles.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card>
            <CardContent>
              <Stack direction='row' spacing={2} alignItems='center'>
              <Link to='/auctions'>
                <IconButton>
                  <GavelIcon fontSize='large' />
                </IconButton>
                </Link>
                <Typography variant='h6'>Auctions</Typography>
              </Stack>
              <Typography color='textSecondary'>
                Lets connect with vehicle and spare parts auctions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card>
            <CardContent>
              <Stack direction='row' spacing={2} alignItems='center'>
              <Link to='/containers'>
                <IconButton>
                  <InventoryIcon fontSize='large' />
                </IconButton>
                </Link>
                <Typography variant='h6'>Containers</Typography>
              </Stack>
              <Typography color='textSecondary'>
              Keep track of all available containers.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card>
            <CardContent>
              <Stack direction='row' spacing={2} alignItems='center'>
              <Link to='/sale-purchase'>
                <IconButton>
                  <StoreMallDirectoryRounded fontSize='large' />
                </IconButton>
                </Link>
                <Typography variant='h6'>Sales and Purchase</Typography>
              </Stack>
              <Typography color='textSecondary'>
               Manage sales and purchase of vehicles Record.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more card components for other pages */}
        <TestimonialSection/>
      </Grid>
    </>
  );
}
