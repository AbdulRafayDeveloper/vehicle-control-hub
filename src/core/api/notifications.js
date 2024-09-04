import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken(); // Retrieve the token from your auth service
export function readNotificationSpecificUser(params){
    return new Promise ((resolve, reject) => {
        ApiService.get("/v1/notifications", params , '', false, undefined, {
            'Authorization': `Bearer ${token}` // Set the Authorization header
          })
        .then((response)=>{
            resolve(response)
        })
        .catch((e)=>{
            reject(e)
        })
    });

}
export function readAllNotifications(params){
    return new Promise((resolve, reject)=>{
        ApiService.get("/v1/read_all_notifications", null, params)
        .then((response)=>{
            resolve(response)
        })
        .catch((e)=>{
            reject(e)
        })
    })
}
export function setNotificationPreferences(params){
    return new Promise((resolve, reject)=>{
        ApiService.post("/v1/set_notification_preferences", null, params, false, undefined, {
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
export function getNotificationPreferences(params){
    return new Promise((resolve, reject)=>{
        ApiService.get("/v1/notification_preferences", null, params, false, undefined, {
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
export function updateNotificationPreferences(params){
    return new Promise((resolve, reject)=>{
        ApiService.put("/v1/notification_preferences", null, params, false, undefined, {
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