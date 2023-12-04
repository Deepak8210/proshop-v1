import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./redux/store.js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <PayPalScriptProvider>
        <App />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
