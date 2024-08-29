"use client";

import { FC, ReactNode } from "react";
import SharedLayout from "./shared-layout";

type ChatsLayoutProps = {
  children: ReactNode;
};

export const ChatsLayout: FC<ChatsLayoutProps> = ({ children }) => {
  return <SharedLayout SidebarComponent={() => <></>}>{children}</SharedLayout>;
};
