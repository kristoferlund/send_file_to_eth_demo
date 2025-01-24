import React, { useEffect } from "react";
import { useAccount, useChainId } from "wagmi";

import LoginPage from "./components/login/LoginPage";
import { isChainIdSupported } from "./wagmi/is-chain-id-supported";
import { useSiwe } from "ic-siwe-js/react";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { clear, isInitializing, identity, identityAddress } = useSiwe();

  // If the user is not connected, clear the session.
  useEffect(() => {
    if (!isConnected && identity) {
      clear();
    }
  }, [isConnected, clear, identity]);

  // If user switches to an unsupported network, clear the session.
  useEffect(() => {
    if (!isChainIdSupported(chainId)) {
      clear();
    }
  }, [chainId, clear]);

  // If the user switches to a different address, clear the session.
  useEffect(() => {
    if (identityAddress && address && address !== identityAddress) {
      clear();
    }
  }, [address, clear, identityAddress]);

  if (isInitializing) {
    return null;
  }

  // If wallet is not connected or there is no identity, show login page.
  if (!isInitializing && (!isConnected || !identity)) {
    return <LoginPage />;
  }

  return <>{children}</>;
}
