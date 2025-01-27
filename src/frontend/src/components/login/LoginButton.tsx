import { useAccount, useChainId } from "wagmi";

import { Button } from "../ui/Button";
import { isChainIdSupported } from "../../wagmi/is-chain-id-supported";
import { useSiwe } from "ic-siwe-js/react";
import { LoaderCircle } from "lucide-react";

export default function LoginButton() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { login, isLoggingIn, isPreparingLogin } = useSiwe();

  const text = () => {
    if (isLoggingIn) {
      return "Signing in";
    }
    if (isPreparingLogin) {
      return "Preparing";
    }
    return "Sign in";
  };

  const icon =
    isLoggingIn || isPreparingLogin ? (
      <LoaderCircle className="animate-spin" />
    ) : undefined;

  const disabled =
    !isChainIdSupported(chainId) ||
    isLoggingIn ||
    !isConnected ||
    isPreparingLogin;

  return (
    <Button className="w-44" disabled={disabled} onClick={() => void login()}>
      {icon}
      {text()}
    </Button>
  );
}
