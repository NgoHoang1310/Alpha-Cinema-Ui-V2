// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    booking: {},
    trailer: {},
    schedule: {},

    modifyUser: {},
};

// Tạo slice
const slice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            return {
                ...state,
                [action.payload?.type]: action.payload?.data,
            };
        },

        closeModal: (state, action) => {
            return {
                ...state,
                [action.payload]: {},
            };
        },
    },
});

// Export actions
export const { openModal, closeModal } = slice.actions;

// Export reducer
export default slice.reducer;
