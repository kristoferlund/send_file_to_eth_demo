import { useAccount } from "wagmi";
import { Dialog, DialogContent, DialogHeader } from "./ui/Dialog";
import { useEffect, useState } from "react";
import * as vetkd from "ic-vetkd-utils";
import { TRANSFER_DERIVATION_ID } from "@/main";
import useTransferGet from "@/transfer/hooks/useTransferGet";
import useVetkdPublicKey from "@/vetkd/hooks/useVetkdPublicKey";
import useVetkdEncryptedKey from "@/vetkd/hooks/useVetkdEncryptedKey";

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
    console.log("Decrypting message", transfer);
    const { transportSecretKey, encryptedKey } = vetkdEncryptedKeyReturn;
    try {
      const key = transportSecretKey.decrypt(
        encryptedKey,
        publicKey,
        TRANSFER_DERIVATION_ID,
      );
      const ibeCiphertext = vetkd.IBECiphertext.deserialize(
        transfer.data as Uint8Array,
      );
      const ibePlaintext = ibeCiphertext.decrypt(key);
      setDecryptedMessage(new TextDecoder().decode(ibePlaintext));
    } catch (e) {
      console.error("Error decrypting message", e);
    }
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
