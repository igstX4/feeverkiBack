import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // default localStorage for web
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from 'redux'
import basketSlice from './basket/basketSlice'
import userSlice from './user/userSlice'

// Настраиваем persist для сохранения состояния
const persistConfig = {
    key: 'root', // ключ для хранилища
    storage, // используем localStorage
    whitelist: ['basket'], // укажите какие слайсы вы хотите сохранять
}

const rootReducer = combineReducers({
    basket: basketSlice,
    user: userSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // отключаем проверку сериализуемости
        }),
})

export const persistor = persistStore(store)
