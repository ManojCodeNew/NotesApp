import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './features/noteSlice'
import authReducer from './features/authSlice'
import imageReducer from './features/imageSlice'

export const store = configureStore({
    reducer: {
        note: noteReducer,
        auth: authReducer,
        image: imageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch