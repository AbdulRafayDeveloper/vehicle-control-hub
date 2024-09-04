import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'English', // default language
  languageId: 2,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguageRedux: (state, action) => {
      state.language = action.payload;
    },
    setLanguageIdRedux: (state, action) => {
      state.languageId = action.payload;
    },
  },
});

export const { setLanguageRedux, setLanguageIdRedux } = languageSlice.actions;
export default languageSlice.reducer;