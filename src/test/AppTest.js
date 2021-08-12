import React from 'react';
import { setupListeners } from '@reduxjs/toolkit/query';
import {TestSlice} from './TestSlice';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {TestComp} from './TestComp';
import AppBarAndDrawer from "../AppBarAndDrawer/AppBarAndDrawer";
import { useTheme } from "../theme"
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DataProvider } from "../Providers/DataProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


export default function AppTest(){

   const store = configureStore({
        reducer: {
          [TestSlice.reducerPath]: TestSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(TestSlice.middleware),
      });
      setupListeners(store.dispatch);

      const testCompName = TestComp();
      const [currentTheme, setCurrentTheme] = useTheme();
    return(
         <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={currentTheme}>
          <Provider store={store}>
            <DataProvider>
              <Router>
                <div>
                  <AppBarAndDrawer
                    currentTheme={currentTheme}
                    setCurrentTheme={setCurrentTheme}
                  />
                  <Switch>
                    <Route path = "/ASN">
                      {testCompName}
                    </Route>
                  </Switch>

                </div>
              </Router>
            </DataProvider>
          </Provider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </>
    )
}