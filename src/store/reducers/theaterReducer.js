// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    currentTheater: {},
};

// Tạo slice
const slice = createSlice({
    name: 'thater',
    initialState,
    reducers: {
        setCurrentTheater: (state, action) => {
            return {
                ...state,
                currentTheater: action.payload,
            };
        },
    },
});

// Export actions
export const { setCurrentTheater } = slice.actions;

// Export reducer
export default slice.reducer;
