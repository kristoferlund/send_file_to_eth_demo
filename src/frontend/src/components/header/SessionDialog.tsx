import { useSiwe } from "ic-siwe-js/react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "../ui/Button";

type SessionDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function arrayBufferToHex(arrayBuffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(arrayBuffer);
  return Array.from(byteArray, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export default function SessionDialog({
  isOpen,
  setIsOpen,
}: SessionDialogProps) {
  const { clear, identity, delegationChain } = useSiwe();

  const logout = () => {
    clear();
    setIsOpen(false);
  };

  if (!identity) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-96">
        <DialogHeader>Session</DialogHeader>
        <div className="px-4 py-2 text-xs rounded-lg bg-muted">
          <pre>
            {delegationChain?.delegations.map((delegation) => {
              const pubKey = arrayBufferToHex(delegation.delegation.pubkey);
              const expiration = new Date(
                Number(delegation.delegation.expiration / 1000000n),
              );
              return (
                <div key={pubKey}>
                  Internet Identity:{" "}
                  {identity.getPrincipal().toString().slice(0, 8)}...
                  {identity.getPrincipal().toString().slice(-8)}
                  <br />
                  Pubkey: {pubKey.slice(0, 8)}...{pubKey.slice(-8)}
                  <br />
                  Epiration: {expiration.toLocaleDateString()}{" "}
                  {expiration.toLocaleTimeString()}
                  <br />
                </div>
              );
            })}
          </pre>
        </div>
        <div className="flex gap-3 w-full">
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            variant="outline"
            className="w-full"
          >
            Close
          </Button>
          <Button onClick={logout} className="w-full">
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
