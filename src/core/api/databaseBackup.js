import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken();
export function getDatabaseBackup(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/database/backup-db")
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}

export function restoreDatabaseBackup(params) {
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/backups/restore", params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}

export function getDatabaseData(params) {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/backups/retrive", null, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });
}