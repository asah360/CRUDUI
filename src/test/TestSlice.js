import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080/records/';

export const TestSlice = createApi({
    reducerPath : 'TestSlice',
    baseQuery : fetchBaseQuery({baseUrl : `${BASE_URL}` }),
    endpoints : (builder) => ({
        fetchAllRecords : builder.query({
            query: (tableName) => ({url: `${tableName}`}),
            //transformResponse: (response) => response.data,
        }),
    })
})

export const {useFetchAllRecordsQuery} = TestSlice;