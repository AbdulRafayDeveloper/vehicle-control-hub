import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken();
export function addUserFeedback(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/user/feedback", params, "", false, undefined, {
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
export function getAllUsersFeedback(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/user/feedback")
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}