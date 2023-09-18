import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jsonServerApi = createApi({
    reducerPath: 'jsonServerApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_API_URL}`} ),
    endpoints: (builder) => ({
        getAlbums: builder.query({
            query: () => `albums`,
        }),
    }),
});

export const { useGetAlbumsQuery } = jsonServerApi;