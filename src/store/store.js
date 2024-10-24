import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import modalReducer from './reducers/modalReducer';
import bookingReducer from './reducers/bookingReducer';
import theaterReducer from './reducers/theaterReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const localPersistConfig = {
    key: 'local',
    storage,
    whitelist: ['auth', 'theater'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
    booking: bookingReducer,
    theater: theaterReducer,
});

const persistedReducer = persistReducer(localPersistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
