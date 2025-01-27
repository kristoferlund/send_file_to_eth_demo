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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
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
