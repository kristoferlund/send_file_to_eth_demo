import { useMutation } from "@tanstack/react-query";
import * as vetkd from "ic-vetkd-utils";
import { useActor } from "@/ic/Actors";
import { toBytes } from "viem";

export default function useTransferCreate() {
  const { actor: backend } = useActor();

  return useMutation({
    mutationFn: async ({
      recipientAddress,
      file,
    }: {
      recipientAddress: string;
      file: File;
    }) => {
      if (!backend) {
        console.error("Backend actor not available");
        return;
      }
      const response = await backend.vetkd_public_key();
      if ("Err" in response) {
        console.error("Error getting recipient public key", response.Err);
        return;
      }

      const recipientPublicKey = response.Ok as Uint8Array;
      const seed = window.crypto.getRandomValues(new Uint8Array(32));
      const fileBuffer = await file.arrayBuffer();
      const encodedMessage = new Uint8Array(fileBuffer);
      const encryptedFile = vetkd.IBECiphertext.encrypt(
        recipientPublicKey,
        toBytes(recipientAddress),
        encodedMessage,
        seed
      );
      const request = {
        to: recipientAddress,
        content_type: file.type,
        filename: file.name,
        data: encryptedFile.serialize(),
      };
      return backend.transfer_create(request);
    },
  });
}
