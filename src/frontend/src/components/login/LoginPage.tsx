import AddressPill from "../AddressPill";
import Button from "../ui/Button";
import ConnectButton from "./ConnectButton";
import LoginButton from "./LoginButton";
import { faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { isChainIdSupported } from "../../wagmi/is-chain-id-supported";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { useChainId } from "wagmi";
import { useEffect } from "react";
import { useSiwe } from "ic-siwe-js/react";

export default function LoginPage(): React.ReactElement {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { loginError } = useSiwe();

  /**
   * Show an error toast if the login call fails.
   */
  useEffect(() => {
    if (loginError) {
      toast.error(loginError.message, {
        position: "bottom-right",
      });
    }
  }, [loginError]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-10">
      <div className="flex items-center justify-center gap-5 md:gap-20">
        <img alt="ic" className="w-20 h-20 md:w-28 md:h-28" src="/ic.svg" />
      </div>
      <div className="px-10 text-2xl font-bold text-center md:text-5xl">
        Transfer
      </div>
      <div className="w-80 md:w-96 border-zinc-700/50 border-[1px] bg-zinc-900 drop-shadow-xl rounded-3xl flex flex-col items-center py-5 px-5 mx-10">
        <div className="flex flex-col items-center w-full gap-10 p-8">
          <div className="flex items-center justify-center w-full gap-5">
            <div className="items-center justify-center hidden w-8 h-8 text-xl font-bold rounded-full md:flex bg-zinc-300 text-zinc-800">
              1
            </div>
            <div>
              {!isConnected && <ConnectButton />}
              {isConnected && isChainIdSupported(chainId) && (
                <AddressPill
                  address={address}
                  className="justify-center w-44"
                />
              )}
              {isConnected && !isChainIdSupported(chainId) && (
                <Button disabled icon={faWaveSquare} variant="outline">
                  Unsupported Network
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center w-full gap-5">
            <div className="items-center justify-center hidden w-8 h-8 text-xl font-bold rounded-full md:flex bg-zinc-300 text-zinc-800">
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
