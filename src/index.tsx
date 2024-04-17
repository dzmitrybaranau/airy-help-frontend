import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import WebApp from "@twa-dev/sdk";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import eruda from "eruda";

eruda.init();
WebApp.ready();
WebApp.expand();
const theme = createTheme({
  /** Put your mantine theme override here */
});
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
