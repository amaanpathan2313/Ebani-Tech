
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend_API } from "../../../utils";


export const loginUser = createAsyncThunk('Login/loginUser', async(userInfo) => {
               console.log(userInfo)
    try {

        let response = await fetch(`${backend_API}/auth/login`, {
               method : "POST",
               headers : {"Content-Type" : "application/json"},
               body : JSON.stringify(userInfo)
        }); // response

        return await response.json();
        
    } catch (err) {

        console.log(`I am from Login slice, ${err.message}`);
        return err.message;
        
    }
});


const userLogin = createSlice({
         
    name : "userObj",
    initialState : {
        isLoading : false,
        isError : false,
        data : null
    },

        extraReducers : (builder) => {
            builder
          .addCase(loginUser.pending, (state) => {
            state.isLoading = true,
            state.isError = false,
            state.data = null
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isError = false,
            state.data = action.payload
            console.log("I am fulfilled : ", action.payload)
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true,
            state.data = action.payload
            console.log("I am fulfilled : ", action.payload)
          } )
        }

     
    
}); // userLogin


export default userLogin.reducer;