// import { SidebarContainer } from "@/components/sidebar-container";
// import { ChatList } from "@/components/chat-list";
// import { NewGroup } from "@/components/new-group";

import ChatList from "./chat-list";
import NewGroup from "./new-group";
import { SidebarContainer } from "./sidebar-container";

const ChatSidebar = () => {
  return (
    <>
      <SidebarContainer title="Chats" trigger={<NewGroup />}>
        <ChatList />
      </SidebarContainer>
    </>
  );
};

export default ChatSidebar;
