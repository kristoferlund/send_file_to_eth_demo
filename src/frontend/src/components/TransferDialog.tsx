import { useAccount } from "wagmi";
import Dialog from "./ui/Dialog";
import { Dialog as HeadlessDialog } from "@headlessui/react";
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
    const k_bytes = transportSecretKey.decrypt(
      encryptedKey,
      publicKey,
      derivationId,
    );
    const ibe_ciphertext = vetkd.IBECiphertext.deserialize(
      transfer.file as Uint8Array<ArrayBufferLike>,
    );
    const ibe_plaintext = ibe_ciphertext.decrypt(k_bytes);
    setDecryptedMessage(new TextDecoder().decode(ibe_plaintext));
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
    <Dialog
      className="relative z-50 w-80"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <HeadlessDialog.Title>Transfer</HeadlessDialog.Title>
      {isOpen && transferId && <TransferDialogInner transferId={transferId} />}
    </Dialog>
  );
}
