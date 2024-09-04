import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken();

export function verifyAgreement(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/verify_agreement", params, "", false, undefined, {
            "Authorization": `Bearer ${token}`,
        })
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function getTermsOfAgreement(params){
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/terms-and-services", params)
            .then((response) => {
                resolve(response);
            })
           .catch((e) => {
                reject(e);
            });
    });    
 
}

export function agreeTermsOfAgreement(params){
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/agree-to-terms", params, "", false, undefined, {
            "Authorization": `Bearer ${token}`,
        })
            .then((response) => {
                resolve(response);
            })
           .catch((e) => {
                reject(e);
            });
    });    
 
}
   