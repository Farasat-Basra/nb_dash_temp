import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utility/axiosInstance";


export const getLeads = createAsyncThunk(
  "leads/getUser",
  async (values, { rejectWithValue }) => {
    try {
      // console.log('DDDDDDDDDDDDDDDDDDDDD', values)
      console.log("values", values.id);
      const res = await axiosInstance.get(
        `/leads/getLeadByFolderId/${values.id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getSingleLeads = createAsyncThunk(
  "leads/getSingleLead",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/leads/single/${values.id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


const initialState = {
  users: [],
  allUsers:[],
  loading: false,
  error: null,
};

const leadsUserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // ** pending
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    // ** fulfilled
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        state.allUsers = action.payload.data;
      });

      // ** rejected
    builder.addCase(getAllUsers.rejected, (state, action) => {
      (state.loading = false), (state.error = action.payload);
      state.leads = [];
    });

  },
});
export const {} = leadsUserSlice.actions;
export default leadsUserSlice.reducer;
