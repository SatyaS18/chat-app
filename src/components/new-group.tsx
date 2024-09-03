import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useMemo, useState } from "react";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

const CreateGroupSchema = z.object({
  name: z.string().min(2, {
    message: "Group name must be at least 2 characters long",
  }),
  members: z.array(z.string()).min(1, {
    message: "Group must have at least 1 member",
  }),
});

const NewGroup = () => {
  const contacts = useQuery(api.contacts.get);
  const [createGroupModal, setCreateGroupModal] = useState(false);

  const { mutate: createGroup, state: createGroupState } = useMutationHandler(
    api.contacts.createGroup
  );

  const form = useForm<z.infer<typeof CreateGroupSchema>>({
    resolver: zodResolver(CreateGroupSchema),
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = form.watch("members", []);

  const unselectedContacts = useMemo(() => {
    return contacts
      ? contacts.filter((contact) => !members.includes(contact._id))
      : [];
  }, [contacts, members]);

  const createGroupHandler = async ({
    members,
    name,
  }: z.infer<typeof CreateGroupSchema>) => {
    await createGroup({ name, members });

    setCreateGroupModal(false);
    form.reset();
    toast.success("Group created successfully");
    try {
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof ConvexError ? error.data : "An error occured"
      );
    }
  };
  return <div className="">NewGroup</div>;
};

export default NewGroup;
