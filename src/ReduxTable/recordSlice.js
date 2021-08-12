import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080/records/';

export const recordSlice = createApi({
    reducerPath : 'recordSlice',
    baseQuery : fetchBaseQuery({baseUrl : `${BASE_URL}` }),
    tagTypes : ['records'],
    endpoints : (builder) => ({
        fetchAllRecords : builder.query({
            query: (tableName) => ({url: `${tableName}`}),
            //transformResponse: (response) => response.data,
            /*
            providesTags : (result) =>
            result
            ? 
            [
              ...result.map(({ id }) => ({ type: 'records', id })),
              { type: 'records', id: 'LIST' },
            ]
            : 
            [{ type: 'records', id: 'LIST' }],
            */
        }),
        addRecord : builder.mutation({
            query(body) {
                return {
                  url: 'asn',
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Basic YXNhaDphc2Fo',
                },
                  body,
                }
              },
              // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
              // that newly created post could show up in any lists.
              //invalidatesTags: [{ type: 'records', id: 'LIST' }],
        })
    })
})

export const {useFetchAllRecordsQuery,useAddRecordMutation} = recordSlice;