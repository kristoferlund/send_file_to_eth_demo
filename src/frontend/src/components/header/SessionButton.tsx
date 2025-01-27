import { Button } from "@/components/ui/button";
import SessionDialog from "./SessionDialog";
import { useState } from "react";
import { User } from "lucide-react";

export default function SessionButton() {
  // Local state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <User />
      </Button>
      <SessionDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
