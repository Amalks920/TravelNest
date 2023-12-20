import {configureStore} from '@reduxjs/toolkit'
import signupSlice from '../features/authentication/services/signupSlice';
import { apiSlice } from '../features/api/apiSlice';
import loginSlice from '../features/authentication/services/loginSlice';

const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        signup:signupSlice,
        auth:loginSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
devTools: true
})

export default store;


