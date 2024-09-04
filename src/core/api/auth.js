import ApiService from "../services/apiService";
import { getToken } from "../services/authService";
export function loginApi({ phonenumber, password, role }) {
  return new Promise((resolve, reject) => {
    ApiService.post("/v1/user/signin", {
      phonenumber,
      password,
      role
    })
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function registerApi(credentials) {
  return new Promise((resolve, reject) => {
    ApiService.post(`/v1/user/signup`, credentials , '',  false, false )
      .then((response) => {
        // console.print('file: auth.module.js | register| response', response);
        resolve(response);
      })
      .catch((e) => {
        // console.print('Console Log: : error', e);
        reject(e);
      });
  });
}

export function logoutApi() {
  const token = getToken(); // Retrieve the token from your auth service

  return new Promise((resolve, reject) => {
    ApiService.post("/v1/user/signout", {}, '', false, undefined, {
      'Authorization': `Bearer ${token}` // Set the Authorization header
    })
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function verifyEmailApi(email) {
  return new Promise((resolve, reject) => {
    ApiService.post("verify-email", {
      email,
      // formData,
    })
      .then((response) => {
        console.print(
          "file: auth.module.js | verifyEmailApi| response",
          response
        );
        resolve(response.data);
      })
      .catch((e) => {
        // console.print("Console Log: : error", e);
        reject(e);
      });
  });
}

export function verifyOtpApi({ otp }) {
  return new Promise((resolve, reject) => {
    ApiService.post("verify-otp", {
      otp_code: otp,
    })
      .then((response) => {
        console.print(
          "file: auth.module.js | verifyOtpApi| response",
          response
        );
        resolve(response.data);
      })
      .catch((e) => {
        console.print("Console Log: : error", e);
        reject(e);
      });
  });
}

export function forgetPasswordApi(email) {
  return new Promise((resolve, reject) => {
    ApiService.post("/v1/user/forgotpassword", {
      ...email,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function resetPasswordApi(credentials) {
  // console.log('credentials' , credentials)
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const email = params.get("email");

 const updatedCredentials = {
    ...credentials,
    email,
    token
  };
  return new Promise((resolve, reject) => {
    ApiService.post("/v1/user/reset-password" , updatedCredentials)
      .then((response) => {
        // console.print(
        //   'file: auth.module.js | resetPasswordApi| response',
        //   response
        // );
        resolve(response);
      })
      .catch((e) => {
        // console.print("Console Log: : error", e);
        reject(e);
      });
  });
}

export function updatePasswordApi(data) {
  return new Promise((resolve, reject) => {
    ApiService.post("change-password", data)
      .then((response) => {
        console.print(
          "file: auth.module.js | updateProfileApi| response",
          response
        );
        resolve(response.data);
      })
      .catch((e) => {
        console.print("Console Log: : error", e);
        reject(e);
      });
  });
}
export function refreshToken() {
  const token = getToken(); // Retrieve the token from your auth service
  return new Promise((resolve, reject) => {
    ApiService.post("/v1/user/refreshtoken", {}, '', false, undefined, {
      'Authorization': `Bearer ${token}` // Set the Authorization header
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}