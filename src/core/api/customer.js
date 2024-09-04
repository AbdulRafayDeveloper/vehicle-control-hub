import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken(); // Retrieve the token from your auth service

export function setCustomerInterest(params){
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/interests/", null, params, false, undefined, {
            'Authorization': `Bearer ${token}` // Set the Authorization header
        })
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e);
        });
    });
 
}

export function getCustomerInterest(params){
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/interests/${params.id}`, null, params)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e);
        });
    });
}

export function addCustomer(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/customers", params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}

export function getCustomerById(id) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/customers/${id}`)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function getAllCustomers() {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/customers")
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export  function updateCustomer(id, params) {
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/customers/${id}`, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}

export function deleteCustomer(id) {
    return new Promise((resolve, reject) => {
        ApiService.delete(`/v1/customers/${id}`)
            .then((response) => {  
                 resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}