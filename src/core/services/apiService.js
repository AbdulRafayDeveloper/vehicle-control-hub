import axios from 'axios';
import { destroyToken, getToken, saveToken } from './authService';
import notyf from '../../views/components/NotificationMessage/notyfInstance';
import config from './configService';
import { refreshToken } from '../api/auth';

/**
 * Service to call HTTP request via Axios
 */

const ACCEPTED_ERROR_CODES = [400, 401, 403, 422];
let isRateLimited = false;
let rateLimitTimestamp = 0;
let isRefreshing = false;
let failedRequestsQueue = [];
const processQueue = (error, token = null) => {
  failedRequestsQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedRequestsQueue = [];
};

const getRefreshToken = async () => {
  try {
    const response = await refreshToken(); // Adjust endpoint
    const newToken = response?.access_token;
    saveToken(newToken);
    ApiService.setAuthToken(newToken);
    processQueue(null, newToken);
    return newToken;
  } catch (error) {
    destroyToken();
    processQueue(error, null);
    window.location.href = '/login';
    return null;
  } finally {
    isRefreshing = false;
  }
};
const ApiService = {
  instance: null,
  init(logoutAction) {
    if (!this.instance) {
      this.instance = axios.create();
      this.instance.defaults.baseURL = config.VITE_APP_API_BASE_URL;
      this.instance.defaults.headers['content-type'] = 'application/json';
      this.setupRequestInterceptor();
      this.setupResponseInterceptor(logoutAction);
    }
  },

  // Setup request interceptor
  setupRequestInterceptor() {
    this.instance.interceptors.request.use(
      request => {
        const token = getToken();
        if (token) {
          request.headers.Authorization = `Bearer ${token}`;
        }
        if (this.isRateLimited()) {
          // If rate limited, show notification and reject the promise
          notyf.error('Too many requests. Please wait.');
          return Promise.reject({
            status: 429,
            message: 'Too many requests. Please wait.',
          });
        }
        return request;
      },
      error => {
        return Promise.reject(error);
      }
    );
  },
  // Setup response interceptor
  // setupResponseInterceptor(logoutAction) {
  //   // Check the response status is 401 (Unauthorized) then destroyToken, Logout and Navigate to Login page
  //   this.instance.interceptors.response.use(
  //     response => response,
  //     error => {
  //       if (error.response && error.response.status === 401) {
  //         console.log('Unauthorized access', error);
  //         destroyToken();
  //         typeof logoutAction === 'function'
  //           ? logoutAction()
  //           : (window.location.href = '/login');
  //       } else if (error.response && error?.response?.status === 429) {
  //         // If 429 error, set rate limiting flag and update timestamp
  //         notyf.error('Too many requests. Please wait.');
  //         this.setRateLimit();
  //         // Show notification or handle as needed
  //       }

  //       if (!ACCEPTED_ERROR_CODES.includes(error?.response?.status)) {
  //         // notyf.error('Something Went Wrong');
  //       }

  //       return Promise.reject(error);
  //     }
  //   );
  // },

  setupResponseInterceptor(logoutAction) {
    this.instance.interceptors.response.use(
      response => response, // Return the response if successful
      async error => {
        if (error.response) {
          const { config, response: errorResponse } = error;
          const originalRequest = config;
  
          // Handle 401 Unauthorized error
          if (errorResponse.status === 401) {
            if (!isRefreshing) {
              isRefreshing = true;
              try {
                const newToken = await getRefreshToken();
                if (newToken) {
                  // Set new token to the header and retry the original request
                  originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                  return this.instance(originalRequest);
                }
              } catch (err) {
                // Destroy the token and redirect to login on failure to refresh token
                destroyToken();
                typeof logoutAction === 'function'
                  ? logoutAction()
                  : (window.location.href = '/login');
              } finally {
                isRefreshing = false;
              }
            }
  
            // Queue the failed request for retry after token refresh
            return new Promise((resolve, reject) => {
              failedRequestsQueue.push({ resolve, reject });
            })
            .then(token => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              return this.instance(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
          }
  
          // Handle 429 Too Many Requests error
          if (errorResponse.status === 429) {
            notyf.error('Too many requests. Please wait.');
            this.setRateLimit();
          }
        } else {
          // Handle cases where error.response is undefined (e.g., network errors)
          notyf.error('Network error. Please try again.');
        }
  
        // Reject the promise if any error is not handled specifically above
        return Promise.reject(error);
      }
    );
  },
  
   

  /**
   * Set the default HTTP request headers
   */

  setHeader(header, val) {
    if (this.instance) this.instance.defaults.headers[header] = val;
  },

  // set token  in header
  setAuthToken(token) {
    if (this.instance)
      this.instance.defaults.headers['Authorization'] = `Bearer ${
        token || getToken()
      }`;
  },

  /**
   * Set the default Base URL of api requests
   */

  setDefaultBaseUrl(url = config.VITE_APP_API_BASE_URL) {
    this.instance.defaults.baseURL = url;
  },

  /**
   * Set the default Base URL of api requests =  OTO BAse URL
   */

  setOTOBaseUrl() {
    this.instance.defaults.baseUrl = config.VITE_APP_OTO_BASE_URL;
  },

  /**
   * Check if the user is currently rate limited
   * @returns {boolean}
   */
  isRateLimited() {
    return isRateLimited && Date.now() < rateLimitTimestamp + 10000;
  },

  /**
   * Set the rate limit and update timestamp
   */
  setRateLimit() {
    isRateLimited = true;
    rateLimitTimestamp = Date.now();
  },

  /**
   * Reset the rate limit and timestamp
   */
  resetRateLimit() {
    isRateLimited = false;
    rateLimitTimestamp = 0;
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {*}
   */

  get(resource, slug = '', params = {}, baseURL) {
    return new Promise((resolve, reject) => {
      const url = `${resource}${slug ? `/${slug}` : ''}`;
      if (baseURL) this.setDefaultBaseUrl(baseURL);
      this.instance
        .get(url, { params })
        .then(res => {
          // If successful response, reset the rate limiting flag and timestamp
          this.resetRateLimit();
          resolve(res.data);
        })
        .catch(error => {
          reject(error?.response);
        });

      if (baseURL) this.setDefaultBaseUrl();
    });
  },

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */

  // post(resource, params = {}, slug = '', isFormData = false, baseURL) {
  //   return new Promise((resolve, reject) => {
  //     if (baseURL) this.setDefaultBaseUrl(baseURL);
  //     const headers = isFormData
  //       ? { 'Content-Type': 'multipart/form-data' }
  //       : { 'Content-Type': 'application/json' };
  //     this.instance
  //       .post(`${resource}${slug ? `/${slug}` : ''}`, params, { headers })
  //       .then(res => {
  //         resolve(res.data);
  //       })
  //       .catch(error => {
  //         reject(error?.response);
  //       });
  //     if (baseURL) this.setDefaultBaseUrl();
  //   });
  // },
  post(resource, params = {}, slug = '', isFormData = false, baseURL, headers = {}) {
    return new Promise((resolve, reject) => {
      if (baseURL) this.setDefaultBaseUrl(baseURL);
      const requestHeaders = isFormData
        ? { 'Content-Type': 'multipart/form-data', ...headers }
        : { 'Content-Type': 'application/json', ...headers };
      this.instance
        .post(`${resource}${slug ? `/${slug}` : ''}`, params, { headers: requestHeaders })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error?.response);
        });
      if (baseURL) this.setDefaultBaseUrl();
    });
  },
  

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */

  put(resource,  params = {}, slug = '', isFormData = false, baseURL, headers = {}) {
   
    return new Promise((resolve, reject) => {
      const requestHeaders = isFormData
      ? { 'Content-Type': 'multipart/form-data', ...headers }
      : { 'Content-Type': 'application/json', ...headers };
      this.instance
        .put(`${resource}${slug ? `/${slug}` : ''}`, params, { headers: requestHeaders })
        .then(res => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error?.response);
        });
        if (baseURL) this.setDefaultBaseUrl();
    });
  },

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */

  delete(resource, slug = '', params = {}, isFormData = false, baseURL) {
    return new Promise((resolve, reject) => {
      if (baseURL) this.setDefaultBaseUrl(baseURL);
      this.instance
        .delete(`${resource}${slug ? `/${slug}` : ''}`, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

export default ApiService;
