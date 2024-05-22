import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  createTheme,
  MantineProvider,
  TypographyStylesProvider,
} from "@mantine/core";
import React from "react";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { BrowserRouter as Router } from "react-router-dom";
import appStyles from "../components/App/App.module.scss";

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
        <MantineProvider theme={theme}>
          <TypographyStylesProvider>
            <Router>
              <div
                className={appStyles.root}
                style={
                  {
                    // height: "450px",
                    // minHeight: "450px",
                  }
                }
              >
                <div className={appStyles.pageWrapper}>{children}</div>
              </div>
            </Router>
          </TypographyStylesProvider>
        </MantineProvider>
      </QueryClientProvider>
    </TonConnectUIProvider>
  );
};
