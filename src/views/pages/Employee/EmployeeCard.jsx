import React from 'react';
import { Card, CardContent, Typography, Avatar, Stack } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const EmployeeCard = ({ employee }) => {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar>
            <AccountBoxIcon />
          </Avatar>
          <Typography variant="h6">{employee.name}</Typography>
        </Stack>
        <Typography variant="subtitle1" color="textSecondary">
          {employee.position} - {employee.department}
        </Typography>
        {/* Additional employee details or actions can be added here */}
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
