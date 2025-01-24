import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pill from "./ui/Pill";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { shortenEthAddress } from "../eth/utils/shortenEthAddress";

export default function AddressPill({
  address,
  className,
}: {
  address?: string;
  className?: string;
}) {
  if (!address) return null;
  return (
    <Pill className={className}>
      <FontAwesomeIcon className="w-3 h-3" icon={faEthereum} />
      {shortenEthAddress(address)}
    </Pill>
  );
}
