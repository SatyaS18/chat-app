"use client";

import { CallContent } from "@/components/call-content";
import { NavigationBar } from "@/components/navigation-bar";
import NewGroup from "@/components/new-group";

const Calls = () => {
  return (
    <>
      <NavigationBar trigger={<NewGroup />} />
      <CallContent />
    </>
  );
};

export default Calls;
