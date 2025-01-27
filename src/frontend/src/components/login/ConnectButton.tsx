import { Button } from "../ui/Button";
import ConnectDialog from "../ConnectDialog";
import { useAccount } from "wagmi";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function ConnectButton() {
  const { isConnecting } = useAccount();
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);

  const handleClick = () => {
    if (isConnecting) return;
    setConnectDialogOpen(true);
  };

  const buttonIcon = isConnecting ? (
    <LoaderCircle />
  ) : (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 fill-primary-foreground mr-1"
    >
      <title>Ethereum</title>
      <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
    </svg>
  );

  const buttonText = isConnecting ? "Connecting" : "Connect wallet";

  return (
    <>
      <Button className="w-44" disabled={isConnecting} onClick={handleClick}>
        {buttonIcon}
        {buttonText}
      </Button>
      <ConnectDialog
        isOpen={connectDialogOpen}
        setIsOpen={setConnectDialogOpen}
      />
    </>
  );
}
