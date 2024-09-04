import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken(); // Retrieve the token from your auth service
export function generateBarCode(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/generate-barcode", params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function bulkQrCode(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/generate-bulk-barcodes", params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function scanBarCode(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/scan-barcode", params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function auditBarCode(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/audit_barcode_scan", params, '', false, undefined, {
            'Authorization': `Bearer ${token}` // Set the Authorization header
          })
          .then((response) => {
            resolve(response);
          })
          .catch((e) => {
            reject(e);
          });
    });
}

export function scanBarCodeWithStatus(params){
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/status-barcodescanner-webapp", params)
       .then((response) => {
            resolve(response);
        })
       .catch((e) => {
            reject(e);
        });
    });
}
export function uploadVehicleSparePartByScanning(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/upload-status-overseas", params)
        .then((response) => {
            resolve(response);
        })
        .catch((e) => {
            reject(e);
        });
    });
}
export function qrCodeScanRedirectToItem(params){
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/process-qrcode", params)
       .then((response) => {
            resolve(response);
        })
       .catch((e) => {
            reject(e);
        });
    });
}