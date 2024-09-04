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

type GroupSheetProps = {
  chatId: string;
  groupName: string;
};

export const GroupSheet: FC<GroupSheetProps> = ({ groupName, chatId }) => {
  return <div className="">GroupSheet</div>;
};

export default GroupSheet;
