import { createSlice } from '@reduxjs/toolkit';
import { getToken, getUser } from '../../services/authService';

const token = getToken();
const userData = getUser();
const initialState = {
  user: userData,
  // isAuthenticated: token && userData.permissions?.length ? true : false,
   isAuthenticated: token && userData ? true : false,
  apiError: null,
  isLoading: false,
  isDeletingPic: false,
  successMsg: '',
  // accessToken: userData?.accessToken || '',
  // currentPage: 1
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LOADING: state => {
      state.isLoading = true;
    },
    SET_COMPANY: (state,action) => {
      state.company = action.payload;
    },
    CLEAR_LOADING: state => {
      state.isLoading = false;
    },
    LOGIN: (state, action) => {
      return {
        ...state,
        isLoading: false,
        apiError: null,
        isAuthenticated: true,
        user: action.payload,
      };
    },
    LOGOUT: state => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
      state.apiError = null;
    },
    REGISTER: (state, action) => {
      state.isLoading = false;
      state.apiError = null;
      state.user = action.payload;
    },
    VERIFY_EMAIL: state => {
      state.isLoading = false;
      // state.currentPage = parseInt(state.currentPage) + 1;
      state.apiError = null;
    },
    VERIFY_OTP: (state, action) => {
      state.isAuthenticated = true;
      state.user = { ...action.payload };
      state.user.profile_pic = action.payload.profile_pic;
      state.isLoading = false;
      // state.currentPage = 1;
      state.apiError = null;
    },
    UPDATE_PROFILE: (state, action) => {
      state.user = { ...action.payload };
      state.isLoading = false;
      state.isDeletingPic = false;
    },
    DELETING_PROFILE_PIC: (state, action) => {
      state.isDeletingPic = true;
    },
    RESET_PAGE: state => {
      // state.currentPage = 1;
    },
    API_ERROR: (state, action) => {
      return {
        ...state,
        apiError: action.payload,
        isLoading: false,
        // isDeletingPic = false;
      };
    },
    CLEAR_API_ERRORS: state => {
      state.apiError = null;
    },
  },
});
export const {
  LOGIN,
  LOGOUT,
  REGISTER,
  LOADING,
  SET_COMPANY,
  CLEAR_LOADING,
  VERIFY_EMAIL,
  VERIFY_OTP,
  UPDATE_PROFILE,
  DELETING_PROFILE_PIC,
  RESET_PAGE,
  API_ERROR,
  CLEAR_API_ERRORS,
} = authSlice.actions;
export default authSlice.reducer;
