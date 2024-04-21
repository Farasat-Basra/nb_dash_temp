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
export const createLeads = createAsyncThunk(
  "leads/createUser",
  async (body, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/leads/create`, body);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateLeads = createAsyncThunk(
  "leads/updateLeads",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put("/leads/update/:id", values);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const leadVerified = createAsyncThunk(
  "leads/verifyLeads",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put("/leads/verifyLead", values);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const downloadLeadCSV = createAsyncThunk(
  "/apps/leads/downloadCsv",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/leads/downloadCsv", values);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const uploadLeadCSV = createAsyncThunk(
  "/apps/leads/uploadCsv",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/leads/uploadLeads", values);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const moveLeads = createAsyncThunk(
  "/apps/leads/moveFile",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        "/leads/updateFolderIdByLeads",
        values
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteLeads = createAsyncThunk(
  "leads/deleteLeads",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put("/leads/delete", values);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getAllLeads = createAsyncThunk(
  "leads/getAllLeads",
  async (body, { rejectWithValue }) => {
    try {
      if (!body) {
        body = { currentPage: 1, itemsPerPage: 10 };
      }
      const res = await axiosInstance.get(
        `/leads/getAllLeads?page=${body.currentPage}&limit=${body.itemsPerPage}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addTags = createAsyncThunk(
  "/apps/leads/addTags",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/tag/create", values);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getTagsList = createAsyncThunk(
  "/apps/leads/getTagsList",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/tag/get-all-tag", values);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const removeTagsList = createAsyncThunk(
  "/tag/remove",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/tag/remove", values);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getRecentDeleteLeads = createAsyncThunk(
  "/apps/leads/getRecentDeleteLeads",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/leads/recentlyDeleted", values);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  leads: [],
  loading: false,
  renderColumns: [
    {
      value: "Name",
      label: "Name",
    },
    {
      value: "email",
      label: "Email",
    },
    {
      value: "status",
      label: "Status",
    },
    {
      value: "tag",
      label: "Tag",
    },
  ],
  error: null,
  LeadsID: null,
  selectedLeads: [],
  isSelectedLeads: false,
  singleLeads: [],
  tags: [],
  removeTags: [],
  tagLists: [],
  recentDeleteLeads: [],
  leadsPagination: null,
};

const leadsUserSlice = createSlice({
  name: "leadsUser",
  initialState,
  reducers: {
    addColumn: (state, action) => {
      state.renderColumns = action.payload;
    },
    setSelectedLeads: (state, action) => {
      const { value, checked } = action.payload;
      const tags = action.payload.tags.map((item) => item.name);
      const updateSelectedLeads = state.selectedLeads;
      if (checked) {
        if (!state.selectedLeads.includes(value)) {
          state.selectedLeads = [...state.selectedLeads, value];
        }
        tags.length > 0 && state.removeTags.push(...tags);
      } else {
        // (state.selectedLeads = [])
        state.selectedLeads = state.selectedLeads.filter(
          (value) => value !== value
          // console.log("Filter ITEM" , value)
        );
        if (state.selectedLeads.length === 0) {
          state.selectedLeads = [];
        }

        tags.length > 0 &&
          (state.removeTags = state.removeTags.filter(
            (item) => !tags.includes(item)
          ));
      }
      state.isSelectedLeads = state.selectedLeads.length > 0 ? true : false;
    },
    setLeadsID: (state, action) => {
      console.log("payload", action.payload);
      state.LeadsID = action.payload;
    },

    setAllSelectedLeads: (state, action) => {
      const { leadsIds } = action.payload;
      state.selectedLeads = leadsIds;
      state.isSelectedLeads = state.selectedLeads.length > 0 ? true : false;
    },
    setRemoveTags: (state, action) => {
      state.removeTags = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(leadVerified.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(leadVerified.rejected, (state, action) => {
      (state.loading = false), (state.error = action.payload);
      state.leads = [];
    });
    builder.addCase(getLeads.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.leads = [];
    });
    builder.addCase(getLeads.fulfilled, (state, action) => {
      (state.loading = false), (state.error = null);
      state.leads = action.payload.data;
      // state.selectedLeads = [];
    });
    builder.addCase(getLeads.rejected, (state, action) => {
      (state.loading = false), (state.error = action.payload);
    });
    builder.addCase(leadVerified.fulfilled, (state, action) => {
      (state.loading = false), (state.error = null);
      state.leads = action.payload.data;
    });
    builder.addCase(getAllLeads.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.selectedLeads = [];
    });
    builder.addCase(getAllLeads.fulfilled, (state, action) => {
      state.leads = action.payload.data;
      (state.leadsPagination = action.payload.pagination),
        (state.loading = false),
        (state.error = null);
    });
    builder.addCase(getAllLeads.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getSingleLeads.fulfilled, (state, action) => {
      (state.loading = false), (state.error = null);
      state.singleLeads = action.payload.data;
    });
    builder.addCase(getSingleLeads.rejected, (state, action) => {
      (state.loading = false), (state.error = action.payload);
    });
    builder.addCase(getTagsList.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTagsList.fulfilled, (state, action) => {
      state.loading = true;
      state.error = null;
      state.tagLists = action.payload.data;
      // const list = action.payload.data;
      // state.tagLists = list.reduce((arr, item) => {
      //     arr.push({ value:item._id,label:item.name });
      //   return arr;
      // }, []);
    });
    builder.addCase(getTagsList.rejected, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getRecentDeleteLeads.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getRecentDeleteLeads.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.recentDeleteLeads = action.payload.data;
    });
    builder.addCase(getRecentDeleteLeads.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const {
  addColumn,
  setSelectedLeads,
  setAllSelectedLeads,
  setRemoveTags,
  setLeadsID,
} = leadsUserSlice.actions;
export default leadsUserSlice.reducer;
