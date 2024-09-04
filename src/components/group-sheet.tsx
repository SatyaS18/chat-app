import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { useQuery } from "convex/react";
import { FC, useState } from "react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { SheetTitle } from "./ui/sheet";
import { Phone, Video } from "lucide-react";
import { Separator } from "./ui/separator";

type ActionButtonProps = {
  Icon: FC;
  label: string;
};

const ActionButton: FC<ActionButtonProps> = ({ Icon, label }) => (
  <div className="flex space-y-2 flex-col items-center w-fit px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800">
    <Icon />
    <p className="text-xs">{label}</p>
  </div>
);

type GroupSheetProps = {
  chatId: string;
  groupName: string;
};

export const GroupSheet: FC<GroupSheetProps> = ({ groupName, chatId }) => {
  const [deleteConfirmationDialog, setDeleteConfirmationDialog] =
    useState(false);
  const [leaveConfirmationDialog, setLeaveConfirmationDialog] = useState(false);

  const { mutate: leaveGroup, state: leaveGroupState } = useMutationHandler(
    api.conversation.leaveGroup
  );
  const { mutate: blockGroup, state: blockGroupState } = useMutationHandler(
    api.conversation.deleteGroup
  );

  const groupMembers = useQuery(api.conversation.getConversationMembers, {
    conversationId: chatId as Id<"conversations">,
  });

  const messages = useQuery(api.messages.get, {
    id: chatId as Id<"conversations">,
  });

  const chatFiles = messages?.filter(({ type }) => type !== "text");

  const deleteGroupHandler = async () => {
    try {
      await blockGroup({ conversationId: chatId });

      toast.success("Group Deleted");
      setDeleteConfirmationDialog(false);
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof ConvexError ? error.data : "An error occurred"
      );
    }
  };

  const leaveGroupHandler = async () => {
    try {
      await leaveGroup({ conversationId: chatId });

      toast.success("Left Group");
      setLeaveConfirmationDialog(false);
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof ConvexError ? error.data : "An error occurred"
      );
    }
  };

  return (
    <ScrollArea className="h-full">
      <Avatar className="mx-auto h-20 w-20 mt-10">
        <AvatarFallback>{groupName.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <SheetTitle className="text-center mt-2 text-2xl">{groupName}</SheetTitle>
      <div className="flex justify-center space-x-4 mt-5">
        <ActionButton Icon={Video} label="Video" />
        <ActionButton Icon={Phone} label="Call" />
      </div>
      <Separator className="my-5 border border-gray-100 dark:border-gray-800" />
    </ScrollArea>
  );
};

export default GroupSheet;
