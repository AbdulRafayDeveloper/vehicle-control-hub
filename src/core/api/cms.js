import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
const token = getToken();
export function createBlogPost(params){
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/blogposts", params)
       .then((response)=>{
            resolve(response)
        })
        .catch((e)=>{
            reject(e)
        })
    })  // End of Promise
 
}
export function updateBlogPost(id, params){
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/blogposts/${id}`, params)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    })  // End of Promise
}

export function deleteBlogPost(id){
    return new Promise((resolve, reject) => {
        ApiService.delete(`/v1/blogposts/${id}`)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });  // End of Promise
}

export function getAllBlogPosts(){
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/get_all_blogposts")
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    })  // End of Promise
}
export function getBlogPostsById(id){
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/blogposts/${id}`)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    })  // End of Promise
}

export function createStaticContent(params){
    return new Promise((resolve, reject) => {
        ApiService.post("/v1/staticcontent", params)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    })  // End of Promise
}

export function updateStaticContent(id, params){
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/staticcontent/${id}`, params)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    })  // End of Promise
}

export function deleteStaticContent(id){
    return new Promise((resolve, reject) => {
        ApiService.delete(`/v1/staticcontent/${id}`)
            .then((response) => {
                resolve(response);
            })
           .catch((e) => {
                reject(e);
            });
    });  // End of Promise
}

export function getAllStaticContent(){
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/all_staticcontent")
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    })  // End of Promise
}

export function getStaticContentById(id){
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/staticcontent/${id}`)
       .then((response)=>{
            resolve(response)
        })
       .catch((e)=>{
            reject(e)
        })
    })  // End of Promise
}
export function createMediaFile(params) {
    const formData = new FormData();
    formData.append('file', params.file);
    formData.append('file_type', params.file_type);
    formData.append('blog_post_fk_id', params.blog_post_fk_id);
    formData.append('static_content_fk_id', params.static_content_fk_id);

    return new Promise((resolve, reject) => {
        ApiService.post("/v1/mediafile", formData)  // Send the formData instead of params
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });  // End of Promise
}
export function getAllMediaFiles() {
    return new Promise((resolve, reject) => {
        ApiService.get("/v1/mediafiles")
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });  // End of Promise
}
export function getMediaFilesById(id) {
    return new Promise((resolve, reject) => {
        ApiService.get(`/v1/mediafiles/${id}`)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });  // End of Promise
}
 export function deleteMediaFile(id) {
    return new Promise((resolve, reject) => {
        ApiService.delete(`/v1/mediafiles/${id}`)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });  // End of Promise
 }
 export function updateMediaFile(id, params) {
    return new Promise((resolve, reject) => {
        ApiService.put(`/v1/mediafiles/${id}`, params)
            .then((response) => {
                resolve(response);
            })
            .catch((e) => {
                reject(e);
            });
    });  // End of Promise
 }