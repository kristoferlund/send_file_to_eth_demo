/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as vetkd from "ic-vetkd-utils";
import { useQuery } from "@tanstack/react-query";
import useVetkdEncryptedKey from "@/vetkd/hooks/useVetkdEncryptedKey";
import useVetkdPublicKey from "@/vetkd/hooks/useVetkdPublicKey";
import { TRANSFER_DERIVATION_ID } from "@/main";
import { useAccount } from "wagmi";
import { useActor } from "@/ic/Actors";

export default function useTransferGet(transferId: number) {
  const { actor: backend } = useActor();
  const { address } = useAccount();
  const { data: vetkdEncryptedKeyReturn } = useVetkdEncryptedKey();
  const { data: publicKey } = useVetkdPublicKey(address);
  return useQuery({
    queryKey: ["transfer_get", transferId],
    queryFn: async () => {
      const response = await backend?.transfer_get(transferId);
      if (!response) {
        console.error("Error fetching transfer, empty response");
        return;
      }
      if ("Err" in response) {
        console.error("Error fetching transfer", response.Err);
        return;
      }
      const transfer = response.Ok;
      const { transportSecretKey, encryptedKey } = vetkdEncryptedKeyReturn!;
      try {
        const key = transportSecretKey.decrypt(
          encryptedKey,
          publicKey!,
          TRANSFER_DERIVATION_ID,
        );
        const ibeCiphertext = vetkd.IBECiphertext.deserialize(
          transfer.data as Uint8Array,
        );
        const decryptedData = ibeCiphertext.decrypt(key);
        return { decryptedData, ...transfer };
      } catch (e) {
        console.error("Error decrypting transfer", e);
      }
    },
    enabled: !!backend && !!vetkdEncryptedKeyReturn && !!publicKey,
  });
}
