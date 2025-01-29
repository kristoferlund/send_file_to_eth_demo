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
    <div className="flex flex-col gap-5 w-full h-screen items-center justify-center">
      <div className="flex flex-col border rounded p-20 items-center justify-center w-[600px] gap-10 bg-muted/30">
        <div className="flex w-full">
          <img alt="ic" className="w-40" src="/icp-logo.png" />
        </div>
        <div className="text-xl font-bold md:text-3xl leading-loose">
          Send encrypted files to any Ethereum address
        </div>
        <div className="leading-relaxed">
          This demo application allows you to send encrypted files to any
          Ethereum address. It uses{" "}
          <a
            href="https://en.wikipedia.org/wiki/Identity-based_encryption"
            target="_blank"
            rel="noreferrer"
          >
            Identity-based encryption (IBE)
          </a>{" "}
          together with the{" "}
          <a
            href="https://internetcomputer.org/docs/current/references/vetkeys-overview/"
            target="_blank"
            rel="noreferrer"
          >
            vetKeys
          </a>{" "}
          Internet Computer feature.
        </div>
        <div className="w-full rounded-xl border bg-card text-card-foreground shadow mt-5">
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
      <div className="text-primary/50">
        Fork on{" "}
        <a
          href="https://github.com/kristoferlund/send_file_to_eth_demo"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
