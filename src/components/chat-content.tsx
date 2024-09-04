import { FC, useEffect } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useMutationHandler } from "@/hooks/use-mutation-handler";

const ChatContent: FC<{ chatId: Id<"conversations"> }> = ({ chatId }) => {
  const conversation = useQuery(api.conversation.get, { id: chatId });

  const messages = useQuery(api.messages.get, {
    id: chatId as Id<"conversations">,
  });

  const members = conversation?.isGroup
    ? conversation?.otherMembers ?? []
    : conversation?.otherMember
      ? [conversation.otherMember]
      : [];

  const { mutate: markAsRead, state: _ } = useMutationHandler(
    api.conversation.markAsRead
  );

  useEffect(() => {
    if (messages && messages.length > 0) {
      markAsRead({ conversationId: chatId, messageId: messages[0]._id });
    }
  }, [chatId, markAsRead, messages]);

  const formatSeenBy = (seenUsers: (string | undefined)[]) => {
    switch (seenUsers.length) {
      case 1:
        return `${seenUsers[0]} seen`;
      case 2:
        return `${seenUsers[0]} and ${seenUsers[1]} seen`;
      default:
        return `${seenUsers[0]}, ${seenUsers[1]} and ${
          seenUsers.length - 2
        } others seen`;
    }
  };

  const getSeenMessage = (messageId: Id<"messages">) => {
    const seenUsers = members
      .filter((member) => member.lastSeenMessageId === messageId)
      .map((member) => member.username?.split(" ")[0]);

    if (seenUsers.length === 0) return undefined;

    return formatSeenBy(seenUsers);
  };
  return <div className="">ChatContent</div>;
};

export default ChatContent;