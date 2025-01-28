import { formatSize } from "@/lib/formatSize";
import { Dialog, DialogContent, DialogHeader } from "./ui/Dialog";
import useTransferGet from "@/transfer/hooks/useTransferGet";
import { File, Download, LoaderCircle } from "lucide-react";

function TransferDialogInner({ transferId }: { transferId: number }) {
  const { data: transfer, isPending } = useTransferGet(transferId);

  const download = () => {
    if (!transfer) return;
    const blob = new Blob([transfer.decryptedData], {
      type: transfer.content_type,
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = transfer.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isPending) {
    return (
      <div className="p-4 flex justify-center items-center gap-2">
        Decrypting <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (!transfer || "Err" in transfer) {
    return (
      <div className="p-4 text-center text-red-500">
        Transfer could not be loaded
      </div>
    );
  }

  return (
    <div
      className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
      onClick={download}
    >
      <File className="w-8 h-8 mr-4" />
      <div className="flex-1">
        <div className="font-medium truncate">{transfer.filename}</div>
        <div className="text-sm text-gray-500">{formatSize(transfer.size)}</div>
      </div>
      <Download className="w-6 h-6 ml-4 text-gray-600" />
    </div>
  );
}

export default function TransferDialog({
  isOpen,
  transferId,
  setIsOpen,
}: {
  isOpen: boolean;
  transferId?: number;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>Decrypt and download</DialogHeader>
        {isOpen && transferId && (
          <TransferDialogInner transferId={transferId} />
        )}
      </DialogContent>
    </Dialog>
  );
}
