import { useTheme } from "next-themes";
import { Card, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserRound } from "lucide-react";
import { Input } from "./ui/input";

const statuses = [
  "👋 Speak Freely",
  "🤐 Encrypted",
  "👍🏻 Free to chat",
  "👨🏼‍💻 Coding",
  "📴 Taking a break",
];

const ProfileDialogContent = () => {
  const { setTheme } = useTheme();
  return (
    <div>
      <Card className="border-0 flex flex-col space-y-4">
        <CardTitle>Profile</CardTitle>

        <div>
          <Avatar className="h-20 w-20 mx-auto">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </div>
      </Card>

      <div className="flex flex-col gap-y-6 mt-4">
        <div className="flex items-center space-x-2">
          <UserRound />
          <Input
            disabled
            placeholder="Name"
            className="border-none outline-none ring-0"
            value="Satyakant Sahu"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDialogContent;
