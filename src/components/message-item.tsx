import { FC, ReactNode } from "react";

type MessageItemProps = {
  fromCurrentUser: boolean;
  senderImage: string;
  senderName: string;
  lastByUser: boolean;
  content: string[];
  createdAt: number;
  type: string;
  seen?: ReactNode;
};

export const MessageItem: FC<MessageItemProps> = ({
  content,
  createdAt,
  fromCurrentUser,
  lastByUser,
  senderImage,
  senderName,
  type,
  seen,
}) => {
  return <div className="">MessageItem</div>;
};

export default MessageItem;
