import { z } from "zod";
import { useTheme } from "next-themes";
import { Card, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Handshake,
  LaptopMinimal,
  Pencil,
  Sun,
  SunMoon,
  UserRound,
  UserRoundSearch,
} from "lucide-react";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

const statuses = [
  "👋 Speak Freely",
  "🤐 Encrypted",
  "👍🏻 Free to chat",
  "👨🏼‍💻 Coding",
  "📴 Taking a break",
];

const addFriendFormSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
});

const ProfileDialogContent = () => {
  const [updateStatusDialog, setUpdateStatusDialog] = useState(false);
  const [status, setStatus] = useState("");
  const [friendReqestModal, setFriendRequestModal] = useState(false);
  const { setTheme } = useTheme();

  const { user } = useUser();
  const userDetails = useQuery(api.status.get, { clerkId: user?.id! });
  const { mutate: updateStatus, state: updateStatusState } = useMutationHandler(
    api.status.update
  );
  const { mutate: createFriendRequest, state: createFriendRequestState } =
    useMutationHandler(api.friend_request.create);

  const form = useForm<z.infer<typeof addFriendFormSchema>>({
    resolver: zodResolver(addFriendFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function friendRequestHandler({
    email,
  }: z.infer<typeof addFriendFormSchema>) {
    try {
      await createFriendRequest({ email });
      form.reset();
      toast.success("Friend request sent successfully");
      setFriendRequestModal(false);
    } catch (error) {
      toast.error(
        error instanceof ConvexError ? error.data : "An error occurred"
      );
      console.log("Error sending friend request:", error);
    }
  }

  async function updateStatusHandler() {
    try {
      await updateStatus({ clerkId: user?.id!, status });
      toast.success("Status updated successfully");
      setStatus("");
      setUpdateStatusDialog(false);
    } catch (error) {
      toast.error(
        error instanceof ConvexError ? error.data : "An error occurred"
      );
      console.log("Error updating status", error);
    }
  }

  return (
    <div>
      <Card className="border-0 flex flex-col space-y-4">
        <CardTitle>Profile</CardTitle>

        <div>
          <Avatar className="h-20 w-20 mx-auto">
            <AvatarImage src={userDetails?.imageUrl} />
            <AvatarFallback>{userDetails?.username[0]}</AvatarFallback>
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
            value={userDetails?.username}
          />
        </div>

        <Separator />

        <div className="flex items-center justify-center space-x-5">
          <p>Manage your account</p>
          <UserButton
            appearance={{
              elements: {
                userButtonPopoverCard: {
                  pointerEvents: "initial",
                },
              },
            }}
          />
        </div>

        <Separator />

        <Dialog>
          <DialogTrigger>
            <div className="flex items-center space-x-2">
              <UserRoundSearch />
              <p>Send friend request</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <Form {...form}>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(friendRequestHandler)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={true}
                          placeholder="friend@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your friend&apos;s email to send a friend request
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={true} type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Separator />

        <Dialog>
          <DialogTrigger>
            <div className="flex items-center space-x-2">
              <Handshake />
              <p>View friend requests</p>
            </div>
          </DialogTrigger>

          <DialogContent>
            <p className="text-xl text-center font-bold">
              No friend request yet
            </p>
          </DialogContent>
        </Dialog>

        <Separator />

        <Dialog
          open={updateStatusDialog}
          onOpenChange={() => setUpdateStatusDialog(!updateStatusDialog)}
        >
          <DialogTrigger>
            <div className="flex items-center space-x-2">
              <Pencil />
              <p>{userDetails?.status}</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <Textarea
              placeholder={userDetails?.status}
              className="resize-none h-48"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={updateStatusState === "loading"}
            />
            <div>
              {statuses.map((status) => (
                <p
                  key={status}
                  className="px-2 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                  onClick={() => setStatus(status)}
                >
                  {status}
                </p>
              ))}
            </div>
            <Button
              disabled={updateStatusState === "loading"}
              type="button"
              className="ml-auto w-fit bg-primary-main"
              onClick={updateStatusHandler}
            >
              Update status
            </Button>
          </DialogContent>
        </Dialog>

        <Separator />

        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem
            onClick={() => setTheme("light")}
            value="light"
            className="flex space-x-3"
          >
            <Sun />
            <p>Light</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            onClick={() => setTheme("dark")}
            value="dark"
            className="flex space-x-3"
          >
            <SunMoon />
            <p>Dark</p>
          </ToggleGroupItem>
          <ToggleGroupItem
            onClick={() => setTheme("system")}
            value="system"
            className="flex space-x-3"
          >
            <LaptopMinimal />
            <p>System</p>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default ProfileDialogContent;
