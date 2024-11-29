import React, { useState, useEffect, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { AuthInit } from "./modules/Auth";
import { Routes } from "../app/Routes";
import { I18nProvider } from "../_common/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_common/layout";
import LoadingOverlay from 'react-loading-overlay';

// import Loader from "react-loader-spinner";
import { LoaderContext } from "./context";

//export const LoaderContext = React.createContext();

export default function App({ store, persistor, basename }) {
  const [loader, updateloader] = useState(false);

  function changeLoader(val) {
    updateloader(val);
  }


  return (
    <Suspense fallback={"Loading..."}>
      <Provider store={store}>
        {/* {LoaderContext && <div>I am herer</div>} */}

        <LoadingOverlay
          active={loader}
          spinner
          className="loadingoverlay"
          text='Please Wait....'

        >
  
          {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
          <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
            {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
            <React.Suspense fallback={<LayoutSplashScreen />}>
              {/* Override `basename` (e.g: `homepage` in `package.json`) */}
              <BrowserRouter basename={basename}>
                {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
                <MaterialThemeProvider>
                  {/* Provide `react-intl` context synchronized with Redux state.  */}
                  <I18nProvider>
                    {/* Render routes with provided `Layout`. */}
                    <AuthInit>
                      <LoaderContext.Provider value={{ loader, changeLoader }}>
                        <Routes />
                      </LoaderContext.Provider>
                    </AuthInit>
                  </I18nProvider>
                </MaterialThemeProvider>
              </BrowserRouter>
            </React.Suspense>
          </PersistGate>
        </LoadingOverlay>
      </Provider>
    </Suspense>
  );
}
