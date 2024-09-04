import React from 'react';
import Box from '@mui/system/Box';
import WithPermission from '../RolesAndPermissions/WithPermission';
import { Typography } from '@mui/material';

function DataTableContainer({ children, takenHeight = '168', noPermission }) {
  return (
    <Box
      sx={{
        zIndex: '0',
        position: 'relative',
        height: `calc(100vh - ${takenHeight}px)`,
        overflow: 'auto',
        backgroundColor: 'white',
        // '& .MuiDataTableContainer-root': {
        //   height: 'calc(100vh - 300px)',
        //   overflow: 'auto'
        // }
      }}
    >
      {noPermission ? (
        children
      ) : (
        <WithPermission
          // requiredPermission={'ALL'}
          requiredPermission={'VIEW'}
          fallBack={
            <Typography variant='body1' p={2}>
              You don't have the permission to view this table.
            </Typography>
          }
        >
          {children}
        </WithPermission>
      )}
    </Box>
  );
}

export default DataTableContainer;
