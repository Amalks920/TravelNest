import {configureStore} from '@reduxjs/toolkit'
import signupSlice from '../features/authentication/services/signupSlice';
import { apiSlice } from './apiSlice';
import loginSlice from '../features/authentication/services/loginSlice';
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk';
import verifyEmailSlice from '../features/authentication/services/verifyEmailSlice';

const persistConfig={
    key:'root',
    storage
}

const persistedAuthReducer=persistReducer(persistConfig,loginSlice);

const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:persistedAuthReducer,
        verify:verifyEmailSlice,
        signup:signupSlice
    },
    middleware:[thunk],
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
devTools: true
})

export const persistor=persistStore(store);
export default store;


