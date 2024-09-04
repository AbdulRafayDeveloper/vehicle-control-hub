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
  Slide
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MReactTable from "../../components/DataTable/MaterialReactTable";
import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
    generateReport,
  getSalePurchaseData,
  predictVehiclePrice,
  searchItems,
  uploadSalePurchaseFile,
} from "../../../core/api/salePurchase";
import { Report } from "@mui/icons-material";

const SalePurchase = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bBRFile, setBBRFile] = useState(null);
  const [bBRUploadStatus, setBBRUploadStatus] = useState("");
  const [bBRUploading, setBBRUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [year, setYear] = useState("");
  const [score, setScore] = useState("");
  const [pushPrice, setPushPrice] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState("");
  const[color, setColor] = useState("");
  const[reportYear, setReportYear] = useState('0');
  const[transmission, setTransmission] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSalePurchaseData();
      setVehicles(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const initialColumns = [
    { accessorKey: "id", header: "Id" },
    { accessorKey: "chassis", header: "Chassis" },
    { accessorKey: "auction_house", header: "Auction House" },
    { accessorKey: "year", header: "Year" },
    { accessorKey: "score", header: "Score" },
    { accessorKey: "push_price", header: "Push Price" },
    { accessorKey: "sold_price", header: "Sold Price" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "vehicle", header: "Vehicle" },
    { accessorKey: "grade", header: "Grade" },
    { accessorKey: "color", header: "Color" },
    { accessorKey: "transmission", header: "Transmission" },
    { accessorKey: "remarks", header: "Remarks" },
  ];

  const handleOpenModal = () => {
    setModalOpen(true);

  };

  const handleBBRFileChange = (event) => {
    setBBRFile(event.target.files[0]);
    setBBRUploadStatus("");
  };

  const handleUploadBBR = async () => {
    if (!bBRFile) {
      setBBRUploadStatus("Please select BBR excel first.");
      return;
    }

    setBBRUploading(true);
    setBBRUploadStatus("");
    try {
      const response = await uploadSalePurchaseFile(bBRFile);
      if (response.status === 200 || response.status === 201) {
        setBBRUploadStatus("File uploaded successfully.");
      } else {
        setBBRUploadStatus("File upload failed. Please try again.");
      }
    } catch (error) {
      setBBRUploadStatus(
        `File upload failed with errors:${error.data.message || ""}`
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
    setBBRUploadStatus(""); // Reset the status
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setYear("");
    setScore("");
    setPushPrice("");
    setApiResponse(null);
    setApiError("");
    setReportYear('0');
    setReportOpen(false);
    setTransmission("");
    setColor("");
  };

  const handleSearch = async () => {
    try {
      const payload = {
        year,
        score,
        push_price: pushPrice,
      };
      const response = await predictVehiclePrice(payload);
      if (response.predicted_price) {
        setApiResponse(response.predicted_price);
        setApiError("");
      } else {
        setApiResponse(null);
        setApiError("Result not found");
      }
    } catch (error) {
      setApiResponse(null);
      setApiError("Error fetching data. Please try again.");
    }
  };
  const handleReport = async () => {
    try {
      const payload = {
        color,
        year: reportYear,
        transmission,
      };
      const response = await generateReport(payload);
      if (response) {
        const blob = new Blob([response], { type: "application/vnd.ms-excel" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report.csv"); // or any filename you want
        document.body.appendChild(link);
        link.click();
        link.remove();
        setApiError("");
        setApiResponse(response);
      } else {
        setApiResponse(null);
        setApiError("Result not found");
      }
    } catch (error) {
      setApiResponse(null);
      setApiError("Error fetching data. Please try again.");
    }
  };
  

  const handleGenerateReport = () => {
    setReportOpen(true);
  }
  return (
    <>
      <Helmet>
        <title>Sale Purchase - BITS</title>
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
          Sale Purchase
        </Typography>
        <Grid item>
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            onClick={handleOpenModal}
            startIcon={<SearchIcon />}
          >
            Price Prediction Search
          </Button>
          <Button
          sx={{ mr: 1 }}
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
            startIcon={<UploadFileIcon />}
          >
            Upload Documents
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateReport}
            startIcon={<Report />}
          >
            Generate Report
          </Button>
          <Box></Box>
          {bBRUploadStatus && (
            <Box sx={{ p: 2 }}>
              <Alert
                severity={
                  bBRUploadStatus.includes("error") ||
                  bBRUploadStatus.includes("failed")
                    ? "error"
                    : "success"
                }
              >
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
          searchApi={searchItems}
        />
      </Grid>

      {/* Upload Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Upload BL Documents</DialogTitle>
        <DialogContent>
          <input
            accept=".xlsx, .xls, .pdf"
            style={{ display: "none" }}
            id="upload-file"
            type="file"
            onChange={handleBBRFileChange}
          />
          <label htmlFor="upload-file">
            <Button
              variant="contained"
              component="span"
              color="primary"
              disabled={bBRUploading}
              sx={{ marginBottom: 2 }}
            >
              Select File
            </Button>
          </label>
          {bBRFile && <Typography variant="body2">{bBRFile.name}</Typography>}
          {bBRUploadStatus && (
            <Alert
              severity={
                bBRUploadStatus.includes("error") ||
                bBRUploadStatus.includes("failed")
                  ? "error"
                  : "success"
              }
            >
              {bBRUploadStatus}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
            disabled={bBRUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUploadBBR}
            color="primary"
            disabled={bBRUploading || !bBRFile}
          >
            {bBRUploading ? <CircularProgress size={24} /> : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Price Prediction Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
      <Slide direction="down" in={modalOpen} mountOnEnter unmountOnExit>
      <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "35%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
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
            Predict Vehicle Price
          </Typography>
          <TextField
            label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Push Price"
            value={pushPrice}
            onChange={(e) => setPushPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Search
          </Button>
          {apiResponse && (
            <Alert severity="success" sx={{ marginTop: 2 }}>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Record Found
                </Typography>
                <Typography variant="body1">
                  {" "}
                  Vehicle Id: {apiResponse.id}
                </Typography>
                <Typography variant="body1">
                  Predication Date: {apiResponse.prediction_date}
                </Typography>
                <Typography variant="body1">
                  Predication Bid Price: {apiResponse.predicted_bid_price}
                </Typography>
              </Box>
            </Alert>
          )}
          {apiError && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {apiError}
            </Alert>
          )}
        </Box>
      </Slide>
        
      </Modal>
      {/* Generate Report Modal */}
      <Modal open={reportOpen} onClose={handleCloseModal}>
      <Slide direction="down" in={reportOpen} mountOnEnter unmountOnExit>
      <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "35%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
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
          <Typography variant="h6" >
           Generate Report 
          </Typography>
          <TextField
            label="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Year"
            value={reportYear}
            onChange={(e) => setReportYear(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Transmission"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleReport}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Generate
          </Button>
          {apiResponse && (
            <Alert severity="success" sx={{ marginTop: 2 }}>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Record Found and Generated Report Successfully
                </Typography>
              </Box>
            </Alert>
          )}
          {apiError && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {apiError}
            </Alert>
          )}
        </Box>
      </Slide>
        
      </Modal>
    </>
  );
};

export default SalePurchase;
