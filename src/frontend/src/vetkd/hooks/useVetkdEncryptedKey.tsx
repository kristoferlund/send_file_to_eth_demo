import { useQuery } from "@tanstack/react-query";
import { useActor } from "../../ic/Actors";
import * as vetkd from "ic-vetkd-utils";

export default function useVetkdEncryptedKey() {
  const { actor: backend } = useActor();
  return useQuery({
    queryKey: ["encrypted_key_get"],
    queryFn: async () => {
      const seed = window.crypto.getRandomValues(new Uint8Array(32));
      const transportSecretKey = new vetkd.TransportSecretKey(seed);
      const response = await backend?.vetkd_encrypted_key(
        transportSecretKey.public_key(),
      );
      if (!response) {
        console.error("Error getting encrypted key, empty response");
        return;
      }
      if ("Err" in response) {
        console.error("Error getting encrypted key", response.Err);
        return;
      }
      const encryptedKey = response.Ok as Uint8Array;
      return { transportSecretKey, encryptedKey };
    },
    enabled: !!backend,
  });
}
