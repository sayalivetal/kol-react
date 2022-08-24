import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../common/apis";

const initialState = {
  name:"",  
  message: "",
  isSuccess: false,
};

//API Integration of create deal
export const createDeal = createAsyncThunk(
  "deal/create-deal",
  async ({title, description, price, total_days, type, token }, thunkAPI) => {
    //console.log(title, description, price, total_days, type, token);
    try {
      const response = await fetch(`${API}/deal/add-update`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
            title, 
            description, 
            price, 
            total_days, 
            type
        }),
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


  export const viewDeals = async (callback) => {
    const response = await fetch(`${API}/deal/list-deals`, {
      method: "GET",
  
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
       // Authorization: "Bearer " + token,
      },
    });
    const result = await response.json();
  
    callback(result.data);
  };

  

//create slice for DealsReducer reducers

const DealsReducer = createSlice({
  name: "deal",
  initialState,
  reducers: {

  },
  extraReducers: {
    [createDeal.fulfilled]: (state, action) => {
      return {...action.payload}
    },
    [createDeal.pending]: (state, action) => {
    return {...action.payload}
    },
    [createDeal.rejected]: (state, action) => {
    return {...action.payload}
    },

  },
});

export default DealsReducer.reducer;
export const DealsSelector = (state) => state?.deal;
