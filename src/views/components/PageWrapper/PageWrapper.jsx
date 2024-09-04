import React, { Suspense } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import ComponentLoader from '../Loaders/ComponentLoader';
import { useDispatch, useSelector } from 'react-redux';
import { PageProvider } from '../../../core/store/pageStore/pageStore';
import { SET_ACTIVE_MODULE } from '../../../core/store/app/appSlice';
import useResponsiveStyles from '../../../core/hooks/useMedaiQuery';

const PageWrapper = ({ children, isSidebar, module }) => {
  const dispatch = useDispatch();
  const { isTablet, isDesktop } = useResponsiveStyles();
  dispatch(SET_ACTIVE_MODULE(module));
  const isExpanded = useSelector((state) => state.app.sidebar.isExpanded);

  return (
    <Grid
      item
      xs={12}
      sm={isSidebar ? (isExpanded ? 8.4 : 11.87) : 12}
      md={isSidebar ? (isExpanded ? 10 : 11.87) : 12}
      lg={isSidebar ? (isExpanded ? 10 : 11.87) : 12}
    >
      {console.log("isSidebar", isSidebar)}
      <Box
        sx={{
          // border: '1px solid red',
          flexGrow: 1,
          m: 0,
          // height: 'calc(100vh - 200px)',
        //  height: 'calc(100vh - 120px)',
        //  height: '100vh',
      //    overflow: 'auto',
        }}
      >
        <Suspense fallback={<ComponentLoader />}>
          <PageProvider>{children}</PageProvider>
        </Suspense>
      </Box>
    </Grid>
  );
};

export default PageWrapper;
