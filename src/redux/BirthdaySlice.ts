import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Birthday} from "../dto/Birthday.ts";

interface BirthdaySlice {
    birthdayList: Birthday[]
}

const initialState: BirthdaySlice = {
    birthdayList: []
};

export const birthdaySlice = createSlice({
    name: 'birthdays',
    initialState,
    reducers: {
        addBirthday(state, action: PayloadAction<Birthday>) {
            state.birthdayList.push(action.payload);
        },
        deleteBirthday(state, action:PayloadAction<Birthday>) {
            state.birthdayList = state.birthdayList.filter(birthday => birthday.id!== action.payload.id);
        }
    }
});

export const { addBirthday, deleteBirthday } = birthdaySlice.actions;

export default birthdaySlice.reducer;
