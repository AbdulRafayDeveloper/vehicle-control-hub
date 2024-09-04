// import { toast } from 'react-toastify';
import notyf from '../../../views/components/NotificationMessage/notyfInstance'; // Import the Notyf instance

import {
  LOGIN,
  LOGOUT,
  REGISTER,
  LOADING,
  CLEAR_LOADING,
  VERIFY_EMAIL,
  VERIFY_OTP,
  UPDATE_PROFILE,
  API_ERROR,
  DELETING_PROFILE_PIC,
  CLEAR_API_ERRORS,
  SET_COMPANY,
} from './authSlice';
import {
  loginApi,
  logoutApi,
  registerApi,
  verifyOtpApi,
  resetPasswordApi,
  forgetPasswordApi,
  verifyEmailApi,
  updatePasswordApi,
} from '../../api/auth';
import {
  saveToken,
  destroyToken,
  saveUserEmail,
  saveUserName,
  saveUserImage,
  saveUserState,
  saveUserPassword,
  saveUser,
  saveTempToken,
  getTempToken,
  getUser,
  destroyTempKeys,
  saveUserID,
} from '../../services/authService';

import ApiService from '../../services/apiService';
import { handleErrors } from '../../utils/helpers';
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export const login = credentials => {
  return async dispatch => {
    try {
      dispatch({ type: LOADING, payload: {} });
      const response = await loginApi(credentials);
     if(response?.access_token || response?.refresh_token){
      const token = response?.access_token;
      // const Rtoken = response?.refresh_token;
      saveToken(token);
      ApiService.setAuthToken(token);
       // Decode the token
        const decodedToken = parseJwt(token);
        const userInfo = JSON.parse(decodedToken.sub); // parse the stringified user info
        
        // Save user information
        const user = {
          // ...response,
          ...userInfo, // merge the decoded user info into the user object
        };
      saveUser(user);

      dispatch({
        type: LOGIN,
        payload: { ...user, name: user.username },
      });
      notyf.success('Login successful ');
     }
     else{
      notyf.error(response?.error || response?.data?.detail || 'Wrong Credentials');
     }
    } catch (error) {
      dispatch({ type: API_ERROR, payload: error });
      if (!error?.data?.message?.credentials)
        notyf.error(error?.data?.detail || 'Something went wrong');
    }
  };
};

export const register = (credentials, cb) => {
  console.log('register credentials', credentials);
  return async dispatch => {
    try {
      dispatch({ type: LOADING, payload: {} });
      const resp = await registerApi(credentials);
      // toastr.success(resp?.message)
      notyf.success(`${resp?.Message}! `);

      dispatch({ type: REGISTER, payload: resp });
      if (typeof cb === 'function') {
        cb();
      }
    } catch (error) {
      console.error('Error in register action:', error); // Add this line for debugging
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
      notyf.error(error?.data?.detail[0].msg||error?.data?.detail || 'Something went wrong');
      if (typeof cb === 'function') {
        cb('catch');
      }
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      dispatch({ type: LOADING, payload: {} });
      const resp = await logoutApi();
      notyf.success(`${resp?.msg}! `);
      dispatch({ type: LOGOUT }); 
      destroyToken();
      location.reload();
      // toast.success('Logged out');
    } catch (error) {
      location.href('/login');
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};

// export const getCompany = () => {
//   return async dispatch => {
//     try {
//       const resp = await getDefaultCompany();
//       dispatch({ type: SET_COMPANY, payload: resp?.data});
//     } catch (error) {
//     }
//   };
// };

export const verifyEmail = (email, cb) => {
  return async dispatch => {
    try {
      dispatch({ type: LOADING, payload: {} });
      await verifyEmailApi(email);
      saveUserEmail(email);
      dispatch({ type: VERIFY_EMAIL, payload: email });
      if (typeof cb === 'function') cb();
    } catch (error) {
      // console.print('Something went wrong in login', error);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};

export const verifyOtp = credentials => {
  return async dispatch => {
    try {
      dispatch({ type: LOADING, payload: {} });
      await verifyOtpApi(credentials);
      let temp_token = getTempToken();
      let user = getUser();
      dispatch({ type: VERIFY_OTP, payload: { ...user } });
      destroyTempKeys(); // destroy user password and temporary token after login success
      saveToken(temp_token); // stores temporary token in right key to be used later for calling protected apis
      // toast.success('Login Successful');
    } catch (error) {
      // console.print('Something went wrong in login', error);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};

export const resetPassword = (credentials, cb) => {
  return async dispatch => {
    try {
      dispatch({ type: LOADING, payload: {} });
      const resp = await resetPasswordApi(credentials);
      //  toastr.success(resp.message)
      notyf.success(`${resp?.message}! `);

      dispatch({ type: CLEAR_LOADING, payload: {} });
      // toast.success('Password Changed Successfully');
      if (typeof cb === 'function') cb();
    } catch (error) {
      // console.print('Something went wrong in login', error);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};

export const forgetPassword = (credentials, cb) => {
  return async dispatch => {
    try {
      dispatch({ type: LOADING, payload: {} });
      const resp = await forgetPasswordApi(credentials);
      // toastr.success(resp?.message);
      notyf.success(`${resp?.message}! `);
      dispatch({ type: CLEAR_LOADING, payload: {} });
      if (typeof cb === 'function') cb();
    } catch (error) {
      // handleErrors(error?.data?.message);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};

export const updateProfile = formData => {
  return async dispatch => {
    try {
      dispatch({ type: LOADING, payload: {} });
      let response = await updateProfileApi(formData);
      dispatch({ type: UPDATE_PROFILE, payload: response });
      saveUser(response);
      // toast.success('Profile Updated Successfully');
    } catch (error) {
      // console.print('Something went wrong in updateProfile', error);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};

export const updatePassword = data => {
  return async dispatch => {
    try {
      dispatch({ type: LOADING, payload: {} });
      await updatePasswordApi(data);
      // toast.success('Password Updated Successfully');

      dispatch({ type: CLEAR_LOADING, payload: {} });
      dispatch({ type: CLEAR_API_ERRORS, payload: {} });
    } catch (error) {
      // console.print('Something went wrong in updatePassword', error);
      dispatch({ type: API_ERROR, payload: error?.data?.errors });
    }
  };
};

