import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import authReducer from './auth/authSlice';
import appReducer from './app/appSlice';
import languageReducer from './language/languageSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    language: languageReducer,
    // Add additional reducers for other features here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
