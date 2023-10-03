import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import BookService from "../../services/BookService";


export const fetchBook = createAsyncThunk(
    "oneBook/fetchBook",
    async (id) => {
        const response = await BookService.get(id);
        return response.data;
    }
);

const initialState = {
    book: null,
    status: 'idle',
    loading: false,
    error: null
};

const oneBookSlice = createSlice({
    name: 'oneBook',
    initialState,
    reducers: {},
    // Any async action will go into the extraReducers. If not put them in the reducers.
    extraReducers: (builder) => {
        builder
            .addCase(fetchBook.pending, (state) => {
                state.book = null;
                state.status = 'loading'
                state.loading = true
            })
            .addCase(fetchBook.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.book = action.payload;
                state.loading = false;
            })
            .addCase(fetchBook.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action?.error?.message;
            });

    },
});


export const selectBook = (state) => state.oneBook.book;
export const getBookStatus = (state) => state.oneBook.status;
export const getBookError = (state) => state.oneBook.error;

export const getBookLoading = (state) => state.oneBook.loading;



const {reducer} = oneBookSlice;
export default reducer;
