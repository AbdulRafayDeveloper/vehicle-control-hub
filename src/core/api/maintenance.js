import ApiService from "../services/apiService";
export function addMaintenanceService(params){
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/maintenance", null, params)
           .then((response) => {
                resolve(response);
            })
           .catch((e) => {
                reject(e);
            });
    });
}
export function updateMaintenance(params) {
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/maintenance/${params.id}`, null, params)
           .then((response) => {
                resolve(response);
            })
           .catch((e) => {
                reject(e);
            });
    })
}
export function deleteMaintenance(params) {
    return new Promise((resolve, reject) => {
        ApiService.delete(`/v1/maintenance/${params.id}`)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}

export function getMaintenanceServices(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/read_maintenance", null, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}