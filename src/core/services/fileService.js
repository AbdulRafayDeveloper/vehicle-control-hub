import {
  MAX_FILE_SIZE_ALLOWED_IN_MB,
  MAX_NUMBER_OF_FILES_ALLOWED,
} from '../utils/constants';
import { filterFiles } from '../utils/helpers';

class FileService {
  constructor({
    maxSize = MAX_FILE_SIZE_ALLOWED_IN_MB,
    numberOfFiles = MAX_NUMBER_OF_FILES_ALLOWED,
    allowedFiles,
    onFileInput,
  }) {
    this.maxSize = maxSize;
    this.numberOfFiles = numberOfFiles;
    this.allowedFiles = allowedFiles;
    this.onChange = onFileInput;

    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.handleFileDrag = this.handleFileDrag.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
  }
  fileFilteration(files) {
    if (files?.length > 0) {
      const { validFiles, errors } = filterFiles(
        files,
        this.allowedFiles,
        this.maxSize,
        this.numberOfFiles
      );
      this.onChange(validFiles, errors);
    }
  }
  handleFileInputChange(event) {
    event.preventDefault();
    const files = event.target.files;
    this.fileFilteration(files);
  }
  handleFileDrag(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.fileFilteration(files);
  }
  handlePaste(event) {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const files = Array.from(clipboardData.files);
    this.fileFilteration(files);
  }
}

export default FileService;
