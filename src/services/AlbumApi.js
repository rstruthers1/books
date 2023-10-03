import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const AlbumApi = createApi({
    reducerPath: 'albumClientApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_API_URL}`} ),
    endpoints: (builder) => ({
        getAlbums: builder.query({
            query: () => `albums`,
            providesTags: ['Albums']
        }),
        getAlbum: builder.query({
            query: (id) => `albums/${id}`,
            providesTags: ['Albums']
        }),
        createAlbum: builder.mutation({
            query: (album) => ({url: 'albums',
            method: 'POST',
            body: album}),
            invalidatesTags: ['Albums']
        }),
        updateAlbum: builder.mutation({
            query: ({ id, name, artist }) => ({
                url: `albums/${id}`,
                method: 'PUT',
                body: { name, artist },
            }),
            invalidatesTags: ['Albums'],
        }),
        deleteAlbum: builder.mutation({
            query: (id) => ({
                url: `albums/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Albums'],
        }),
        uploadAlbumImage: builder.mutation({
            query: ({id, imageFormData}) => ({
                url: `albums/${id}/image`,
                method: 'POST',
                body: imageFormData,
                formData: true
            }),
            invalidatesTags: ['Albums']
        }),
    }),
});

export const {
    useGetAlbumsQuery,
    useGetAlbumQuery,
    useCreateAlbumMutation,
    useUpdateAlbumMutation,
    useDeleteAlbumMutation,
    useUploadAlbumImageMutation
} = AlbumApi;
