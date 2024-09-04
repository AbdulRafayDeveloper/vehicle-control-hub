import useTheme from '@mui/material/styles/useTheme';
import services from './core/services/initServices';
import { useDispatch } from 'react-redux';
import { LOGOUT } from './core/store/auth/authSlice';
import { fetchAppVersion } from './core/utils/helpers';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

function AppWrapper({ children }) {
  const dispatch = useDispatch();

  async function getAppVersion() {
    /*
    Note: Version changes whenever we we create new build
    */
    const version = await fetchAppVersion(); // fetch app version

    if (version !== localStorage.getItem('app-version')) {
      // destroy token and reload the application on version change so that client gets latest code.
      // destroyToken();
      localStorage.setItem('app-version', version); // set app version in localStorage to track version.
      setTimeout(() => {
        // Giving timeout to make sure that page reloads only after local storage has successfully been updated
        window.location.reload(true);
      }, 100);
    }
  }
  useEffect(() => {
    getAppVersion();
  }, []);

  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  const theme = useTheme();
  services.init({ apiServiceLogoutCallback: logout }); //initialize all services
  window.themeColors = {
    primary: theme.palette.primary.main,
  };

  return (
    <>
      <Helmet>
        {/* Using Helmet to enable dynamic favicon updates enhancing state-based changes. */}
        <link
          rel='icon'
          type='image/x-icon'
          href={'/assets/bits.png'}
          sizes='16x16'
        />
        {/* Future Update: The favicon source will be dynamically fetched from the backend, along with other organization details*/}
        <title>{`BITS Solution`}</title>
      </Helmet>
      {children}
    </>
  );
}

export default AppWrapper;
