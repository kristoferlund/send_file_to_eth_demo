import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Actors from "./ic/Actors.tsx";
import App from "./App.tsx";
import AuthGuard from "./AuthGuard.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { SiweIdentityProvider } from "ic-siwe-js/react";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./wagmi/wagmi.config.ts";
import { canisterId } from "../../ic_siwe_provider/declarations/index";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <SiweIdentityProvider canisterId={canisterId}>
          <Actors>
            <AuthGuard>
              <App />
            </AuthGuard>
          </Actors>
        </SiweIdentityProvider>
      </QueryClientProvider>
    </WagmiProvider>
    <Toaster />
  </React.StrictMode>,
);
