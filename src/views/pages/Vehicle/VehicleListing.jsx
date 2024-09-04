import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  CircularProgress,
  Typography,
  Grid,
  Button,
  Modal,
  Box,
  TextField,
  IconButton,
  Alert,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MReactTable from "../../components/DataTable/MaterialReactTable";
import {
  getVehicles,
  getVehiclesReports,
  searchVehicleChassis,
  searchVehicleQR,
  uploadVehicleFile
} from "../../../core/api/vehicles";
import { Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useNavigate } from "react-router-dom";
import BarcodeScanner from "../../components/ScanBarCode/BarcodeScanner"; 

const VehicleListing = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [chassisNumber, setChassisNumber] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [barcodeModalOpen, setBarcodeModalOpen] = useState(false);
  const [bBRFile, setBBRFile] = useState(null);
  const [bBRUploadStatus, setBBRUploadStatus] = useState('');
  const [bBRUploading, setBBRUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVehicles();
      setVehicles(data.list);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchReport = async () => {
      await getVehiclesReports();
    };
    fetchReport();
  }, []);

  const initialColumns = [
    { accessorKey: "id", header: "Id" },
    { accessorKey: "fk_user_id", header: "fk_user_id" },
    { accessorKey: "fk_container_id", header: "fk_container_id" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "make", header: "Make" },
    { accessorKey: "model", header: "Model" },
    { accessorKey: "year", header: "Year" },
    { accessorKey: "mileage", header: "Mileage" },
    { accessorKey: "damage_details", header: "Damage Details" },
    { accessorKey: "transmission", header: "Transmission" },
    { accessorKey: "color", header: "Color" },
    { accessorKey: "engine", header: "Engine" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "document_name", header: "Document Name" },
    { accessorKey: "chassis_number", header: "Chassis Number" },
    { accessorKey: "image", header: "Image" },
    { accessorKey: "grade", header: "Grade" },
    { accessorKey: "score", header: "Score" },
    { accessorKey: "displacement", header: "Displacement" },
    { accessorKey: "start_price", header: "Start Price" },
    { accessorKey: "end_price", header: "End Price" },
    { accessorKey: "auction_result", header: "Auction Result" },
  ];

  const handleAddVehicle = () => {
    navigate("/add-vehicle-listing");
  };

  const handleSearch = async () => {
    setSearchPerformed(true);
    const result = await searchVehicleChassis({
      chassis_number: chassisNumber,
    });
    setSearchResult(result);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSearchResult(null);
    setChassisNumber("");
    setSearchPerformed(false);
  };

  const handleOpenBarcodeModal = () => {
    setBarcodeModalOpen(true);
  };

  const handleCloseBarcodeModal = () => {
    setBarcodeModalOpen(false);
    setSearchResult(null); // Clear result when closing modal
  };

  const handleBarcodeScan = async (barcode) => {
    try {
      const result = await searchVehicleQR({ qrcode: barcode });
      setSearchResult(result);
    } catch (error) {
      console.error("Error checking barcode status:", error);
    }
  };
  const handleBBRFileChange = (event) => {
    setBBRFile(event.target.files[0]);
    setBBRUploadStatus('');
  };

  const handleUploadBBR = async () => {
    if (!bBRFile) {
      setBBRUploadStatus('Please select BBR excel first.');
      return;
    }

    setBBRUploading(true);
    setBBRUploadStatus('');
    try {
      const response = await uploadVehicleFile(bBRFile);
      if (response.status === 200 || response.status === 201) {
        setBBRUploadStatus('File uploaded successfully.');
      } else {
        setBBRUploadStatus('File upload failed. Please try again.');
      }
    } catch (error) {
      setBBRUploadStatus(
        `File upload failed with errors:${error.data.message || ''}`
      );
    } finally {
      setBBRUploading(false);
      handleClose();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBBRFile(null); // Reset the file input
    setBBRUploadStatus(''); // Reset the status
  };

  return (
    <>
      <Helmet>
        <title>Vehicle Listings - Your Website Name</title>
        <meta
          name="description"
          content="Explore a wide range of vehicles available for sale. Find your perfect vehicle from our listings."
        />
        <link
          rel="canonical"
          href="https://www.yourwebsite.com/vehicle-listings"
        />
      </Helmet>

      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        style={{ marginBottom: "20px" }}
      >
        <Typography variant="h4" gutterBottom>
          Vehicle Listings
        </Typography>
        <Grid item>
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            color="primary"
            onClick={handleAddVehicle}
            startIcon={<Add />}
          >
            Add Vehicle
          </Button>
          <Button sx={{ mr: 1 }} variant="contained" onClick={handleOpenModal} startIcon={<SearchIcon />}>
            Search by Chassis Number
          </Button>
          <Button sx={{ mr: 1 }} variant="contained" onClick={handleOpenBarcodeModal} startIcon={<SearchIcon />}>
            Scan Barcode
          </Button>
          <Button variant='contained' color='primary' onClick={handleClickOpen} startIcon={<UploadFileIcon />}>
            Upload Documents
          </Button>
          <Box>
          
        </Box>
        {bBRUploadStatus && (
        <Box sx={{ p: 2 }}>
          <Alert severity={bBRUploadStatus.includes('error') || bBRUploadStatus.includes('failed') ? 'error' : 'success'}>
            {bBRUploadStatus}
          </Alert>
        </Box>
      )}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <MReactTable
          columns={initialColumns}
          data={vehicles}
          setSelectedRows={setSelectedRows}
          enableRowSelection={false}
          refresh={refresh}
          loading={loading}
          manualFilter
          onRowClick={(row) => {
            console.log("row", row.original.id);
            navigate(`/edit-vehicle-listing/${row.original.id}`);
          }}
          
        />
      </Grid>

      {/* Chassis Number Search Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Search Vehicle by Chassis Number
          </Typography>
          <TextField
            fullWidth
            label="Chassis Number"
            value={chassisNumber}
            onChange={(e) => setChassisNumber(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            style={{ marginTop: "20px" }}
          >
            Search
          </Button>
          <Box mt={2}>
            {searchPerformed ? (
              searchResult ? (
                <Box>
                  <Typography variant="body1">
                    Item Type: {searchResult.item_type}
                  </Typography>
                  <Typography variant="body1">
                    Status: {searchResult.status}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body1">No results found</Typography>
              )
            ) : null}
          </Box>
        </Box>
      </Modal>

      {/* Barcode Scanner Modal */}
      <Modal open={barcodeModalOpen} onClose={handleCloseBarcodeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseBarcodeModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Scan Barcode
          </Typography>
          <BarcodeScanner onScan={handleBarcodeScan} />
          {searchResult && (
            <Box mt={2}>
              <Typography variant="body1">
                Item Type: {searchResult.item_type}
              </Typography>
              <Typography variant="body1">
                Status: {searchResult.status}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>

      {/* Upload Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Upload BL Documents</DialogTitle>
        <DialogContent>
          <input
            accept='.xlsx, .xls, .pdf'
            style={{ display: 'none' }}
            id='upload-file'
            type='file'
            onChange={handleBBRFileChange}
          />
          <label htmlFor='upload-file'>
            <Button
              variant='contained'
              component='span'
              color='primary'
              disabled={bBRUploading}
              sx={{ marginBottom: 2 }}
            >
              Select File
            </Button>
          </label>
          {bBRFile && <Typography variant='body2'>{bBRFile.name}</Typography>}
          {bBRUploadStatus && (
            <Alert
              severity={
                bBRUploadStatus.includes('error') ||
                bBRUploadStatus.includes('failed')
                  ? 'error'
                  : 'success'
              }
            >
              {bBRUploadStatus}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color='secondary'
            disabled={bBRUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUploadBBR}
            color='primary'
            disabled={bBRUploading || !bBRFile}
          >
            {bBRUploading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VehicleListing;
