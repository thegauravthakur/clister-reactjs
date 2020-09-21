import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/Provider";
import * as serviceWorker from './serviceWorker';
import {MyThemeProvider} from "./context/ThemeProvider";
import {CustomListTileProvider} from "./context/CurrentListTileProvider";


ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <MyThemeProvider>
                <CustomListTileProvider>
                    <App/>
                </CustomListTileProvider>
            </MyThemeProvider>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root')
);


serviceWorker.register();
