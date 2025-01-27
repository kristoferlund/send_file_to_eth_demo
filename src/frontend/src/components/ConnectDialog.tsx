import { Connector, useAccount, useConnect } from "wagmi";

import { Button } from "./ui/Button";
import { Dialog, DialogContent, DialogHeader } from "./ui/Dialog";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";

export default function ConnectDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { connect, connectors, error, isPending, variables, reset } =
    useConnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const icon = (connector: Connector) => {
    if (
      isPending &&
      "id" in variables.connector &&
      connector.id === variables.connector.id
    ) {
      return <LoaderCircle className="animate-spin" />;
    }
    return undefined;
  };

  const iconSource = (connector: Connector) => {
    // WalletConnect does not provide an icon, so we provide a custom one.
    if (connector.id === "walletConnect") {
      return "/walletconnect.svg";
    }
    return connector.icon;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-64">
        <DialogHeader>Connect Wallet</DialogHeader>
        {connectors.map((connector) => (
          <Button
            className="justify-between w-52"
            disabled={isConnected || isPending}
            key={connector.id}
            onClick={() => connect({ connector })}
            variant="outline"
          >
            {icon(connector)}
            {connector.name}
            <img className="w-4 h-4" src={iconSource(connector)} />
          </Button>
        ))}
        {error && (
          <div className="p-2 text-center text-white bg-red-500">
            {error.message}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
