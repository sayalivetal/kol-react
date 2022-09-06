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
  async ({title, description, price, total_days, type, token,id }, thunkAPI) => {
    console.log(title, description, price, total_days, type, token, id);
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
            type,
            id
        }),
      });
      let data = await response.json();
     // console.log(data);
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



//API Integration for deals place order
export const PlaceOrder = createAsyncThunk(
  "chat/message",
  async ({ deal_id,kol_profile_id,start_date, token }, thunkAPI) => {
   //console.log(deal_id,kol_profile_id,start_date, token );
 
    try {
      const response = await fetch(`${API}/order/place-order`, {
        method: "POST",


        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          deal_id,
          kol_profile_id,
          start_date
          
        }),
      
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

//Deals delete api

export const deleteKolDeals = createAsyncThunk(
  "kol/delete-kol-deal",
  async ({ dealId, token }, thunkAPI) => {
    try {
      const response = await fetch(
        `${API}/deal/delete?id=${dealId}`,
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
      //  console.log(data)
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
  

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
    [deleteKolDeals.fulfilled]: (state, action) => {
      //console.log("hello", action.payload)
      return {...action.payload}
    },
    [deleteKolDeals.pending]: (state, action) => {
    return {...action.payload}
    },
    [deleteKolDeals.rejected]: (state, action) => {
    return {...action.payload}
    },

  },
});

export default DealsReducer.reducer;
export const DealsSelector = (state) => state?.deal;
