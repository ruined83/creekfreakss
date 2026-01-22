import { useState } from "react";
import { ChatButton } from "./ChatButton";
import { ChatWindow } from "./ChatWindow";

export function CypressChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen(true)} />
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
