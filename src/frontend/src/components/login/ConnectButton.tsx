import Button from "../ui/Button";
import ConnectDialog from "../ConnectDialog";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { useAccount } from "wagmi";
import { useState } from "react";

export default function ConnectButton() {
  const { isConnecting } = useAccount();
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);

  const handleClick = () => {
    if (isConnecting) return;
    setConnectDialogOpen(true);
  };

  const buttonIcon = isConnecting ? faCircleNotch : faEthereum;

  const buttonText = isConnecting ? "Connecting" : "Connect wallet";

  return (
    <>
      <Button
        className="w-44"
        disabled={isConnecting}
        icon={buttonIcon}
        onClick={handleClick}
        spin={isConnecting}
      >
        {buttonText}
      </Button>
      <ConnectDialog
        isOpen={connectDialogOpen}
        setIsOpen={setConnectDialogOpen}
      />
    </>
  );
}
