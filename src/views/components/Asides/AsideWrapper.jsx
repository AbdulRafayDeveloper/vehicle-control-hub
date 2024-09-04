import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TOGGLE_SIDEBAR, TOGGLE_SIDEBAR_HOVER } from '../../../core/store/app/appSlice';
import { useTheme } from '@emotion/react';
import './AsideWrapper.css';
import useResponsiveStyles from '../../../core/hooks/useMedaiQuery';

const AsideWrapper = ({ children }) => {
  const isExpanded = useSelector(state => state.app.sidebar.isExpanded);
  const isHovering = useSelector(state => state.app.sidebar.isHovering);
  const dispatch = useDispatch();
  const { isMobile, isTablet, isDesktop, isLCD } = useResponsiveStyles();
  const theme = useTheme();

  const toggleSidebarHandler = () => {
    dispatch(TOGGLE_SIDEBAR());
  };

  return (
    <Grid
      item
      xs={12}
      sm={isExpanded ? 3.6 : 0.13}
      md={isExpanded ? 2 : 0.13}
      sx={{
        position: 'relative',
        marginTop: '.6rem',
        zIndex: 1200,
      }}>
      <IconButton
        title={''}
        onMouseEnter={() =>
          dispatch(
            isHovering && !isExpanded
              ? TOGGLE_SIDEBAR_HOVER(true)
              : TOGGLE_SIDEBAR_HOVER(false)
          )
        }
        onMouseLeave={() => dispatch(TOGGLE_SIDEBAR_HOVER(false))}
        sx={{
          position: 'absolute',
          top: 30,
          right: isHovering ? (isExpanded ? -15 : '-14.6rem') : -15,
          zIndex: isHovering ? theme.zIndex.tooltip + 2 : 1100,
          color: '#000',
          border: '1px solid #e0e0e0',
          borderRadius: '50%',
          padding: '2px',
          backgroundColor: '#fff',
          '&:hover': {
            backgroundColor: '#89c4fd',
          },
        }}
        size='small'
        onClick={toggleSidebarHandler}>
        {isExpanded ? <ChevronLeftIcon title={''} /> : <ChevronRightIcon />}
      </IconButton>
      <Box
        onMouseEnter={() => dispatch(TOGGLE_SIDEBAR_HOVER(true))}
        onMouseLeave={() => dispatch(TOGGLE_SIDEBAR_HOVER(false))}
        sx={{
          backgroundColor: 'white',
          height: 'calc(100vh - 72px)',
          borderRadius: '0 4px 0 0',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          display: 'flex',
          flexDirection: 'column',
          position: isExpanded ? 'unset' : isHovering ? 'absolute' : 'unset',
          zIndex: theme.zIndex.tooltip + 1,
          borderRight: isExpanded ? 'none' : '.4rem solid #bdbdbd2e',
          width: isExpanded ? '100%' : isHovering ? '15.45rem' : '1rem',
          '& > div': {
            display: isExpanded || isHovering ? 'block' : 'none',
          },
          ...(isExpanded && isMobile && { paddingBottom: '6rem' }),
          transition: 'width .3s',
        }}>
        {children}
      </Box>
    </Grid>
  );
};

export default AsideWrapper;
