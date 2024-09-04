import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { CircularProgress, Typography, Grid, Button } from '@mui/material';
import MReactTable from '../../components/DataTable/MaterialReactTable'; // Assuming the path is similar
import { getAllItems } from '../../../core/api/items'; // Import your API call
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Item = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const itemColumns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'customer_id', header: 'Customer ID' },
    { accessorKey: 'item_name', header: 'Item Name' },
    { accessorKey: 'quantity', header: 'Quantity' },
    { accessorKey: 'offer_price', header: 'Offer Price' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'updated_at', header: 'Updated At' },
    { accessorKey: 'item_type', header: 'Item Type' },
    { accessorKey: 'transaction_id', header: 'Transaction ID' },
    { accessorKey: 'chassis_number', header: 'Chassis Number' },
    { accessorKey: 'notes', header: 'Notes' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'created_at', header: 'Created At' },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await getAllItems();
        setItems(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = () => {
    navigate("/add-item");
  };

  return (
    <>
      <Helmet>
        <title>Item Listings - Your Website</title>
        <meta
          name="description"
          content="Explore a wide range of items available. Find the items you need from our listings."
        />
        <link rel="canonical" href="https://www.yourwebsite.com/item-listings" />
      </Helmet>
      
      <Grid container alignItems="center" justifyContent="space-between" style={{ marginBottom: "20px" }}>
        <Typography variant='h4' gutterBottom>
          Item Listings
        </Typography>
        <Grid item>
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            color="primary"
            onClick={handleAddItem}
            startIcon={<Add />}
          >
            Add Item
          </Button>
        </Grid>
      </Grid>
      
      <Grid item xs={12}>
        {loading ? (
          <CircularProgress />
        ) : (
          <MReactTable
            columns={itemColumns}
            data={items}
            enableRowSelection={false}
            onRowClick={(row) => {
              console.log("row", row.original.id);
              navigate(`/edit-item/${row.original.id}`);
            }}
          />
        )}
      </Grid>
    </>
  );
};

export default Item;
