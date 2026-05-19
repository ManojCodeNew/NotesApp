import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface authCode {
    isLoggedIn: boolean
}

const initialState: authCode = {
    isLoggedIn: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<number>) => {
            const authCredential: number = action.payload
            if (authCredential === 123) {
                state.isLoggedIn = true
            } else {
                state.isLoggedIn = false
            }
        }
    }
})

export const { login } = authSlice.actions;
export default authSlice.reducer;