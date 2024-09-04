import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken();

export function createAuctions(params) {    
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/auctions", params, null, false, undefined, {
            'Authorization': `Bearer ${token}`
        })
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    });
}
export function addItemsToAuctions( params){
    return new Promise((resolve, reject) => {
        ApiService.post(`/v1/auctions/${params.id}/items`, params)
        .then((response)=>{
            resolve(response)
        })
        .catch((e)=>{
            reject(e)
        })
    });

}
export function updateAuctions(params) {
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/auctions/${params.auction_id}`, null, params)
        .then((response)=>{
            resolve(response)
        })

        .catch((e)=>{
            reject(e)
        })
    });

}
export function delateAuctions(params){
    return new Promise((resolve, reject) => {
        ApiService.delete(`/v1/auctions/${params.auction_id}`)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    });
}
export function addOfferNegotiation(params){
    return new Promise((resolve, reject) => {
        ApiService.post(`/v1/negotiation_offers`, params, null, false, undefined, {
            'Authorization': `Bearer ${token}`
        })
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    });
}
export function counterOfferNegotiation( params){
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/offers/${params.id}/counter`, params, null, false, undefined, {
            'Authorization': `Bearer ${token}`
        })
        .then((response)=>{
            resolve(response)
        })
        .catch((e)=>{
            reject(e)
        })
    });

}
export function offerAccept( params){
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/offers/${params.id}/accept`, params, null, false, undefined, {
            'Authorization': `Bearer ${token}`
        })
        .then((response)=>{
            resolve(response)
        })
        .catch((e)=>{
            reject(e)
        })
    });

}
export function offerReject( params){
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/offers/${params.id}/reject`, params, null, false, undefined, {
            'Authorization': `Bearer ${token}`
        })
        .then((response)=>{
            resolve(response)
        })
        .catch((e)=>{
            reject(e)
        })
    });

}
export function createBidLiveNegotiation( params){
    return new Promise((resolve, reject) => {
        ApiService.post(`/v1/create_bid`, params, null, false, undefined, {
            'Authorization': `Bearer ${token}`
        })
        .then((response)=>{
            resolve(response)
        })
        .catch((e)=>{
            reject(e)
        })
    });

}
export function biddingRecommendation(params){
    return new Promise((resolve, reject) => {
        ApiService.post(`/v1/bidding_recommendations`, params)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    });
}