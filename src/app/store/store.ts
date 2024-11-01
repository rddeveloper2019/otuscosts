import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { initReducer } from './slices/initSlice';
import { useDispatch } from 'react-redux';
import { authReducer } from './slices/authSlice';

const rootReducer = combineReducers({
  init: initReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
