
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend_API } from "../../../utils";


export const loginUser = createAsyncThunk('Login/loginUser', async(userInfo,thunkAPI) => {
               console.log(userInfo)
    
        let response = await fetch(`${backend_API}/auth/login`, {
               method : "POST",
               headers : {"Content-Type" : "application/json"},
               body : JSON.stringify(userInfo)
        }); // response


    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.msg);
    }

    return data;        
   
});


const userLogin = createSlice({
  name: "userObj",
  initialState: {
    isLoading: false,
    isError: false,
    error: null,
    data: null,
    isAuthenticated: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.data = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});



export default userLogin.reducer;