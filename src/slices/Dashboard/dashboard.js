import { createReducer, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../common/apis";


const initialState = {
  biodata: {},  
};

//API Integration with action for dashboard form submission
export const bioDataFormSubmission = createAsyncThunk(
    "dashboard/biodata/submit",
    async ({ userName, personal_email, kol_type, city, zip_code, state, userImage, bio, social_media, social_active, video_links, languages, tags }, thunkAPI) => {
      const token = JSON.parse(localStorage.getItem('token'));
      console.log('token ===', token)
      // console.log(userName, personal_email, kol_type, city, zip_code, state, userImage, bio, social_media, social_active, video_links, languages, tags);
      
      try {
        const response = await fetch(`${API}/kol-profile/add-update`, {
          method: "POST",
          body: JSON.stringify({
            // userName: userName,
            personal_email: personal_email,
            kol_type: kol_type,
            city: city,
            zip_code: zip_code,
            state: state,
            // userImage,
            bio: bio,
            social_media: social_media,
            social_active: social_active,
            video_links : video_links,
            languages: languages,
            tags: tags
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: localStorage.getItem("token")
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
        [bioDataFormSubmission.fulfilled]: (state, action) => {
            return { registerUser: { ...action.payload } };
        },
        [bioDataFormSubmission.pending]: (state, action) => {},
        [bioDataFormSubmission.rejected]: (state, action) => {}
    }
});

export const { addRole } = dashboardReducer.actions;
export default dashboardReducer.reducer;
  
  