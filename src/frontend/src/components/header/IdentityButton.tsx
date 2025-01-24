import Button from "../ui/Button";
import PrincipalDialog from "./PrincipalDialog";
import { useAccount } from "wagmi";
import { useSiwe } from "ic-siwe-js/react";
import { useState } from "react";

export default function IdentityButton() {
  const { identity } = useSiwe();
  const { isConnected } = useAccount();

  const [isOpen, setIsOpen] = useState(false);

  if (!identity || !isConnected) return null;

  let principal = identity.getPrincipal().toString();
  principal = principal.slice(0, 6) + "..." + principal.slice(-4);

  return (
    <>
      <Button
        className="whitespace-nowrap"
        onClick={() => setIsOpen(true)}
        variant="dark"
      >
        <img
          alt="Internet Computer"
          className="inline-block w-4 h-4 mr-1 "
          src="/ic.svg"
        />
        {principal}
      </Button>
      <PrincipalDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
