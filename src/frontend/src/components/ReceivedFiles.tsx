import { useState } from "react";
import useTransferList from "../transfer/hooks/useTransferList";
import TransferDialog from "./TransferDialog";
import { formatDistanceToNow } from "date-fns";

function ReceivedFilesInner() {
  const [isOpen, setIsOpen] = useState(false);
  const [transferId, setTransferId] = useState<number>();
  const { data: transfers, isPending } = useTransferList();

  const openTransferDialog = (transferId: number) => {
    setTransferId(transferId);
    setIsOpen(true);
  };

  if (isPending) {
    return <p className="text-gray-400">Loading...</p>;
  }

  if (!transfers || transfers.length === 0) {
    return <p className="text-gray-400">No received files yet.</p>;
  }

  return (
    <div className="space-y-4 w-full">
      {transfers
        .slice()
        .reverse()
        .map((transfer) => {
          const createdAt = new Date(Number(transfer.created) / 1_000_000); // Convert nanoseconds to milliseconds
          const formattedDate = formatDistanceToNow(createdAt, {
            addSuffix: true,
          });

          return (
            <div
              key={transfer.created.toString()}
              className="p-4 rounded-lg hover:bg-muted cursor-pointer"
              onClick={() => {
                openTransferDialog(transfer.id);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm">
                    From:{" "}
                    <span className="px-2 py-1 bg-primary rounded-full text-primary-foreground">
                      {`${transfer.from.slice(0, 6)}...${transfer.from.slice(-4)}`}
                    </span>
                  </span>
                </div>
                <span className="text-sm text-primary/50">{formattedDate}</span>
              </div>
            </div>
          );
        })}
      <TransferDialog
        isOpen={isOpen}
        transferId={transferId}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default function ReceivedFiles() {
  return (
    <div className="p-6 rounded-lg border w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Received Files</h2>
      <ReceivedFilesInner />
    </div>
  );
}
