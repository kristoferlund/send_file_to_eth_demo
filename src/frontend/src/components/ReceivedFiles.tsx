import { useState } from "react";
import TransferDialog from "./TransferDialog";
import { formatDistanceToNow } from "date-fns";
import { File } from "lucide-react";
import { formatSize } from "@/lib/formatSize";
import useTransferList from "@/transfer/hooks/useTransferList";
import { shortenEthAddress } from "@/lib/shortenEthAddress";

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
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left p-4">Filename</th>
            <th className="text-left p-4">From</th>
            <th className="text-left p-4">Size</th>
            <th className="text-left p-4">Created</th>
          </tr>
        </thead>
        <tbody>
          {transfers
            .slice()
            .reverse()
            .map((transfer) => {
              const createdAt = new Date(Number(transfer.created) / 1_000_000);
              const formattedDate = formatDistanceToNow(createdAt, {
                addSuffix: true,
              });

              return (
                <tr
                  key={transfer.created.toString()}
                  className="hover:bg-muted cursor-pointer"
                  onClick={() => {
                    openTransferDialog(transfer.id);
                  }}
                >
                  <td className="p-4">
                    <div className="flex gap-2 max-w-44 min-w-0">
                      <File />
                      <span className="truncate flex-1">
                        {transfer.filename}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">
                      <span className="px-2 py-1 bg-primary/50 rounded-full text-primary-foreground">
                        {shortenEthAddress(transfer.from)}
                      </span>
                    </span>
                  </td>
                  <td className="p-4 text-sm text-primary/50">
                    {formatSize(transfer.size)}
                  </td>
                  <td className="p-4 text-sm text-primary/50">
                    {formattedDate}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
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
