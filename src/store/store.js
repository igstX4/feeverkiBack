import { configureStore } from '@reduxjs/toolkit'
import basketSlice from './basket/basketSlice'
import userSlice from './user/userSlice'

export const store = configureStore({
    reducer: {
        basket: basketSlice,
        user: userSlice
    },
})