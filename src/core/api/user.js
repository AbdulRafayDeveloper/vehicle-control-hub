import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken();

export function userActivity(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/user/user_activity", null, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function userPurchse(params){
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/user/purchases", params, '', false, undefined, {
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