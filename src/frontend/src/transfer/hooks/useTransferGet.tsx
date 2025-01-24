import { useQuery } from "@tanstack/react-query";
import { useActor } from "../../ic/Actors";

export default function useTransferGet(transferId: number) {
  const { actor: backend } = useActor();
  return useQuery({
    queryKey: ["transfer_get", transferId],
    queryFn: async () => {
      const response = await backend?.transfer_get(transferId);
      if (response && "Ok" in response) {
        return response.Ok;
      }
      console.error("Error fetching transfer", response?.Err);
    },
    enabled: !!backend,
  });
}
