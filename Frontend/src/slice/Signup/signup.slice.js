import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend_API } from "../../../utils";


export const signupUser = createAsyncThunk(
  "Signup/signupUser",
  async (userInfo, thunkAPI) => {
    const response = await fetch(`${backend_API}/auth/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo)
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.msg);
    }

    return data;
  }
);




 const userSignup = createSlice({
       name : "userData",
        initialState : {
        isLoading : false,
        isError : false,
        data : "",
    },


    extraReducers : (builder) => {
       builder
       .addCase(signupUser.pending, (state) => {
              state.isLoading = true,
              state.isError = false,
              state.data = {}
       })
       .addCase(signupUser.fulfilled, (state, action) => {
             state.isLoading = false,
             state.isError = false,
             state.data = action.payload
            //  console.log(action.payload)

       })
       .addCase(signupUser.rejected, (state, action) => {
              state.isLoading = false,
              state.isError = true,
              console.log("---: " ,action.payload)
              state.data = action.payload
       })
    }
 });


 export default userSignup.reducer;