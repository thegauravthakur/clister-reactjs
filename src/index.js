//external libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
//user made libraries
import App from './App';
import {AuthProvider} from "./context/Provider";
import {MyThemeProvider} from "./context/ThemeProvider";
import {CustomListTileProvider} from "./context/CurrentListTileProvider";
import {LastRouteVisitedProvider} from "./context/LastRouteVisited";
import * as serviceWorker from './serviceWorker';

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
