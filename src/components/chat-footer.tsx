import { FC } from "react";

type ChatFooterProps = {
  chatId: string;
  currentUserId: string;
};

export const ChatFooter: FC<ChatFooterProps> = ({ chatId, currentUserId }) => {
  return <div className="">ChatFooter</div>;
};

export default ChatFooter;
