"use client";
import ReduxProvider from "@/providers/ReduxProvider";
import { FC, ReactNode } from "react";

interface layoutClientProps {
  children: ReactNode;
}

const LayoutClient: FC<layoutClientProps> = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default LayoutClient;
