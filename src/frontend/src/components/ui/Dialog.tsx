import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

type DialogProps = {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
};

export default function Dialog({
  className,
  isOpen,
  setIsOpen,
  children,
}: DialogProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  className = twMerge(
    "w-full max-w-xl border-zinc-700/50 border-[1px] bg-zinc-800 px-5 drop-shadow-xl rounded-3xl flex flex-col items-center relative transform transition-transform ease-out duration-300",
    className
  );
  className += animate ? " translate-y-0" : " translate-y-full";

  return (
    <HeadlessDialog
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={() => setIsOpen(false)}
      open={isOpen}
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-[#00000070]">
        <HeadlessDialog.Panel className={className}>
          <div className="absolute right-5 top-5">
            <button onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon
                className="w-3 h-3 p-2 bg-transparent border rounded-full border-zinc-500/50 hover:scale-105 text-zinc-500 hover:bg-emerald-500/10 hover:text-zinc-200"
                icon={faXmark}
              />
            </button>
          </div>
          <div className="flex flex-col items-center w-full gap-5 py-8 md:px-8">
            {children}
          </div>
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  );
}
