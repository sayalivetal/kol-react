import { createReducer, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../common/apis";

const initialState = {
  listingDetails: {},
  kolType: "",
  name: "",
  message: "",
  isSuccess: false,
  bookmark: false,
};

//API Integration with action for registration creation
export const kolDetails = createAsyncThunk(
  "kol/details",
  async ({ id, token }, thunkAPI) => {
 
    try {
      const response = await fetch(`${API}/kol-profile/view?id=${id}`, {
        method: "GET",
        

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
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

//bookmark add api integration
export const kolAddBookmark = createAsyncThunk(
  "kol/bookmark",
  async ({ profileId, token }, thunkAPI) => {
  
    try {
      const response = await fetch(`${API}/bookmark/add`, {
        method: "Post",
        
        body: JSON.stringify({
          kol_profile_id: profileId,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      let data = await response.json();
      //console.log(data);
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

//bookmark delete api

export const kolDeleteBookmark = createAsyncThunk(
  "kol/bookmarkDelete",
  async ({ profileId, token }, thunkAPI) => {
  
    try {
      const response = await fetch(
        `${API}/bookmark/delete?kol_profile_id=${profileId}`,
        {
          method: "DELETE",
         
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
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



//create slice for authentication reducers

const kolReducer = createSlice({
  name: "kol",
  initialState,

  reducers: {
    kolType: (action, { payload }) => {
     console.log(payload);
      return { kolType: payload };
    },
    kolName: (action, { payload }) => {
   
      return { name: payload };
    },
  },
  extraReducers: {
    [kolDetails.fulfilled]: (state, action) => {
      return { listingDetails: { ...action.payload } };
    },
    [kolAddBookmark.fulfilled]: (state, { payload }) => {
      state.message = payload.message;
      state.isSuccess = true;
    },
    [kolDeleteBookmark.fulfilled]: (state, { payload }) => {
      state.message = payload.message;
      state.isSuccess = true;
    },

  },
});
export const { kolType, kolName } = kolReducer.actions;
export default kolReducer.reducer;
export const kolSelector = (state) => state.kolListing;
