import { useAccount } from "wagmi";
import { Dialog, DialogContent, DialogHeader } from "./ui/Dialog";
import { useEffect, useState } from "react";
import { toBytes } from "viem";
import * as vetkd from "ic-vetkd-utils";
import useTransferGet from "../transfer/hooks/useTransferGet";
import useVetkdEncryptedKey from "../vetkd/hooks/useVetkdEncryptedKey";
import useVetkdPublicKey from "../vetkd/hooks/useVetkdPublicKey";

function TransferDialogInner({ transferId }: { transferId: number }) {
  const { address } = useAccount();
  const { data: transfer, isPending } = useTransferGet(transferId);
  const { data: vetkdEncryptedKeyReturn } = useVetkdEncryptedKey();
  const { data: publicKey } = useVetkdPublicKey(address);
  const [decryptedMessage, setDecryptedMessage] = useState<string>();

  useEffect(() => {
    if (!vetkdEncryptedKeyReturn || !publicKey || !address || !transfer) {
      return;
    }
    const { transportSecretKey, encryptedKey } = vetkdEncryptedKeyReturn;
    const derivationId = toBytes(address);
    const key = transportSecretKey.decrypt(
      encryptedKey,
      publicKey,
      derivationId,
    );
    const ibeCiphertext = vetkd.IBECiphertext.deserialize(
      transfer.file as Uint8Array,
    );
    const ibePlaintext = ibeCiphertext.decrypt(key);
    setDecryptedMessage(new TextDecoder().decode(ibePlaintext));
  }, [transfer, publicKey, address, vetkdEncryptedKeyReturn]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!transfer || "Err" in transfer) {
    return <div>Transfer not found</div>;
  }

  return <div>{decryptedMessage}</div>;
}

export default function TransferDialog({
  isOpen,
  transferId,
  setIsOpen,
}: {
  isOpen: boolean;
  transferId?: number;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>Transfer</DialogHeader>
        {isOpen && transferId && (
          <TransferDialogInner transferId={transferId} />
        )}
      </DialogContent>
    </Dialog>
  );
}
