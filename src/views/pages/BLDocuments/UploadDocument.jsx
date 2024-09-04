import React, { useState } from 'react';
import {
  Grid,
  Box,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import MReactTable from '../../components/DataTable/MaterialReactTable';
import {
  uploadFile,
  fetchData,
  dataExtraction,
  downloadPDFFile,
  shareablePDFLink,
} from '../../../core/api/blDocuments';

const dummyData = [
  { displayName: 'John Doe', companyName: 'Doe Enterprises', email: 'john.doe@example.com', phone: '123-456-7890', receivable: '$1,000', unusedCredits: '$200', status: 'Active' },
  { displayName: 'Jane Smith', companyName: 'Smith Co.', email: 'jane.smith@example.com', phone: '987-654-3210', receivable: '$2,500', unusedCredits: '$500', status: 'Inactive' },
  { displayName: 'Alice Johnson', companyName: 'Johnson LLC', email: 'alice.johnson@example.com', phone: '555-123-4567', receivable: '$3,000', unusedCredits: '$300', status: 'Active' },
  { displayName: 'Bob Brown', companyName: 'Brown Industries', email: 'bob.brown@example.com', phone: '444-555-6666', receivable: '$750', unusedCredits: '$100', status: 'Active' },
  { displayName: 'Carol White', companyName: 'White Corp', email: 'carol.white@example.com', phone: '222-333-4444', receivable: '$1,200', unusedCredits: '$150', status: 'Inactive' },
];

const initialColumns = [
  { accessorKey: 'displayName', header: 'Display Name' },
  { accessorKey: 'companyName', header: 'Company Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Phone' },
  { accessorKey: 'receivable', header: 'Receivable' },
  { accessorKey: 'unusedCredits', header: 'Unused Credits' },
  { accessorKey: 'status', header: 'Status' },
];

const UploadDocument = () => {
  const [bBRFile, setBBRFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const [tableData, setTableData] = useState(dummyData);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [extractModalOpen, setExtractModalOpen] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isExtractMode, setIsExtractMode] = useState(false);

  const handleFileChange = (event) => {
    setBBRFile(event.target.files[0]);
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!bBRFile) {
      setUploadStatus('Please select a file first.');
      return;
    }
    setUploading(true);
    try {
      const response = isExtractMode ? await dataExtraction(bBRFile) : await uploadFile(bBRFile);
      if (response) {
        if (isExtractMode) {
          const blob = new Blob([response], { type: 'application/pdf' });
          setExtractedData(URL.createObjectURL(blob));
          setUploadStatus('File processed successfully.');
        } else {
          const data = await fetchData();
          setTableData(data);
          setUploadStatus('File uploaded successfully.');
        }
      }
    } catch (error) {
      setUploadStatus(`Operation failed: ${error.message}`);
    } finally {
      setUploading(false);
      if (!isExtractMode) handleDialogClose();
    }
  };

  const handleDownload = async () => {
    try {
      const response = await downloadPDFFile();
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Extracted.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      setUploadStatus('File downloaded successfully.');
    } catch (error) {
      setUploadStatus(`Download failed: ${error.message}`);
    }
  };

  const handleShare = async () => {
    try {
      await shareablePDFLink();
      setUploadStatus('File shared successfully.');
    } catch (error) {
      setUploadStatus(`Share failed: ${error.message}`);
    }
  };

  const handleDialogOpen = (extractMode = false) => {
    setIsExtractMode(extractMode);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setBBRFile(null);
    setExtractedData(null);
    setUploadStatus('');
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 1 }}>
          <Typography variant='h6'>Active BL Documents</Typography>
          <Box>
            <Button sx={{ mr: 1 }} variant='contained' color='primary' onClick={() => handleDialogOpen(true)}>
              Extract Chassis Number
            </Button>
            <Button variant='contained' color='primary' onClick={() => handleDialogOpen(false)}>
              Upload
            </Button>
          </Box>
        </Box>
        {uploadStatus && (
          <Box sx={{ p: 2 }}>
            <Alert severity={uploadStatus.includes('error') || uploadStatus.includes('failed') ? 'error' : 'success'}>
              {uploadStatus}
            </Alert>
          </Box>
        )}
        <MReactTable
          columns={initialColumns}
          data={tableData}
          setSelectedRows={setSelectedRows}
          enableRowSelection={false}
          refresh={refresh}
          loading={loading}
          manualFilter
        />
      </Grid>

      {/* Dialog for both Upload and Extraction */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
        <DialogTitle>{isExtractMode ? 'Extract Chassis Number' : 'Upload Vehicle Documents'}</DialogTitle>
        <DialogContent>
          <input
            accept='.xlsx, .xls, .pdf'
            style={{ display: 'none' }}
            id='upload-file'
            type='file'
            onChange={handleFileChange}
          />
          <label htmlFor='upload-file'>
            <Button
              variant='contained'
              component='span'
              color='primary'
              disabled={uploading}
              sx={{ marginBottom: 2 }}
            >
              Select File
            </Button>
          </label>
          {bBRFile && <Typography variant='body2'>{bBRFile.name}</Typography>}
          {uploadStatus && (
            <Alert
              severity={uploadStatus.includes('error') || uploadStatus.includes('failed') ? 'error' : 'success'}
            >
              {uploadStatus}
            </Alert>
          )}
          {extractedData && isExtractMode && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant='h6'>Extracted Data:</Typography>
              <iframe src={extractedData} width="100%" height="100%" />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color='secondary' disabled={uploading}>
            Cancel
          </Button>
          <Button onClick={handleUpload} color='primary' disabled={uploading || !bBRFile}>
            {uploading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
          {extractedData && isExtractMode && (
            <>
              <Button onClick={handleDownload} color='primary'>
                Download File
              </Button>
              <Button onClick={handleShare} color='primary'>
                Share File
              </Button>
            </>
          )}
        </DialogActions>
</Dialog>
</Grid>
);
};

export default UploadDocument;
