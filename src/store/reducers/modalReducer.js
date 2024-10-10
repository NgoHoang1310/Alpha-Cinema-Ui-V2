// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    type: 'trailer',
    isOpenModal: false,
    data: {},
};

// Tạo slice
const slice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            return {
                ...state,
                type: action.payload?.type,
                isOpenModal: action.payload?.isOpen,
                data: action.payload?.data,
            };
        },
    },
});

// Export actions
export const { openModal } = slice.actions;

// Export reducer
export default slice.reducer;
