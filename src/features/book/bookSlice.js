import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BookService from "../../services/BookService";


export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
        const response = await BookService.getAll();
        return response.data;
    },
);

export const updateBook = createAsyncThunk(
    "books/update",
    async ({ id, title }) => {
        const res = await BookService.update(id, title);
        return res.data;
    }
);

const initialState = {
    books: [],
    status: 'idle',
    error: null
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    // Any async action will go into the extraReducers. If not put them in the reducers.
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.books = action.payload
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                const index = state.books.findIndex(book => book.id === action.payload.id)
                state.books[index] = {
                    ...state.books[index],
                    ...action.payload
                }
            })
    },
});

export const selectAllBooks = (state) => state.books.books;
export const getBooksStatus = (state) => state.books.status;
export const getBooksError = (state) => state.books.error;


const { reducer } = booksSlice;
export default reducer;