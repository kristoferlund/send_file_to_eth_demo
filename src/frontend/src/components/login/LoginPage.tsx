import ConnectButton from "./ConnectButton";
import LoginButton from "./LoginButton";
import { isChainIdSupported } from "../../wagmi/is-chain-id-supported";
import { useAccount } from "wagmi";
import { useChainId } from "wagmi";
import { useEffect } from "react";
import { useSiwe } from "ic-siwe-js/react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import EthBadge from "../EthBadge";

export default function LoginPage(): React.ReactElement {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { loginError } = useSiwe();
  const { toast } = useToast();

  /**
   * Show an error toast if the login call fails.
   */
  useEffect(() => {
    if (loginError) {
      toast({
        variant: "destructive",
        description: loginError.message,
      });
    }
  }, [loginError, toast]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-10">
      <div className="flex items-center justify-center gap-5 md:gap-20">
        <img alt="ic" className="w-20 h-20 md:w-28 md:h-28" src="/ic.svg" />
      </div>
      <div className="px-10 text-2xl font-bold text-center md:text-5xl">
        Transfer
      </div>
      <div className="w-80 md:w-96 rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col items-center w-full gap-10 p-8">
          <div className="flex items-center justify-center w-full gap-5">
            <div className="items-center justify-center hidden w-8 h-8 text-xl font-bold rounded-full md:flex bg-primary text-primary-foreground">
              1
            </div>
            <div>
              {!isConnected && <ConnectButton />}
              {isConnected && isChainIdSupported(chainId) && <EthBadge />}
              {isConnected && !isChainIdSupported(chainId) && (
                <Button disabled variant="outline">
                  <Activity />
                  Unsupported Network
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center w-full gap-5">
            <div className="items-center justify-center hidden w-8 h-8 text-xl font-bold rounded-full md:flex bg-primary text-primary-foreground">
              2
            </div>
            <div>
              {" "}
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
