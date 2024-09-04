import ApiService from "../services/apiService";

export function getOperationalMetrics(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/operational_metrics_report", null, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}