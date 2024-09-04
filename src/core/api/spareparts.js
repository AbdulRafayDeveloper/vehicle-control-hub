import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken();
export function getSpareParts(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/user/display_spareparts", null, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function getSparePartsById(id) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/user/${id}/display_spareparts`,)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function getSparePartReports(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/spareparts_report", null, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function addSpareParts(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/user/spareparts", params, '', false, undefined, {
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

export function updateSpareParts(id, params) {
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/user/spareparts/${id}`, params, '', false, undefined, {
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