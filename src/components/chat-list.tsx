import { useQuery } from "convex/react";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { api } from "../../convex/_generated/api";

const ChatList: FC = () => {
  const pathName = usePathname();
  const chatId = pathName.split("/").pop();

  const conversations = useQuery(api.conversations.get);

  const groupMessages = conversations?.filter(
    (msg) => msg.conversation.isGroup
  );

  const directMessages = conversations?.filter(
    (msg) => !msg.conversation.isGroup
  );

  const hasConversations =
    (groupMessages && groupMessages.length > 0) ||
    (directMessages && directMessages.length > 0);
  return <div className="">ChatList</div>;
};

export default ChatList;
