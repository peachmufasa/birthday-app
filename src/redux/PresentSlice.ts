import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Present} from "../dto/Present.ts";

interface PresentSlice {
    presentList: Present[];
}

const initialState: PresentSlice = {
    presentList: []
};

export const presentSlice = createSlice({
    name: 'presents',
    initialState,
    reducers: {
        addPresent(state, action: PayloadAction<Present>) {
            state.presentList.push(action.payload);
        },
        addPresentOption(state, action: PayloadAction<{ id: number, item: string }>) {
            const { id, item } = action.payload;
            const present = state.presentList.find(p => p.id === id);
            if (present) {
                present.items.push(item);
            }
        },
        deletePresent(state, action: PayloadAction<number>) { // Change PayloadAction to number
            state.presentList = state.presentList.filter(present => present.id !== action.payload);
        }
    }
});

export const { addPresent, addPresentOption,deletePresent } = presentSlice.actions;

export default presentSlice.reducer;
