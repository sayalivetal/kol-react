import { createReducer, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../common/apis";


const initialState = {
  biodata: {}, 
  message:'',
  statusCode: "",
};

//API Integration with action for dashboard form submission
export const bioDataFormSubmission = createAsyncThunk(
    "dashboard/biodata/submit",
    async ( formData, thunkAPI) => {
      // for (var pair of formData.entries()) {
      //   console.log('fddf',pair[0]+ ', ' + pair[1]); 
      // }
      //console.log('fddf',formData);
      const token = localStorage.getItem('token');
  
      // console.log(userName, personal_email, kol_type, city, zip_code, state, userImage, bio, social_media, social_active, video_links, languages, tags);
      
      try {
        const response = await fetch(`${API}/kol-profile/add-update`, {
          method: "POST",
          body: formData,
          headers: {
            //"Content-Type": "application/json",
            // Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
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
  async ( formData, thunkAPI) => {
    try {
      const response = await fetch(`${API}/kol-profile/view-details`, {
        method: "GET",
        // body: formData,
        headers: {
          //"Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
      });
      let data = await response.json();
      console.log(data);
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

//API Integration with action for dashboard annoucement form submission
export const announceDataFormSubmission = createAsyncThunk(
  "dashboard/announcement/submit",
  async ( formData, thunkAPI) => {
    try {
      const response = await fetch(`${API}/announcement/add-update`, {
        method: "POST",
        body: formData,
        headers: {
          //"Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
      });
      let data = await response.json();
      console.log(data);
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



const dashboardReducer = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
      // addRole: (action, state) => {
      // return { role: { ...state, ...action.payload } };
      // },
  },
  extraReducers: {
    [bioDataFormSubmission.fulfilled]: (state, {payload}) => {
        state.message = payload.message;
    },
    [bioDataFormSubmission.pending]: (state, action) => {},
    [bioDataFormSubmission.rejected]: (state, action) => {},

    [bioDataFormSubmission.fulfilled]: (state, {payload}) => {
      state.message = payload.message;
    },
    [getKolprofile.fulfilled]: (state, {payload}) => {
      return{biodata:{...payload}}
    },
    [getKolprofile.pending]: (state, action) => {},
    [getKolprofile.rejected]: (state, action) => {}
      
  }
});

export const { addRole } = dashboardReducer.actions;
export default dashboardReducer.reducer;
  
export const dashboardSelector = (state) => state?.dashboard; 