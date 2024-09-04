import { Box, Paper, Typography, Button } from '@mui/material';
import React, { Component } from 'react';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import config from '../../core/services/configService';
import { fetchAppVersion } from '../../core/utils/helpers';
const withErrorBoundary = WrappedComponent => {
  return class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false,
        countdown: config.VITE_APP_ENVIRONMENT === 'local' ? 1000 : 3, // Set the initial countdown value
        shouldAutoRefresh: true, // Flag to control auto-refresh
      };
    }

    componentDidCatch(error, errorInfo) {
      console.error('Error caught by error boundary:', error, errorInfo);
      this.handleVersionCheck();
      this.setState({ hasError: true });
      this.startCountdown();
    }

    componentDidMount() {}

    handleVersionCheck = async () => {
      try {
        /*
        Note: Version changes whenever we we create new build
        */
        const version = await fetchAppVersion(); // fetch app version

        if (version !== localStorage.getItem('app-version')) {
          // destroy token and reload the application on version change so that browser gets latest code.
          // destroyToken();
          localStorage.setItem('app-version', version); // set app version in localStorage to track version.
          setTimeout(() => {
            // Giving timeout to make sure that page reloads only after local storage has successfully been updated
            window.location.reload(true);
          }, 100);
        }
      } catch (error) {
        console.error('Error fetching app version:', error);
        // Handle fetch errors (e.g., network issues) appropriately
      }
    };

    startCountdown = () => {
      this.interval = setInterval(() => {
        this.setState(
          prevState => ({
            countdown: prevState.countdown - 1,
          }),
          () => {
            if (this.state.countdown === 0) {
              clearInterval(this.interval);
              if (this.state.shouldAutoRefresh) {
                window.location.reload();
              }
            }
          }
        );
      }, 1000);
    };

    handleManualRefresh = () => {
      clearInterval(this.interval);
      window.location.reload();
    };

    componentWillUnmount() {
      clearInterval(this.interval); // Clear the interval when the component unmounts
    }

    render() {
      if (this.state.hasError) {
        return (
          <Box
            height={'100vh'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Paper
              elevation={24}
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <Typography variant='h5'>Something went wrong.</Typography>
              <Typography variant='body1'>
                Page will auto refresh in {this.state.countdown} seconds
              </Typography>
              <Button
                variant='contained'
                color='primary'
                onClick={this.handleManualRefresh}
                sx={{ mt: 2 }}>
                Refresh Now
              </Button>
              <BrokenImageIcon
                color='red'
                sx={{ color: 'red', ml: 3, mt: 2 }}
              />
            </Paper>
          </Box>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withErrorBoundary;
