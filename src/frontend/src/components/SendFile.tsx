import { FormEvent, useState, useRef } from "react";
import { Button } from "./ui/Button";
import { useActor } from "../ic/Actors";
import useTransferCreate from "../transfer/hooks/useTransferCreate";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";

export default function SendFile() {
  const { actor } = useActor();
  const { mutateAsync: createTransfer } = useTransferCreate();
  const { toast } = useToast();

  // Local state
  const [recipientAddress, setRecipientAddress] = useState("");
  const [saving, setSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!actor || !file) return;

    setSaving(true);
    try {
      const fileBuffer = await file.arrayBuffer();
      const encodedMessage = new Uint8Array(fileBuffer);
      await createTransfer({ recipientAddress, file: encodedMessage });
      toast({ description: "File sent successfully!" });
      setFile(null); // Reset file after successful transfer
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to send the file. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 1) {
      toast({
        variant: "destructive",
        description: "Only one file can be uploaded at a time.",
      });
      return;
    }

    const droppedFile = droppedFiles[0];
    if (droppedFile.size > 1024 * 1024) {
      toast({
        variant: "destructive",
        description: "File size exceeds the maximum limit of 1MB.",
      });
      return;
    }
    setFile(droppedFile);
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 1) {
      toast({
        variant: "destructive",
        description: "Only one file can be uploaded at a time.",
      });
      return;
    }

    const selectedFile = selectedFiles?.[0];
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024) {
        toast({
          variant: "destructive",
          description: "File size exceeds the maximum limit of 1MB.",
        });
        return;
      }
      setFile(selectedFile);
    }
  }

  const submitIcon = saving ? <LoaderCircle /> : undefined;
  const submitText = saving ? "Sending..." : "Send File";
  const submitDisabled = saving || !recipientAddress || !file;

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Send File</h2>
      <form className="space-y-6" onSubmit={submit}>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Recipient Ethereum Address
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-700 text-white"
            onChange={(e) => {
              setRecipientAddress(e.target.value);
            }}
            placeholder="0x123..."
            type="text"
            value={recipientAddress}
          />
        </div>
        <div
          className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg ${
            isDragging
              ? "border-emerald-500 bg-emerald-900/20"
              : "border-gray-600 bg-gray-700/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <p className="text-gray-200 font-medium">{file.name}</p>
          ) : (
            <p className="text-gray-400">Drag & drop a file here</p>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileSelect}
            accept="*"
          />
          <Button
            type="button"
            variant="secondary"
            className="mt-4"
            onClick={() => fileInputRef.current?.click()}
          >
            Select File
          </Button>
        </div>
        <Button className="w-full" disabled={submitDisabled} type="submit">
          {submitIcon}
          {submitText}
        </Button>
      </form>
    </div>
  );
}
