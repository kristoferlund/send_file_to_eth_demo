import { useAccount, useEnsName } from "wagmi";
import { shortenEthAddress } from "../eth/utils/shortenEthAddress";
import { Unplug } from "lucide-react";
import { Badge } from "./ui/badge";

function ButtonIcon() {
  const { isConnected, isConnecting } = useAccount();

  if (isConnecting) {
    return <Unplug />;
  } else if (isConnected) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 fill-primary mr-1"
      >
        <title>Ethereum</title>
        <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
      </svg>
    );
  } else {
    return <Unplug />;
  }
}

export default function EthBadge() {
  const { address, isConnected, isConnecting } = useAccount();
  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: 1,
  });

  const buttonText = () => {
    if (isConnecting) {
      return "Connecting...";
    }
    if (isConnected) {
      return ensName ?? shortenEthAddress(address);
    }
    return "Connect";
  };

  return (
    <>
      <Badge className="bg-muted py-2 text-primary">
        <ButtonIcon />
        {buttonText()}
      </Badge>
    </>
  );
}
