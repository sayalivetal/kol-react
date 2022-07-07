import { createReducer, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../common/apis";

const initialState = {
 listingDetails :{},
};

//API Integration with action for registration creation
export const kolListing = createAsyncThunk(
  "kol/listing",
  async ({token}, thunkAPI) => {

    try {
      const response = await fetch(`${API}/kol-profile/list`, {
        method: "GET",
       
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token
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

//create slice for authentication reducers

const kolReducer = createSlice({
  name: "user",
  initialState,

  reducers: {
    // addRole: (action, state) => {
    //   return { role: { ...state, ...action.payload } };
    // },
  },
  extraReducers: {
    [kolListing.fulfilled]: (state, action) => {
      return { listingDetails: { ...action.payload } };
    },
   
  },
});
export const { addRole } = kolReducer.actions;
export default kolReducer.reducer;
