//external libraries
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
//user made libraries
import App from "./App";
import { AuthProvider } from "./context/Provider";
import { MyThemeProvider } from "./context/ThemeProvider";
import { CustomListTileProvider } from "./context/CurrentListTileProvider";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <MyThemeProvider>
      <AuthProvider>
        <CustomListTileProvider>
          <App />
        </CustomListTileProvider>
      </AuthProvider>
    </MyThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.register();
