import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken();
export function updateVehicleAfterContainerYard(id, params) {
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/vehicle/${id}/update`, params, '', false, undefined, {
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
export function updateSparePartAfterContainerYard(id, params) {
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/sparepart/${id}/update`, params, '', false, undefined, {
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
export function updateContainerAfterContainerYard(id, params) {
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/container/${id}/status-at-yard`, params, '', false, undefined, {
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
export function uploadVehicleFileAfterContainerYard ( id, file) {
    const formData = new FormData();
    formData.append('file', file);
  
    return new Promise((resolve, reject) => {
      ApiService.post(`/v1/vehicle/${id}/upload` ,formData, '', true, undefined, false)
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
  export function reportConfirmAfterContainerYard(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/report/confirm", params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function reportDraftAfterContainerYard(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/report/draft", params)
            .then((response) => {
                resolve(response);  
            })
            .catch((e) => {
                reject(e);
            });
    });

}
