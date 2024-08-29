import { z } from "zod";
import { useTheme } from "next-themes";
import { Card, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Handshake, UserRound, UserRoundSearch } from "lucide-react";
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
  const { setTheme } = useTheme();

  const form = useForm<z.infer<typeof addFriendFormSchema>>({
    resolver: zodResolver(addFriendFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit({ email }: z.infer<typeof addFriendFormSchema>) {
    console.log(email);
  }

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

        <Separator />

        <div className="flex items-center justify-center space-x-5">
          <p>Manage your account</p>
          <button>USER BUTTON</button>
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
                onSubmit={form.handleSubmit(onSubmit)}
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
      </div>
    </div>
  );
};

export default ProfileDialogContent;
