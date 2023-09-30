import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const jsonServerApi = createApi({
    reducerPath: 'jsonServerApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_API_URL}`} ),
    endpoints: (builder) => ({
        getAlbums: builder.query({
            query: () => `albums`,
            providesTags: ['Albums']
        }),
        createAlbum: builder.mutation({
            query: (name) => ({url: 'albums',
            method: 'POST',
            body: {name}}),
            invalidatesTags: ['Albums']
        }),
        deleteAlbum: builder.mutation({
            query: (id) => ({
                url: `albums/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Albums'],
        }),
    }),
});

export const { useGetAlbumsQuery, useCreateAlbumMutation, useDeleteAlbumMutation } = jsonServerApi;
