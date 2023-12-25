import {combineReducers, configureStore} from '@reduxjs/toolkit'
import signupSlice from '../features/authentication/services/signupSlice';
import { apiSlice } from './apiSlice';
import loginSlice from '../features/authentication/services/loginSlice';
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk';
import verifyEmailSlice from '../features/authentication/services/verifyEmailSlice';
import EditHotelFormSlice from '../features/hotelRegistration/services/EditHotelFormSlice';
import hotelListSlice from '../features/hotelManagement/services/hotelListSlice';

const persistConfig={
    key:'root',
    storage
}

const rootReducer=combineReducers({
    auth:loginSlice,
    hotels:hotelListSlice,
})

const persistedAuthReducer=persistReducer(persistConfig,rootReducer);

const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        persistedSlice:persistedAuthReducer,
        verify:verifyEmailSlice,
        signup:signupSlice,
        editHotelForm:EditHotelFormSlice
    },
    middleware:[thunk],
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
devTools: true
})

export const persistor=persistStore(store);
export default store;


