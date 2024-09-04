import { FC } from "react";

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
  return <div className="">ProfileSheet</div>;
};

export default ProfileSheet;
