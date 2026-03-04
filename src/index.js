import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { store } from "./states/store";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import log from "./firebaseModules"


log('App initiated', {"foo" : "bar"});

Sentry.init({
  dsn: "https://422d03efb71b4aecbe72b0eaf5cc7e53@o1368026.ingest.sentry.io/6674589",
  integrations: [new BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
