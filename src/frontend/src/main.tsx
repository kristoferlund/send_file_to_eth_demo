import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Actors from "./ic/Actors.tsx";
import App from "./App.tsx";
import AuthGuard from "./AuthGuard.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { SiweIdentityProvider } from "ic-siwe-js/react";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./wagmi/wagmi.config.ts";
import { canisterId } from "../../ic_siwe_provider/declarations/index";
import { Toaster } from "@/components/ui/toaster.tsx";
import { toBytes } from "viem";

export const TRANSFER_DERIVATION_ID = toBytes("transfer");

export const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <SiweIdentityProvider canisterId={canisterId}>
          <Actors>
            <AuthGuard>
              <App />
              <Toaster />
            </AuthGuard>
          </Actors>
        </SiweIdentityProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
