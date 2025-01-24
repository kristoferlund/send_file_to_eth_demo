import { wagmiConfig } from "./wagmi.config";

export function isChainIdSupported(id?: number) {
  return wagmiConfig.chains.find((c) => c.id === id) !== undefined;
}
