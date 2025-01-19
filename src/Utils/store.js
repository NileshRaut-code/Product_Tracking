// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userslicer.js"
// const appstore=configureStore({
//     reducer:{
//         user:userReducer
//     },
// })

// export default appstore;
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslicer.js";

const appstore = configureStore({
  reducer: {
    user: userReducer,

  },
});
export default appstore;