import ApiService from "../services/apiService";
import { getCurrentDate } from "../utils/helpers";
const currentDate = getCurrentDate(); // Get the current date
// Updated uploadFile function
export function uploadFile ( file) {
  const formData = new FormData();
  formData.append('file', file);

  return new Promise((resolve, reject) => {
    ApiService.post('/v1/user/bl_document' ,formData, '', true, undefined, false)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        reject(e);
      });
  });
}
export function fetchData(params) {
  return new Promise((resolve, reject) => {
    ApiService.get("/v1/user/display_container", null, params)
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
export function dataExtraction(file) {
  const formData = new FormData();
  formData.append('pdf_file', file);

  return new Promise((resolve, reject) => {
    ApiService.post('/v1/data_extraction_report_generation' , formData, '', true, undefined, false)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        reject(e);
      });
  });
}
export function downloadPDFFile(params) {
  return new Promise((resolve, reject) => {
    ApiService.get(`/v1/download_report/${currentDate}/custom_vehicle_chassis_report.pdf`)
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
export function shareablePDFLink(params) {
  return new Promise((resolve, reject) => {
    ApiService.get(`/v1/share_report/${currentDate}/custom_vehicle_chassis_report.pdf`)
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
