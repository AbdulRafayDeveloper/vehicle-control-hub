import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken();
export function createPayPalPaymentRequest(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/create-payment", params, null, false, undefined, {
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

export function executePayPalPaymentDetails(params) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/v1/execute-payment`, params, null, false, undefined, {
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