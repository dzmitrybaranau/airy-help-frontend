import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.scss";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import WebApp from "@twa-dev/sdk";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import {
  createTheme,
  MantineProvider,
  TypographyStylesProvider,
} from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import eruda from "eruda";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GoalPage from "./pages/goal/GoalPage";
import MeetAiry from "./pages/meet-airy";
import GatesPage from "./pages/gates";
import CreateGoalPage from "./pages/create-goal";
import OnboardingPage from "./pages/onboarding";

eruda.init();
WebApp.ready();
WebApp.expand();

const theme = createTheme({
  components: {
    Link: {
      styles: {
        color: "#24A1DE",
        textDecoration: "none",
      },
    },
  },
});
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <GatesPage />,
      },
      {
        path: "/onboarding",
        element: <OnboardingPage />,
      },
      {
        path: "/goals",
        element: <GoalPage />,
      },
      { path: "/create-goal", element: <CreateGoalPage /> },
      {
        path: "/meet-airy",
        element: <MeetAiry />,
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

const AppProviders = ({ children }) => {
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
          <TypographyStylesProvider>{children}</TypographyStylesProvider>
        </MantineProvider>
      </QueryClientProvider>
    </TonConnectUIProvider>
  );
};

root.render(
  <React.StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
