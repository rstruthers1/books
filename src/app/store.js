import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import bookReducer from '../features/book/bookSlice'


const store = configureStore({
    reducer: {
        counter: counterReducer,
        books: bookReducer
    }
})

export default store;