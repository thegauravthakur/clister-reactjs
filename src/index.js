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
    <AuthProvider>
      <MyThemeProvider>
        <CustomListTileProvider>
          <App />
        </CustomListTileProvider>
      </MyThemeProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.register();
