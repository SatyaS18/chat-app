import { FC } from "react";
import { Id } from "../../convex/_generated/dataModel";

type FriendRequestCardProps = {
  id: Id<"friend_requests">;
  imageUrl: string;
  username: string;
  email: string;
};

const FriendRequestCard: FC<FriendRequestCardProps> = ({
  email,
  id,
  imageUrl,
  username,
}) => {
  return <div className="">FriendRequestCard</div>;
};

export default FriendRequestCard;
