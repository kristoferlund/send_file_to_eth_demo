import { useQuery } from "@tanstack/react-query";
import { useActor } from "../../ic/Actors";

export default function useTransferList() {
  const { actor: backend } = useActor();
  return useQuery({
    queryKey: ["transfer_list"],
    queryFn: async () => {
      const response = await backend?.transfer_list();

      if (!response || "Err" in response) {
        return [];
      }

      return response.Ok;
    },
    enabled: !!backend,
  });
}
