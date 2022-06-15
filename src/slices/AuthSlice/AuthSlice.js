import { createReducer, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../common/apis";

const initialState = {
  loginuser: {},
  registerUser: {},
};

//API Integration with action for registration creation
export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ name, email, token, role, password }, thunkAPI) => {
    try {
      const response = await fetch(`${API}/register`, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role_id: role,
          firebase_token: token,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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
//Email verification
export const emailVerification = createAsyncThunk(
  "users/verifyEmail",

  async ({ otp, emailVerify }, thunkAPI) => {
    try {
      const response = await fetch(`${API}/verify-OTP`, {
        method: "POST",
        body: JSON.stringify({
          otp,
          email: emailVerify,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      let data = await response.json();
      console.log(data);
      if (response.status === 200) {
        return {
          data,
        };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

//resend Email OTP

export const resendEmailOtp = createAsyncThunk(
  "users/resendEmailOtp",

  async (emailVerify, thunkAPI) => {
    console.log(emailVerify);
    try {
      const response = await fetch(`${API}/resend-OTP`, {
        method: "POST",
        body: JSON.stringify({
          email: emailVerify,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      let data = await response.json();

      return data;
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
//Forgot Password
export const forgotPassword = createAsyncThunk(
  "users/forgotPassword",

  async (email, thunkAPI) => {
    console.log(email);
    try {
      const response = await fetch(`${API}/check-email-forgot-password`, {
        method: "PATCH",
        body: JSON.stringify({
          email,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      let data = await response.json();
      console.log(data);
      if (response.status === 200) {
        return {
          data,
        };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
//API Integration with action for Login creation
export const LoginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
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
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
//Api Integration with action set new password when forgot

export const ResetPassword = createAsyncThunk(
  "users/changePassword",
  async (
    { currentPassword, newPassword, confirmNewPassword, email },
    thunkAPI
  ) => {
    console.log(currentPassword, newPassword, confirmNewPassword, email);
    try {
      const response = await fetch(`${API}/reset-password`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmNewPassword,
          email: email,
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
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
//Api Integration with action ChangePassword

export const ChangePasswordUser = createAsyncThunk(
  "users/changePassword",
  async (
    { currentPassword, newPassword, token },
    thunkAPI
  ) => {
    console.log(currentPassword, newPassword, token);
    try {
      const response = await fetch(`${API}/reset-password`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: currentPassword,
          new_password: newPassword,
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
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

//create slice for authentication reducers

const authReducer = createSlice({
  name: "user",
  initialState,

  reducers: {},
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      return { registerUser: { ...action.payload } };
    },
    [signupUser.pending]: (state, action) => {},
    [signupUser.rejected]: (state, action) => {},
    [emailVerification.fulfilled]: (state, action) => {
      return { registerUser: { ...action.payload } };
    },
    [emailVerification.pending]: (state, action) => {},
    [emailVerification.rejected]: (state, action) => {},
    [forgotPassword.fulfilled]: (state, action) => {
      return { registerUser: { ...action.payload } };
    },
    [forgotPassword.pending]: (state, action) => {},
    [forgotPassword.rejected]: (state, action) => {},
    [ResetPassword.fulfilled]: (state, action) => {
      return { registerUser: { ...action.payload } };
    },
    [ResetPassword.pending]: (state, action) => {},
    [ResetPassword.rejected]: (state, action) => {},
    [LoginUser.fulfilled]: (state, action) => {
      return { loginUser: { ...action.payload } };
    },
    [LoginUser.pending]: (state, action) => {},
    [LoginUser.rejected]: (state, action) => {},
    [ChangePasswordUser.fulfilled]: (state, action) => {
      return { loginUser: { ...action.payload } };
    },
    [ChangePasswordUser.pending]: (state, action) => {},
    [ChangePasswordUser.rejected]: (state, action) => {},
  },
});

export default authReducer.reducer;
