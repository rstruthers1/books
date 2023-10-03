import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import bookReducer from '../features/book/bookSlice'
import oneBookReducer from '../features/oneBook/oneBookSlice'
import { setupListeners } from '@reduxjs/toolkit/query';
import { AlbumApi } from '../services/AlbumApi';


const store = configureStore({
    reducer: {
        counter: counterReducer,
        books: bookReducer,
        oneBook: oneBookReducer,
        [AlbumApi.reducerPath]: AlbumApi.reducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AlbumApi.middleware),
})
setupListeners(store.dispatch);
export default store;