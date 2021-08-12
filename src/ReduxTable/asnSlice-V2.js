import {createEntityAdapter, createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const ASN_API_URL = 'http://localhost:8080/records/asn';

export const fetchAsn = createAsyncThunk('asn/fetchAsn',async () => {
    const response = await axios.get(ASN_API_URL);
    return response.data.records;
})
export const asnSlice = createSlice({
    name : 'asn',
    initialState : {
        asnList : [],
        loading : false,
        error : null
    },
    reducer:{
        add : (state , action) =>{
            state.asnList.push(action.payload);
            console.log("Add reducer");
        },

        remove : (state , action) => {
            const removeAsn = action.payload;
            state.asnList = state.asnList.filter((asn) =>{
                return !removeAsn.includes(asn.asnId)
            });
        },

        update : (state , action) => {
            state.asnList = state.asnList.map((asn) => {
                if(asn.asnId === action.payload.asnId){
                    return action.payload;
                }
                return asn;
            })
        }
    },
    extraReducers :{
        [fetchAsn.fulfilled]:(state,action) =>{
            state.asnList = action.payload;;
            state.loading = false;
            state.error = false;
        },
        [fetchAsn.pending]:(state,action) =>{
            state.loading = true;
            state.error = null;
        },
        [fetchAsn.rejected]:(state,action) =>{
            state.loading = false;
            state.error = action.error.message;
        },
    }
});

export const {add , remove , update} = asnSlice.actions;
export const selectAsn = (state) => state.asn.asnList;
export const loadAsn = (state) => state.asn.loading;
export const loadError = (state) => state.asn.error;

export default asnSlice.reducer;