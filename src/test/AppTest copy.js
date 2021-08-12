import React from 'react';
import { setupListeners } from '@reduxjs/toolkit/query';
import {TestSlice} from './TestSlice';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import TestComp from './TestComp';


export default function AppTest(){

   const store = configureStore({
        reducer: {
          [TestSlice.reducerPath]: TestSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(TestSlice.middleware),
      });
      setupListeners(store.dispatch);
    return(
        <Provider store = {store}>
        <div>
            <h1>Hello Test</h1>
            <TestComp />
        </div>
        </Provider>
    )
}