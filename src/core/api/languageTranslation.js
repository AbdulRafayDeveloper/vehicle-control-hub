import ApiService from "../services/apiService";

export function getLanguages(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/languages", null, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}

export function translateVehicles(id, params) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/v1/vehicles/${id}/translation`, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function translateSpareParts(id, params) {
    return new Promise((resolve, reject) => {
        ApiService.post(`/v1/spareparts/${id}/translation`, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function allVehicleTranslation(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/vehicles/translation", null, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}

export function allSparePartTranslation(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/parts/translation", null, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function specificVehicleTranslation(id, params) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/vehicles/${id}/translation`, null, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}
export function specificSparePartTranslation(id, params) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/spareparts/${id}/translation`, null, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}