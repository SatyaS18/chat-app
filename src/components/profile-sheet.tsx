import { useQuery } from "convex/react";
import { FC, useState } from "react";
import { api } from "../../convex/_generated/api";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { Id } from "../../convex/_generated/dataModel";

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

type ProfileSheetProps = {
  chatId: string;
  username: string;
  status: string;
  groupsInCommon:
    | {
        conversation: {
          isGroup: boolean;
          name?: string;
          _creationTime: number;
          _id: string;
        };
        unseenCount: number;
      }[]
    | undefined;
  chatAvatar: string;
};

export const ProfileSheet: FC<ProfileSheetProps> = ({
  chatAvatar,
  chatId,
  groupsInCommon,
  status,
  username,
}) => {
  const [blockConfirmationDialog, setBlockConfirmationDialog] = useState(false);

  const messages = useQuery(api.messages.get, {
    id: chatId as Id<"conversations">,
  });

  const { mutate: blockContact, state: blockContactState } = useMutationHandler(
    api.contact.block
  );

  const blockContactHandler = async () => {
    try {
      await blockContact({ conversationId: chatId });

      toast.success("Contact blocked");
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof ConvexError ? error.data : "An error occurred"
      );
    }
  };

  const chatFiles = messages?.filter(({ type }) => type !== "text");

  return <div className="">ProfileSheet</div>;
};

export default ProfileSheet;
