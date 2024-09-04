import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Avatar, Stack, Paper, Button } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Add } from '@mui/icons-material';
import MReactTable from '../../components/DataTable/MaterialReactTable';
import { useNavigate } from 'react-router-dom';
import {getAllCustomers} from '../../../core/api/customer';

const CustomerPortal = () => {
  const [customers, setCustomers] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate()

 

  const initialColumns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'phone_number', header: 'Phone' }, 
    { accessorKey: 'email', header: 'Email' },
    
  ];
  const handleAddCustomer = () => {
    navigate("/add-customer");
  };

  // for fetching data using apis

  useEffect(() => {
    // Simulating data fetch using async/await
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await getAllCustomers();
        setCustomers(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();

  }, []);


  return (
    <>
      <Helmet>
        <title>Customers - BTIS</title>
        <meta
          name="description"
          content="Explore a wide range of spare parts available for various vehicles. Find the spare parts you need from our listings."
        />
        <link rel="canonical" href="https://www.yourwebsite.com/spare-part-listings" />
        {/* Add other SEO-related meta tags as needed */}
      </Helmet>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        style={{ marginBottom: "20px" }}
      >
       <Typography variant='h4' gutterBottom>
        Customers
      </Typography>
      <Grid item>
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            color="primary"
            onClick={handleAddCustomer}
            startIcon={<Add />}
          >
            Add Customer
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MReactTable
          columns={initialColumns}
          data={customers}
          setSelectedRows={setSelectedRows}
          enableRowSelection={false}
          refresh={refresh}
          loading={loading}
          manualFilter
          onRowClick={(row) => {
            navigate(`/edit-customer/${row.original.id}`);
          }}
        />
      </Grid>
    </>
  );
};

export default CustomerPortal;
