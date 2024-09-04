import { createSlice } from '@reduxjs/toolkit';
import { SIDEBAR_EXPAND, SIDEBAR_EXPAND_On_Hover } from '../../utils/constants';

const initialState = {
  sidebar: {
    isExpanded: SIDEBAR_EXPAND,
    isHovering: SIDEBAR_EXPAND_On_Hover,
  },
  activeModule:'',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.isExpanded = !state.sidebar.isExpanded;
    },
    TOGGLE_SIDEBAR_HOVER: (state, action) => {
      state.sidebar.isHovering = action.payload;
    },
    SET_ACTIVE_MODULE: (state, action) => {
      state.activeModule = action.payload;
    },
  },
});

export const { TOGGLE_SIDEBAR, TOGGLE_SIDEBAR_HOVER, SET_ACTIVE_MODULE } =
  appSlice.actions;
export default appSlice.reducer;
