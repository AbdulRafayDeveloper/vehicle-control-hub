import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { CircularProgress, Typography, Grid, Button } from '@mui/material';
import MReactTable from '../../components/DataTable/MaterialReactTable';
import {getSpareParts, getSparePartReports} from '../../../core/api/spareparts';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const SparePartListing = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate()

//   const dummySpareParts = [
//     {
//         fk_vehicle_id: "1",
//         fk_user_id: "1",
//         fk_container_id: "1",
//         name: "door",
//         status: "new",
//         description: "new door of BMW"
//     },
//     {
//         fk_vehicle_id: "2",
//         fk_user_id: "2",
//         fk_container_id: "2",
//         name: "Brake Pad",
//         status: "new",
//         description: "new brake pad for the car"
//     }
// ];

  const initialColumns = [
    { accessorKey: 'id', header: 'Id' },
    { accessorKey: 'fk_vehicle_id', header: 'Vehicle Id' },
    { accessorKey: 'fk_user_id', header: 'User Id' },
    { accessorKey: 'fk_container_id', header: 'Container Id' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'status', header: 'Status' },
    
  ];
  const handleAddVehicle = () => {
    navigate("/add-spare-part-listing");
  };
  // useEffect(() => {
  //   // Simulating data fetch
  //   setLoading(true);
  //   setTimeout(() => {
  //     setSpareParts(dummySpareParts);
  //     setLoading(false);
  //   }, 1000); // Simulate API delay
  // }, []);

  // for fetching data using apis

  useEffect(() => {
    // Simulating data fetch using async/await
    const fetchSpareParts = async () => {
      try {
        setLoading(true);
        const response = await getSpareParts();
        setSpareParts(response.list);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching spare parts:', error);
      }
    };
    fetchSpareParts();

  }, []);
  useEffect(() => {
    const fetchReport = async () => {
      const data = await getSparePartReports();
      console.log("reports", data);
    };
    fetchReport();
  }, []);


  return (
    <>
      <Helmet>
        <title>Spare Parts Listings - BTIS</title>
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
        Spare Part Listings
      </Typography>
      <Grid item>
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            color="primary"
            onClick={handleAddVehicle}
            startIcon={<Add />}
          >
            Add Spare Part
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MReactTable
          columns={initialColumns}
          data={spareParts}
          setSelectedRows={setSelectedRows}
          enableRowSelection={false}
          refresh={refresh}
          loading={loading}
          manualFilter
          onRowClick={(row) => {
            console.log("row", row.original.id);
            navigate(`/edit-spare-part-listing/${row.original.id}`);
          }}
        />
      </Grid>
    </>
  );
}

export default SparePartListing;
