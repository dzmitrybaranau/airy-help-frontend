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
import { OnboardingProvider } from "../context/OnboardingContext";

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
                <OnboardingProvider
                  steps={[
                    {
                      stepNumber: 1,
                      meta: "Gates Mindfulness",
                      userInfo:
                        "Welcome to the Airy app, here you can start your journey to achieve your dreams",
                    },
                    {
                      stepNumber: 2,
                      meta: "Create Goal",
                      userInfo:
                        "Let's create your first goal, type whatever you want here",
                    },
                    {
                      stepNumber: 3,
                      meta: "Why do you want it",
                      userInfo:
                        "To make sure that you stay on track, goal need to be aligned with your inner priorities, tell why do you want to achieve with this goal",
                    },
                  ]}
                >
                  <div className={appStyles.pageWrapper}>{children}</div>
                </OnboardingProvider>
              </div>
            </Router>
          </TypographyStylesProvider>
        </MantineProvider>
      </QueryClientProvider>
    </TonConnectUIProvider>
  );
};
