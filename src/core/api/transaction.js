import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken()

export function transactionForCustomer(params){
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/transactions", params)
       .then((response)=>{
            resolve(response)
        })
    })  // End of Promise
}
export function getTransactionById(id){
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/transactions/${id}`)
       .then((response)=>{
            resolve(response)
        })
        .catch((e)=>{
            reject(e)
        })
    })  // End of Promise
}