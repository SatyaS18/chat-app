import { FC } from "react";

type GroupSheetProps = {
  chatId: string;
  groupName: string;
};

export const GroupSheet: FC<GroupSheetProps> = ({ groupName, chatId }) => {
  return <div className="">GroupSheet</div>;
};

export default GroupSheet;
