import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/Provider";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
       <AuthProvider>
           <App/>
       </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root')
);


serviceWorker.register();
