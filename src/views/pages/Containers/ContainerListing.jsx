import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Typography,
  Grid,
  Button,
  Modal,
  Box,
  TextField,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MReactTable from '../../components/DataTable/MaterialReactTable';
import {fetchContainer, updateContainerLocation } from '../../../core/api/containers';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ContainerListing = () => {
  const [containers, setContainers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContainer();
      setContainers(data.containers);
      setLoading(false);
    };
    fetchData();
  }, [refresh]);

  const initialColumns = [
    { accessorKey: "id", header: "Id" },
    { accessorKey: "container_number", header: "Container Number" },
    { accessorKey: "bl_number", header: "BL Number" },
    { accessorKey: "container_weight", header: "Container Weight" },
    { accessorKey: "volume", header: "Volume" },
    { accessorKey: "container_type", header: "Container Type" },
    { accessorKey: "origin", header: "Origin" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "expected_arrival", header: "Expected Arrival" },
    { accessorKey: "actual_arrival", header: "Actual Arrival" },
    { accessorKey: "document_url", header: "Document URL" },
    { accessorKey: "freight_price", header: "Freight Price" },
    { accessorKey: "drayage_price", header: "Drayage Price" },
    { accessorKey: "loading_price", header: "Loading Price" },
    { accessorKey: "port_price", header: "Port Price" },
    { accessorKey: "created_at", header: "Created At" },
    { accessorKey: "updated_at", header: "Updated At" },
  ];
  

  const handleAddContainer = () => {
    navigate("/add-container");
  };


  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        style={{ marginBottom: "20px" }}
      >
        <Typography variant="h4" gutterBottom>
          Container Listings
        </Typography>
        <Grid item>
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            color="primary"
            onClick={handleAddContainer}
            startIcon={<Add />}
          >
            Add Container
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <MReactTable
          columns={initialColumns}
          data={containers}
          setSelectedRows={setSelectedRows}
          enableRowSelection={false}
          refresh={refresh}
          loading={loading}
          onRowClick={(row) => {
            console.log("row", row.original.id);
            navigate(`/edit-container/${row.original.id}`);
          }}
        />
      </Grid>
    </>
  );
};

export default ContainerListing;
