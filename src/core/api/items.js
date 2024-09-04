import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken();

export function addItem(params){
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/items", params)
       .then((response)=>{
            resolve(response)
        })
    });
 
}
export function getItemById(id){
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/items/${id}`)
       .then((response)=>{
            resolve(response)
        })
        .catch((e)=>{
            reject(e)
        })
    });
}
export function getAllItems(){
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/items")
       .then((response)=>{
            resolve(response)
        })
        .catch((e)=>{
            reject(e)
        })
    });
}
export function finalizeItem(id, params) {
    return new Promise((resolve, reject) => {   
        ApiService.put(`/v1/finalize_sale/${id}`, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function reserveItem(params){
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/reserve_item", params)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    });
}
export function updateItem(id, params){
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/items/${id}`, params)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    });
}
export function deleteItem(id) {
    return new Promise((resolve, reject) => {
        ApiService.delete(`/v1/items/${id}`)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function itemTableSearch(params){
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/item/search",params)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    });
}
export function itemUniversalSearcher(params){
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/item/universal_search",params)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    });
}
export function itemFilterByPrice(params){
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/item/filter_by_price",params)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    });
}
export function itemExportToExcel(){
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/item/export_to_excel", { responseType: "blob" })
       .then((response) => {
            resolve(response);
        })
       .catch((e) => {
            reject(e);
        });
    });
}
export function itemStatusById(id){
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/items/${id}/status`)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    });
    
}
export function updateItemStatus(id){
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/items/${id}/status`)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    });
}
