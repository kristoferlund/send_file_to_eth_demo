import { Connector, useAccount, useConnect } from "wagmi";

import Button from "./ui/Button";
import Dialog from "./ui/Dialog";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

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
      variables &&
      "id" in variables.connector &&
      connector.id === variables.connector.id
    ) {
      return faCircleNotch;
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
    <Dialog
      className="relative z-50 w-80"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <HeadlessDialog.Title> Connect Wallet</HeadlessDialog.Title>

      {connectors.map((connector) => (
        <Button
          className="justify-between w-52"
          disabled={isConnected || isPending}
          icon={icon(connector)}
          key={connector.id}
          onClick={() => connect({ connector })}
          spin
          variant="outline"
        >
          {connector.name}
          <img className="w-4 h-4" src={iconSource(connector)} />
        </Button>
      ))}
      {error && (
        <div className="p-2 text-center text-white bg-red-500">
          {error.message}
        </div>
      )}
    </Dialog>
  );
}
