import { useTheme } from "next-themes";

const statuses = [
  "👋 Speak Freely",
  "🤐 Encrypted",
  "👍🏻 Free to chat",
  "👨🏼‍💻 Coding",
  "📴 Taking a break",
];

const ProfileDialogContent = () => {
  const { setTheme } = useTheme();
  return <div className="">Profile-dialog-content</div>;
};

export default ProfileDialogContent;
