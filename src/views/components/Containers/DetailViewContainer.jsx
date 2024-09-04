import React, { Suspense } from 'react';
import Box from '@mui/system/Box';

import SkeletonView from '../Skeleton/SkeletonView';
import WithPermission from '../RolesAndPermissions/WithPermission';
import { Typography } from '@mui/material';

function DetailViewContainer({ children, noPermission }) {
	return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 80px)',
        overflow: 'auto'
      }}>
      <Suspense fallback={<SkeletonView />}>
        {noPermission ? (
          children
        ) : (
          <WithPermission
            requiredPermission={'VIEW'}
            fallBack={
              <Typography variant='body1' p={2}>
                You don't have the permission to view this module.
              </Typography>
            }>
            {children}
          </WithPermission>
        )}
      </Suspense>
    </Box>
  );
}

export default DetailViewContainer;
