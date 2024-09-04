import  { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import MUIButton from '../Button/MUIButton';
import {  Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FILE_TYPES } from '../../../core/utils/constants';
import FileUploadModal from './FileUploadModal.jsx';
import config from '../../../core/services/configService.js';
function FileUpload({
	accept,
	onSave,
	maxSize = 5,
	allowedFiles = [
		FILE_TYPES.pdf.contentType,
		FILE_TYPES.csv.contentType,
		FILE_TYPES.xls.contentType,
		FILE_TYPES.xlsx.contentType,
	],
}) {


	const [isDialogOpen, setDialogOpen] = useState(false);

	const handleOpenDialog = () => {
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
	};

	return (
    <Box>
      <MUIButton
        startIcon={<SendIcon />}
        sx={{
          border: '1px solid grey',
          color: 'black',
          textTransform: 'capitalize',
        }}
        onClick={handleOpenDialog}
        variant='outlined'
        component='span'
        fullWidth>
        Upload File
      </MUIButton>

      <Typography variant='caption'>
        Maximum of {config.MAX_NUMBER_OF_FILES_ALLOWED} files, each up to{' '}
        {config.MAX_FILE_SIZE}MB in size allowed
      </Typography>
      <FileUploadModal
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        accept={accept}
        onSave={onSave}
        maxSize={maxSize}
        allowedFiles={allowedFiles}
      />
    </Box>
  );
}

export default FileUpload;
