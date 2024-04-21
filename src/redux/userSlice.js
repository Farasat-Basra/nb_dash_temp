import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utility/axiosInstance";

export const createUser = createAsyncThunk(
  "/admin/create/user",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/admin/create/user`, body);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "/admin/get/all/users",
  async (body, { rejectWithValue }) => {
    try {
      if (!body) {
        body = { currentPage: 1, itemsPerPage: 10 };
      }
      const res = await axiosInstance.get("/admin/get/all/users");
        // `/leads/getAllLeads?page=${body.currentPage}&limit=${body.itemsPerPage}`
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  users: [],
  allUsers: [],
  userID: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserID: (state, action) => {
      console.log("payload", action.payload);
      state.userID = action.payload;
    }

  },
  extraReducers: (builder) => {
    // ** pending
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    // ** fulfilled
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false, 
      state.error = null;
      state.allUsers = action.payload.data;
    });

    // ** rejected
    builder.addCase(getAllUsers.rejected, (state, action) => {
      (state.loading = false), (state.error = action.payload);
      state.leads = [];
    });
  },
});
export const {setUserID} = userSlice.actions;
export default userSlice.reducer;
