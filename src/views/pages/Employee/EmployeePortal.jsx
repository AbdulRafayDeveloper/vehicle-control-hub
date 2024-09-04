import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Avatar, Stack, Paper } from '@mui/material';
import SearchBar from '../../components/GenericSearchBar/SearchBar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmployeeCard from './EmployeeCard'; // Assuming EmployeeCard component displays employee details

const EmployeePortal = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', position: 'HR Manager', department: 'Human Resources' },
    { id: 3, name: 'Mike Johnson', position: 'Sales Executive', department: 'Sales' },
    // Add more employees as needed
  ]);

  const handleSearch = (query) => {
    // Implement search logic if required
    console.log('Search query:', query);
    // Update state or filter employees based on query
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar>
            <AccountBoxIcon />
          </Avatar>
          <Typography variant="h6">Employee Portal</Typography>
        </Stack>
      </Paper>

      <SearchBar onSearch={handleSearch} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {employees.map((employee) => (
          <Grid key={employee.id} item xs={12} sm={6} md={4}>
            <EmployeeCard employee={employee} />
          </Grid>
        ))}

        {/* Example EmployeeCard component */}
        {/* <Grid item xs={12} sm={6} md={4}>
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
              <Typography variant="body2" color="textSecondary">
                More details or actions related to the employee can be added here.
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default EmployeePortal;
