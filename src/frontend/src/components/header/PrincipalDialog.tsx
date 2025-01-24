import Button from "../ui/Button";
import Dialog from "../ui/Dialog";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { useSiwe } from "ic-siwe-js/react";

export default function PrincipalDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { clear, identity } = useSiwe();

  if (!identity) return null;

  return (
    <Dialog className="max-w-xl" isOpen={isOpen} setIsOpen={setIsOpen}>
      <img
        alt="Internet Computer"
        className="inline-block w-12 h-12"
        src="/ic.svg"
      />
      <HeadlessDialog.Title>Internet Computer Identity</HeadlessDialog.Title>
      <div className="px-4 py-2 text-xs rounded-lg text-zinc-400 bg-zinc-900/50">
        <code className="md:whitespace-nowrap">
          {identity?.getPrincipal().toString()}
        </code>
      </div>
      <div className="flex justify-center w-full gap-5">
        <Button onClick={() => setIsOpen(false)} variant="outline">
          Close
        </Button>
        <Button onClick={clear}>Logout</Button>
      </div>
    </Dialog>
  );
}
