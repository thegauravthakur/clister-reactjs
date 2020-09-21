import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/Provider";
import * as serviceWorker from './serviceWorker';
import {MyThemeProvider} from "./context/ThemeProvider";
import {CustomListTileProvider} from "./context/CurrentListTileProvider";
import {LastRouteVisitedProvider} from "./context/LastRouteVisited";


ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <MyThemeProvider>
                <LastRouteVisitedProvider>
                    <CustomListTileProvider>
                        <App/>
                    </CustomListTileProvider>
                </LastRouteVisitedProvider>
            </MyThemeProvider>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root')
);


serviceWorker.register();
