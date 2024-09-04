"use client";

import { NavigationBar } from "@/components/navigation-bar";
import { Id } from "../../../../convex/_generated/dataModel";
import NewGroup from "@/components/new-group";
import ChatContent from "@/components/chat-content";

const ChatId = ({
  params: { chatId },
}: {
  params: { chatId: Id<"conversations"> };
}) => {
  return (
    <>
      <div className="hidden md:block">
        <NavigationBar trigger={<NewGroup />} />
      </div>
      <ChatContent chatId={chatId} />
    </>
  );
};

export default ChatId;
