import { useAccount, useEnsName } from "wagmi";

import { AccountDialog } from "../AccountDialog";
import Button from "../ui/Button";
import ConnectDialog from "../ConnectDialog";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { shortenEthAddress } from "../../eth/utils/shortenEthAddress";
import { useState } from "react";

export default function EthButton() {
  const { address, isConnected, isConnecting } = useAccount();
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [accountDialogOpen, setAccountDialogOpen] = useState(false);
  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: 1,
  });

  const handleClick = () => {
    if (isConnected) {
      setAccountDialogOpen(true);
    } else {
      setConnectDialogOpen(true);
    }
  };

  const buttonIcon = () => {
    if (isConnecting) {
      return faWaveSquare;
    } else if (isConnected) {
      return faEthereum;
    } else {
      return faWaveSquare;
    }
  };

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
      <Button icon={buttonIcon()} onClick={handleClick} variant="dark">
        {buttonText()}
      </Button>
      <ConnectDialog
        isOpen={connectDialogOpen}
        setIsOpen={setConnectDialogOpen}
      />
      <AccountDialog
        isOpen={accountDialogOpen}
        setIsOpen={setAccountDialogOpen}
      />
    </>
  );
}
