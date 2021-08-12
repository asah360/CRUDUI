import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080/records/';


const apiSlice = createApi({
    reducerPath : 'apiSlice',
    baseQuery : fetchBaseQuery({baseUrl : `${BASE_URL}` }),
    endpoints : (builder) => ({
        fetchAllAsn : builder.query({
            query: (tableName) => ({url: `${tableName}`}),
            transformResponse: (response) => response.data,
        }),
    })
})



export const {useFetchAllAsnQuery} = apiSlice;
export default apiSlice.reducer;