// import { SidebarContainer } from "@/components/sidebar-container";
// import { ChatList } from "@/components/chat-list";
// import { NewGroup } from "@/components/new-group";

import ChatList from "./chat-list";
import { SidebarContainer } from "./sidebar-container";

const ChatSidebar = () => {
  return (
    <>
      <SidebarContainer title="Chats" trigger={<></>}>
        <ChatList />
      </SidebarContainer>
    </>
  );
};

export default ChatSidebar;
