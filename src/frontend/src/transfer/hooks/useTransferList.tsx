import { useQuery } from "@tanstack/react-query";
import { useActor } from "../../ic/Actors";
import { useAccount } from "wagmi";

export default function useTransferList() {
  const { actor: backend } = useActor();
  const { address } = useAccount();
  return useQuery({
    queryKey: ["transfer_list", address],
    queryFn: async () => {
      const response = await backend?.transfer_list();

      if (!response || "Err" in response) {
        return [];
      }

      return response.Ok;
    },
    enabled: !!backend && !!address,
  });
}
