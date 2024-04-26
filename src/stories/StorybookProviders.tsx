import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "../redux/store";
import {
  createTheme,
  MantineProvider,
  TypographyStylesProvider,
} from "@mantine/core";
import React from "react";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const theme = createTheme({});
const queryClient = new QueryClient();

export const AppProviders = ({ children }) => {
  return (
    <TonConnectUIProvider
      manifestUrl={
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/tonconnect-manifest.json"
          : "https://airy-help.netlify.app/tonconnect-manifest.json"
      }
      actionsConfiguration={{
        twaReturnUrl: "https://t.me/airy_help_bot",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MantineProvider theme={theme}>
            <TypographyStylesProvider>
              <div style={{ width: 375 }}>{children}</div>
            </TypographyStylesProvider>
          </MantineProvider>
        </Provider>
      </QueryClientProvider>
    </TonConnectUIProvider>
  );
};
