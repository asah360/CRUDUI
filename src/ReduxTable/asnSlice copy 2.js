import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const TABLE_NAME = 'asn';
const PK_COL = 'asn_id';
const API_URL = `http://localhost:8080/records/${TABLE_NAME}`;
//const relative_url = TABLE_NAME+'/fetchRecords';

export const fetchRecords = createAsyncThunk(`${TABLE_NAME}/fetchRecords`,async () => {
    const response = await axios.get(API_URL);
    return response.data.records;
})

export const tableSlice = createSlice({
    name : 'records',
    initialState : {
        recordList : [],
        loading : false,
        error : null
    },
    reducer:{
        add : (state , action) =>{
            state.recordList.push(action.payload);
        },

        remove : (state , action) => {
            const removeRecord = action.payload;
            state.recordList = state.recordList.filter((records) =>{
                return !removeRecord.includes(`${TABLE_NAME}.${PK_COL}`)
            });
        },

        update : (state , action) => {
            state.recordList = state.recordList.map((record) => {
                if(`record.${PK_COL}` === `action.payload.${PK_COL}`){
                    return action.payload;
                }
                return record;
            })
        }
    },
    extraReducers :{
        [fetchRecords.fulfilled]:(state,action) =>{
            state.recordList = action.payload;;
            state.loading = false;
            state.error = false;
        },
        [fetchRecords.pending]:(state,action) =>{
            state.loading = true;
            state.error = null;
        },
        [fetchRecords.rejected]:(state,action) =>{
            state.loading = false;
            state.error = action.error.message;
        },
    }
});

export const {add , remove , update} = tableSlice.actions;
export const selectAllRecords = (state) => state.records.recordList;
export const loadRecordStatus = (state) => state.records.loading;
export const loadError = (state) => state.records.error;

export default tableSlice.reducer;