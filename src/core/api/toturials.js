import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken();

export function createUpdateProgress(params){
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/tutorial/progress", params, '', false, undefined, {
            'Authorization': `Bearer ${token}` // Set the Authorization header
          })
       .then((response)=>{
            resolve(response)
        })
    });
 
}
export function completeProgress(params){
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/tutorial/complete", params, '', false, undefined, {
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
 export function getProgress(params){
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/tutorial/progress", params, '', false, undefined, {
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