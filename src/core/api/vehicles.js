import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken(); // Retrieve the token from your auth service
export function getVehicles(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/user/display_vehicles", null, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function addVehicles(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/user/vehicles", params, '', false, undefined, {
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
export function updateVehicles(id, params) {
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/user/vehicles/${id}`, params, '', false, undefined, {
            'Authorization': `Bearer ${token}` // Set the Authorization header
          })
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    })
}
export function getVehiclesReports(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/vehicles_report", null, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function searchVehicleChassis(chassis_number) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/status-barcode-chassisnumber", chassis_number)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function searchVehicleQR(qrcode) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/status-barcode-chassisnumber", qrcode)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function fetchVehiclesById(id){
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/user/vehicles_return/${id}`)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    })
 
}
export function uploadVehicleFile ( file) {
    const formData = new FormData();
    formData.append('file', file);
  
    return new Promise((resolve, reject) => {
        ApiService.post('/v1/clean_insert_data')
    //   ApiService.post('/v1/user/bl_document' ,formData, '', true, undefined, false)
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    });
  }