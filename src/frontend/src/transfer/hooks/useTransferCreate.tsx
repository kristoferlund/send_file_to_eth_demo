import { useMutation } from "@tanstack/react-query";
import { useActor } from "../../ic/Actors";
import { toBytes } from "viem";
import * as vetkd from "ic-vetkd-utils";

export default function useTransferCreate() {
  const { actor: backend } = useActor();

  return useMutation({
    mutationFn: async ({
      recipientAddress,
      file,
    }: {
      recipientAddress: string;
      file: Uint8Array<ArrayBufferLike>;
    }) => {
      if (!backend) {
        console.error("Backend actor not available");
        return;
      }
      const response = await backend.vetkd_public_key(recipientAddress);
      if ("Err" in response) {
        console.error("Error getting recipient public key", response.Err);
        return;
      }
      const recipientPublicKey = response.Ok as Uint8Array<ArrayBufferLike>;
      const derivationId = toBytes(recipientAddress);
      const seed = window.crypto.getRandomValues(new Uint8Array(32));
      const encryptedFile = vetkd.IBECiphertext.encrypt(
        recipientPublicKey,
        derivationId,
        file,
        seed,
      );
      return backend?.transfer_create(
        recipientAddress,
        encryptedFile.serialize(),
      );
    },
  });
}
