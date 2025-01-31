import EthBadge from "../EthBadge";
import SessionButton from "./SessionButton";

export default function Header() {
  return (
    <div className="flex flex-col justify-between w-full gap-10 p-5 md:flex-row">
      <div className="hidden text-xl font-bold text-center md:block">
        Send encrypted files to any Ethereum address
      </div>
      <div className="flex items-center justify-between md:justify-center gap-5 text-sm md:text-base flex-row">
        <EthBadge />
        <SessionButton />
      </div>
      <div className="block text-xl font-bold md:hidden">
        Send encrypted files to any Ethereum address
      </div>
    </div>
  );
}
