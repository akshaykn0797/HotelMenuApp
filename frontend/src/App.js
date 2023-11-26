import React, { Suspense } from "react";
// import { QueryClient, QueryClientProvider } from "react-query";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { SuspenseLoader } from "components/Molecules/SuspenseLoader";
import Router from "router";

import "assets/App.css";
import PageLoader from "components/PageLoader";
import InstallationPrompt from "components/InstallationPrompt";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { ReactQueryDevtools } from "react-query-devtools";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageLoader />
      <Suspense fallback={<SuspenseLoader />}>
        <Router />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
