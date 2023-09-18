import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import bookReducer from '../features/book/bookSlice'
import { setupListeners } from '@reduxjs/toolkit/query';
import { jsonServerApi } from '../services/jsonServerApi';


const store = configureStore({
    reducer: {
        counter: counterReducer,
        books: bookReducer,
        [jsonServerApi.reducerPath]: jsonServerApi.reducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(jsonServerApi.middleware),
})
setupListeners(store.dispatch);
export default store;