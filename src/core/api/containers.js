import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken();

export function addContainer(params){
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/create_container/", params, '', false, undefined, {
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
export function fetchContainer(params){
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/get_all_containers`, params)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    })
 
}
export function fetchContainerById(id){
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/containers/${id}`)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    })
 
}
export function updateContainer(id, params){
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/containers/${id}`, params, '', false, undefined, {
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
export function updateContainerLocation(id){
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/containers/${id}/location`)
       .then((response)=>{
         resolve(response)
        })
       .catch((e)=>{
         reject(e)
        })
    })
}
export function loadingContainerQRScan(params){
    return new Promise((resolve, reject) => {
        ApiService.post(`/v1/loading-container/process-qrcode`,params)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    })
}