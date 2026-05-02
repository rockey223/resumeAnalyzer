import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "report",
  initialState: { report: null },
  reducers: {
    setReport: (state, action) => {
        console.log(action.payload);
        
      state.report = {...action.payload};
    },
    removeReport: (state) => {
      state.report = null;
    }
  },
});

export default reportSlice.reducer;
export const { setReport, removeReport } = reportSlice.actions;
