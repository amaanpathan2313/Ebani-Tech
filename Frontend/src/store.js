
import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slice/Signup/signup.slice";
 

 const store = configureStore({
    reducer : {

        signupUser : signupReducer,
    }
 });



 export default store;