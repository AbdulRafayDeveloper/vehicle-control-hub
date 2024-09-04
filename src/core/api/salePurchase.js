import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken();

export function uploadSalePurchaseFile ( file) {
    const formData = new FormData();
    formData.append('file', file);
  
    return new Promise((resolve, reject) => {
        ApiService.post('/v1/clean_insert_data')
    //   ApiService.post('/v1/user/bl_document' ,formData, '', true, undefined, false)
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  export function searchingVehicles(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/purchase_sales_search", params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
  }
  export function predictVehiclePrice(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/predict_price", params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
  }
  export function fetchVehiclesById(id){
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/vehicle_details/${id}`)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    })
 
}
export function getSalePurchaseData(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/display_all_data",params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function searchItems(params) {
    return new Promise((resolve, reject) => {
      ApiService.post('/v1/purchase_sales_search', params)
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
  export function generateReport(params) {
    return new Promise((resolve, reject) => {
      ApiService.post('/v1/generate-report', params)
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
  export function biddingRecommendation(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/bidding_recommendations", params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
  }