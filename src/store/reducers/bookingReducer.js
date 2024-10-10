// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    currentSeats: [],
};

// Tạo slice
const slice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setCurrentSeats: (state, action) => {
            return {
                ...state,
                currentSeats: [...action?.payload],
            };
        },
    },
});

// Export actions
export const { setCurrentSeats } = slice.actions;

// Export reducer
export default slice.reducer;
