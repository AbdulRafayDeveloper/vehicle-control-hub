import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Provider } from 'react-redux';
import {
  HeaderRoutes,
  AsideRoutes,
  PagesRoutes,
  FooterRoutes,
} from './core/routes/LayoutRoutes';
import { theme } from './core/theme/theme';
import './App.css';
import store from './core/store/store';
import withErrorBoundary from './views/components/ErrorBoundry';
import AppWrapper from './AppWrapper';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppWrapper>
            <Grid container >
              <HeaderRoutes />
              {/* <AsideRoutes /> */}
              <PagesRoutes />
              <FooterRoutes />
            </Grid>
          </AppWrapper>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default withErrorBoundary(App);
