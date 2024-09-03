import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

const NewGroup = () => {
  const contacts = useQuery(api.contacts.get);
  const [createGroupModal, setCreateGroupModal] = useState(false);
  return <div className="">NewGroup</div>;
};

export default NewGroup;
