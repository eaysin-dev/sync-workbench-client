import authReducer from '@/api/auth/auth-slice';
import { API } from '@/api/base-api';
import employeeReducer from '@/api/employee/employee-slice';
import modalReducer from '@/api/modal/modal-slice';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    auth: authReducer,
    employee: employeeReducer,
    modal: modalReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 100,
      },
    }).concat(API.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
