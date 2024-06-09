import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import birthdaySlice from './BirthdaySlice.ts';
import presentSlice from "./PresentSlice.ts";

export const store = configureStore({
    reducer: { birthdays: birthdaySlice, presents: presentSlice},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
