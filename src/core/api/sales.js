import ApiService from "../services/apiService";

export function getSalesReport(params) {  
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/sales_revenue_report", null, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}