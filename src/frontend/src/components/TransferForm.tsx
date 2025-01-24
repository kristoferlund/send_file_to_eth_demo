import { FormEvent, useState } from "react";

import Button from "./ui/Button";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useActor } from "../ic/Actors";
import useTransferCreate from "../transfer/hooks/useTransferCreate";

export default function TransferForm() {
  const { actor } = useActor();
  const { mutateAsync: createTransfer } = useTransferCreate();

  // Local state
  const [recipientAddress, setRecipientAddress] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!actor) return;
    setSaving(true);
    const encodedMessage = new TextEncoder().encode(message);
    await createTransfer({ recipientAddress, file: encodedMessage });
    setSaving(false);
  }

  const submitIcon = saving ? faCircleNotch : undefined;

  const submitText = saving ? "Sending..." : "Send";

  const submitDisabled = saving || !recipientAddress;

  return (
    <div>
      <div className="flex flex-col items-center w-full gap-5">
        <div className="text-2xl font-bold">Encrypt form</div>
        <form
          className="flex flex-col items-center w-full gap-5"
          onSubmit={submit}
        >
          <div className="flex flex-col items-center w-full gap-3">
            <label htmlFor="name">Ethereum address to send to</label>
            <input
              className="w-full px-3 py-2 leading-tight border rounded appearance-none text-zinc-500 focus:outline-none focus:bg-emerald-200 bg-slate-200"
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="0x123.."
              type="text"
              value={recipientAddress}
            />
          </div>
          <div className="flex flex-col items-center w-full gap-3">
            <label htmlFor="name">Message to send</label>
            <input
              className="w-full px-3 py-2 leading-tight border rounded appearance-none text-zinc-500 focus:outline-none focus:bg-emerald-200 bg-slate-200"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Secret message"
              type="text"
              value={message}
            />
          </div>
          <Button
            className="w-full mt-5"
            disabled={submitDisabled}
            icon={submitIcon}
            spin
            type="submit"
            variant="primary"
          >
            {submitText}
          </Button>
        </form>
      </div>
    </div>
  );
}
