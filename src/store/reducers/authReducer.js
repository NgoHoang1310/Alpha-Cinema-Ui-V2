// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    isAuthenticated: false,
    currentUser: {},
};

// Tạo slice
const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state) => {
            return {
                ...state,
                isAuthenticated: true,
            };
        },
        logOut: (state) => {
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                currentUser: {},
            };
        },
        setUser: (state, action) => {
            return {
                ...state,
                currentUser: action.payload,
            };
        },
    },
});

// Export actions
export const { logIn, logOut, setUser } = slice.actions;

// Export reducer
export default slice.reducer;
