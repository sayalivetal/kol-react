import { createReducer, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";
import { API } from "../../common/apis";

const initialState = {
  name: "",
  message: "",
  isSuccess: false,
  bookmark: false,
  chatData: [],
};

//API Integration with action for send message creation
export const sendMessage = createAsyncThunk(
  "chat/send",
  async ({ message, urlId, token }, thunkAPI) => {
    console.log(urlId, message, token);
    try {
      const response = await fetch(`${API}/Chat/send-message`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          receiver_id: urlId,
          message,
        }),
      });
      let data = await response.json();
      console.log(data);
      if (data.statusCode == 201) {
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

//API Integration with action for Conversation creation
export const conversationList = createAsyncThunk(
  "chat/message",
  async ({ urlId, token }, thunkAPI) => {
    //console.log(urlId, token);
    try {
      const response = await fetch(
        `${API}/Chat/chat-list?receiver_id=${urlId}`,
        {
          method: "GET",

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
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

//API Integration with action chat edit
export const messageEdit = createAsyncThunk(
  "chat/message",
  async ({ token, editData, id }, thunkAPI) => {
    //console.log(token ,editData,id);
    try {
      const response = await fetch(`${API}/Chat/edit-msg`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          msg_id: id,
          message: editData,
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
//API Integration with action chat delete
export const messageDelete = createAsyncThunk(
  "chat/message",
  async ({ token, id }, thunkAPI) => {
    // console.log(token ,id);
    try {
      const response = await fetch(`${API}/Chat/delete-msg?msg_id=${id}`, {
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

//create slice for authentication reducers

const chatReducer = createSlice({
  name: "chat",
  initialState,

  reducers: {
    // kolType: (action, { payload }) => {
    //   console.log(payload);
    //   return { kolType: payload };
    // },
    // kolName: (action, { payload }) => {
    //   console.log(payload);
    //   return { name: payload };
    // },
  },
  extraReducers: {
    [sendMessage.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
    },
    [conversationList.fulfilled]: (state, { payload }) => {
      //console.log(payload);
      if (payload?.data?.length > 0) {
        return { chatData: [...payload?.data] };
      }
    },
  },
});
// export const { kolType, kolName } = kolReducer.actions;
export default chatReducer.reducer;
export const chatSelector = (state) => state?.chat;
