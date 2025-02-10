import { useQuery } from "@tanstack/react-query";
import { useActor } from "../../ic/Actors";

export default function useVetkdPublicKey() {
  const { actor: backend } = useActor();
  return useQuery({
    queryKey: ["public_key_get"],
    queryFn: async () => {
      const response = await backend?.vetkd_public_key();
      if (!response) {
        console.error("Error getting public key, empty response");
        return;
      }
      if ("Err" in response) {
        console.error("Error getting public key", response.Err);
        return;
      }
      return response.Ok as Uint8Array;
    },
    enabled: !!backend,
  });
}
