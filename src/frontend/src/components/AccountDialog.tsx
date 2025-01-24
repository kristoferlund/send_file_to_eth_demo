import { useAccount, useDisconnect, useEnsName } from "wagmi";

import Button from "./ui/Button";
import Dialog from "./ui/Dialog";
import { Dialog as HeadlessDialog } from "@headlessui/react";

export function AccountDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: ensName } = useEnsName({ address, chainId: 1 });

  return (
    <Dialog className="max-w-xl" isOpen={isOpen} setIsOpen={setIsOpen}>
      <img
        alt="Internet Computer"
        className="inline-block w-12 h-12"
        src="/ethereum.svg"
      />{" "}
      <HeadlessDialog.Title className="flex justify-between">
        Ethereum Address
      </HeadlessDialog.Title>
      <div className="px-4 py-2 text-xs rounded-lg text-zinc-400 bg-zinc-900/50">
        <code className="md:whitespace-nowrap">{ensName ?? address}</code>
      </div>
      <div className="flex justify-center w-full gap-5">
        <Button onClick={() => setIsOpen(false)} variant="outline">
          Close
        </Button>
        <Button
          onClick={() => {
            setIsOpen(false);
            disconnect();
          }}
        >
          Disconnect
        </Button>
      </div>
    </Dialog>
  );
}
