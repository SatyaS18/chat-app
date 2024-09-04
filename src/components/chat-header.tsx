import { useIsDesktop } from "@/hooks/use-is-desktop";
import { useSidebarWidth } from "@/hooks/use-sidebar-width";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { api } from "../../convex/_generated/api";

type ChatHeaderProps = {
  chatAvatar: string;
  username: string;
  isGroup: boolean;
  chatId: string;
  status: string;
};

export const ChatHeader: FC<ChatHeaderProps> = ({
  chatAvatar,
  chatId,
  isGroup,
  status,
  username,
}) => {
  const { sidebarWidth } = useSidebarWidth();
  const isDesktop = useIsDesktop();
  const router = useRouter();
  const conversations = useQuery(api.conversations.get);

  const groupsInCommon = conversations?.filter(
    ({ conversation }) => conversation.isGroup
  );

  const videoCall = () => router.push(`/calls/${chatId}`);
  return <div className="">ChatHeader</div>;
};

export default ChatHeader;
