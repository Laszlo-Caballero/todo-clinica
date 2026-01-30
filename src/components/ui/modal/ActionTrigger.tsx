"use client";

import { PropsWithChildren } from "react";
import { useModalContext } from "./Modal";

export default function ActionTrigger({ children }: PropsWithChildren) {
  const { onClose } = useModalContext();

  return <div onClick={onClose}>{children}</div>;
}
