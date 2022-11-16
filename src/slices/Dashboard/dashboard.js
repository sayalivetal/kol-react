import { createReducer, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../common/apis";

const initialState = {
  biodata: {},
  message: "",
  statusCode: "",
  isSuccess: false,
  announcement: {},
};

//API Integration with action for dashboard form submission
export const bioDataFormSubmission = createAsyncThunk(
  "dashboard/biodata/submit",
  async (formData, thunkAPI) => {
    // const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API}/kol-profile/add-update`, {
        method: "POST",

        body: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getKolprofile = createAsyncThunk(
  "dashboard/profile/view",
  async (thunkAPI) => {
    try {
      const response = await fetch(`${API}/kol-profile/view-details`, {
        method: "GET",

        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

//API Integration with action for dashboard annoucement form submission
export const announceDataFormSubmission = createAsyncThunk(
  "dashboard/announcement/submit",
  async (formData, thunkAPI) => {
   // console.log(formData);
    try {
      const response = await fetch(`${API}/announcement/add-update`, {
        method: "POST",

        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
//announcement Detete integration
export const announceDelete = createAsyncThunk(
  "dashboard/announcement/delete",
  async ( id , thunkAPI) => {
    console.log(id);
    try {
      const response = await fetch(`${API}/announcement/delete?id=${id}`, {
        method: "DELETE",

        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const dashboardReducer = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // addRole: (action, state) => {
    // return { role: { ...state, ...action.payload } };
    // },
  },
  extraReducers: {
    [bioDataFormSubmission.fulfilled]: (state, { payload }) => {
      state.message = payload.message;
    },
    [bioDataFormSubmission.pending]: (state, action) => {},
    [bioDataFormSubmission.rejected]: (state, action) => {},

    [getKolprofile.fulfilled]: (state, { payload }) => {
      return { biodata: { ...payload } };
    },

    [getKolprofile.pending]: (state, action) => {},
    [getKolprofile.rejected]: (state, action) => {},

    [announceDataFormSubmission.fulfilled]: (state, { payload }) => {
      state.message = payload.message;
    },
    [announceDataFormSubmission.pending]: (state, action) => {},
    [announceDataFormSubmission.rejected]: (state, action) => {},
  },
});

export const { addRole } = dashboardReducer.actions;
export default dashboardReducer.reducer;

export const dashboardSelector = (state) => state?.dashboard;
