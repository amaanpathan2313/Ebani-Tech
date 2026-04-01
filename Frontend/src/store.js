
import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slice/Signup/signup.slice";
import loginUserReducer from "./slice/Login/login.slice";
 

 const store = configureStore({
    reducer : {

        signupUser : signupReducer,
        loginUser : loginUserReducer,
    }
 });



 export default store;