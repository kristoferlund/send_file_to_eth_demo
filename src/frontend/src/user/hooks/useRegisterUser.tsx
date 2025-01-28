/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useActor } from "@/ic/Actors";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

// Calling this hook "registers" the user with the backend actor,
// that is, it ensures that the user is known to the backend actor and
// that the users Ethereum address is linked with the user principal.
export default function useRegisterUser() {
  const { address } = useAccount();
  const { actor: backend } = useActor();
  return useQuery({
    queryKey: ["user_register", address],
    queryFn: async () => {
      const getResponse = await backend!.user_get();
      if ("Err" in getResponse) {
        console.error("Error fetching user", getResponse.Err);
        return;
      }
      const registeredAddress = getResponse.Ok;
      if (registeredAddress.length > 0) {
        return registeredAddress[0];
      }

      const registerResponse = await backend!.user_register();
      if ("Err" in registerResponse) {
        console.error("Error registering user", registerResponse.Err);
        return;
      }
      return registerResponse.Ok;
    },
    enabled: !!address && !!backend,
  });
}
