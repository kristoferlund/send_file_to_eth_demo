import { useState } from "react";
import { Transfer } from "../../../backend/declarations/backend.did";
import useTransferList from "../transfer/hooks/useTransferList";
import TransferDialog from "./TransferDialog";

function TransferList({ transfers }: { transfers?: Transfer[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [transferId, setTransferId] = useState<number>();

  const openTransferDialog = (transferId: number) => {
    setTransferId(transferId);
    setIsOpen(true);
  };

  if (!transfers || transfers.length === 0) {
    return "No transfers";
  }

  return (
    <div>
      {transfers?.map((transfer) => (
        <div
          key={transfer.created}
          onClick={() => openTransferDialog(transfer.id)}
        >
          {transfer.from}
        </div>
      ))}
      <TransferDialog
        isOpen={isOpen}
        transferId={transferId}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default function Transfers() {
  const { data: transfers, isPending } = useTransferList();

  if (isPending) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col items-center w-full gap-5">
        <div className="text-2xl font-bold">Received transfers</div>
        <TransferList transfers={transfers} />
      </div>
    </div>
  );
}
